# 🎯 Système d'Extraction de Données RapidAssur

## Vue d'ensemble

Ce système d'extraction de données est conçu pour **automatiser la collecte d'informations** depuis diverses sources québécoises (RBQ, REQ, GCR, etc.) en utilisant l'IA (Firebase Gemini Assistant).

### Philosophie: "Small Bites" (Petites bouchées)

Au lieu d'extraire toutes les données en une seule fois, nous adoptons une approche **incrémentale et robuste**:
- ✅ Extraction par source (RBQ, puis REQ, puis GCR, etc.)
- ✅ Validation à chaque étape
- ✅ Fusion intelligente des données
- ✅ Retry automatique en cas d'échec
- ✅ Traçabilité complète (source, timestamp, confiance)

---

## 📁 Architecture

```
lib/
├── types-v2.ts                 # Types stratifiés avec métadonnées
├── source-detection.ts         # Détection automatique de source
├── data-merging.ts             # Fusion intelligente de données
└── extractors/
    ├── base-extractor.ts       # Classe de base (retry, validation)
    ├── rbq-extractor.ts        # Extracteur RBQ
    ├── req-extractor.ts        # Extracteur REQ
    ├── gcr-extractor.ts        # Extracteur GCR
    ├── extractor-factory.ts    # Factory pattern
    └── index.ts                # Exports centralisés

src/app/actions/
└── analyze-universal-doc.ts    # Orchestration principale
```

---

## 🔄 Flux d'Extraction

```
1. VALIDATION
   ↓
2. DÉTECTION DE SOURCE (RBQ? REQ? GCR?)
   ↓
3. SÉLECTION DE L'EXTRACTEUR
   ↓
4. EXTRACTION (avec retry automatique)
   ↓
5. FUSION AVEC DONNÉES EXISTANTES
   ↓
6. CALCUL DE COMPLÉTUDE
```

---

## 📊 Modèle de Données Stratifiées

Chaque donnée est un **DataPoint** avec:

```typescript
{
  value: "514-555-1234",           // Valeur
  source: "RBQ",                   // Provenance
  timestamp: "2025-01-26T...",     // Horodatage
  confidence: 1.0,                 // Confiance (0-1)
  usage: ["SUBMISSION", "MARKETING"], // Usages prévus
  notes: "Vérifié manuellement"    // Notes optionnelles
}
```

### Usages des données

- **SUBMISSION**: Qualification du prospect
- **UNDERWRITING**: Analyse de risque (tarification)
- **COMPLIANCE**: Vérifications de conformité
- **AUDIT**: Traçabilité
- **MARKETING**: Segmentation et ciblage

---

## 🚀 Utilisation

### Extraction simple

```typescript
import { analyzeUniversalDoc } from '@/src/app/actions/analyze-universal-doc';

const result = await analyzeUniversalDoc(
  "Texte copié depuis le site RBQ...",
  null, // Pas de fiche existante
  undefined // Détection automatique
);

if (result.success) {
  console.log('Fiche:', result.fiche);
  console.log('Complétude:', result.completeness);
}
```

### Enrichissement incrémental

```typescript
// 1. Extraire RBQ
const rbqResult = await analyzeUniversalDoc(rbqText);

// 2. Enrichir avec REQ
const reqResult = await analyzeUniversalDoc(
  reqText,
  rbqResult.fiche // Fiche existante
);

// 3. Enrichir avec GCR
const gcrResult = await analyzeUniversalDoc(
  gcrText,
  reqResult.fiche
);

console.log('Complétude finale:', gcrResult.completeness);
```

### Analyse multiple

```typescript
import { analyzeMultipleDocs } from '@/src/app/actions/analyze-universal-doc';

const result = await analyzeMultipleDocs([
  { text: rbqText, source: 'RBQ' },
  { text: reqText, source: 'REQ' },
  { text: gcrText, source: 'GCR' }
]);
```

---

## 🛠️ Ajouter un Nouvel Extracteur

### 1. Créer le fichier extracteur

```typescript
// lib/extractors/apchq-extractor.ts
import { z } from 'zod';
import { BaseExtractor, ExtractorConfig } from './base-extractor';
import { createDataPoint, FicheDataV2 } from '../types-v2';

const apchqSchema = z.object({
  numeroMembre: z.string().optional(),
  // ... autres champs
});

const apchqPrompt = `Tu es un expert en extraction APCHQ...`;

export class APCHQExtractor extends BaseExtractor {
  constructor() {
    super({
      sourceName: 'APCHQ',
      schema: apchqSchema,
      promptTemplate: apchqPrompt,
      temperature: 0.0,
      maxRetries: 3
    });
  }

  async extractToFiche(content: string): Promise<Partial<FicheDataV2>> {
    const rawData = await this.extract(content);
    // Transformer en FicheDataV2...
  }
}
```

### 2. Ajouter au Factory

```typescript
// lib/extractors/extractor-factory.ts
import { APCHQExtractor } from './apchq-extractor';

// Dans getExtractor():
case 'APCHQ':
  extractor = new APCHQExtractor();
  break;

// Dans getSupportedSources():
return ['RBQ', 'REQ', 'GCR', 'APCHQ'];
```

### 3. Ajouter les patterns de détection

```typescript
// lib/source-detection.ts
'APCHQ': [
  /apchq/i,
  /association\s+provinciale\s+des\s+constructeurs/i,
  /membre\s+apchq/i
]
```

---

## 🔍 Détection de Source

Le système détecte automatiquement la source en analysant:
- Mots-clés spécifiques (ex: "RBQ", "NEQ", "GCR")
- Patterns (ex: numéro de licence RBQ: `XXXX-XXXX-XX`)
- Structure du texte

**Score de confiance**: Plus il y a de matches, plus la confiance est élevée.

---

## ⚙️ Configuration

### Température de l'IA

```typescript
temperature: 0.0  // Déterministe (recommandé pour extraction)
temperature: 0.5  // Plus créatif (pour inférence)
```

### Retry

```typescript
maxRetries: 3  // Nombre de tentatives
// Backoff exponentiel: 1s, 2s, 3s
```

### Validation

Le `BaseExtractor` vérifie automatiquement:
- ✅ Données non nulles
- ✅ Au moins un champ rempli
- ✅ Structure conforme au schéma Zod

---

## 📈 Complétude

La complétude est calculée avec pondération:
- **70%** champs critiques (nom, téléphone, email, ville, licence)
- **30%** champs optionnels (NEQ, site web, code postal)

```typescript
completeness: 0.85  // 85% de complétude
```

---

## 🚨 Gestion d'Erreurs

### Niveaux d'erreur

1. **Validation**: Contenu trop court, vide
2. **Détection**: Source inconnue
3. **Extraction**: Échec de l'IA après 3 tentatives
4. **Fusion**: Conflit de données (rare)

### Warnings

- Plusieurs sources détectées
- Complétude faible (<30%)
- Données manquantes

---

## 🔐 Conformité (Loi 25)

**Aucune donnée sensible n'est stockée sur le serveur.**

- ✅ Traitement client-side (LocalStorage)
- ✅ Export vers services externes (JotForm, Google Sheets)
- ✅ Traçabilité complète (audit trail)
- ✅ Pas de PII sur le serveur RapidAssur

---

## 📝 Logs

Chaque extracteur produit des logs détaillés:

```
[RBQ] 🔄 Tentative 1/3...
[RBQ] 📊 5 champs extraits: nomEntreprise, numeroLicence, ville, telephone, courriel
[RBQ] ✅ Extraction réussie
✅ Source identifiée: RBQ
✅ Fiche enrichie avec succès (complétude: 65.0%)
```

---

## 🎯 Prochaines Étapes

- [ ] Ajouter extracteurs APCHQ, CTQ, MAPAQ, RACJ
- [ ] Support PDF/images (via OCR)
- [ ] Cache des extractions
- [ ] Export automatique vers BMS
- [ ] Interface UI pour visualisation stratifiée
- [ ] Tests unitaires pour chaque extracteur

---

## 💡 Conseils

1. **Séparez les sources**: Ne collez pas RBQ + REQ ensemble
2. **Vérifiez les warnings**: Ils indiquent des problèmes potentiels
3. **Enrichissez progressivement**: RBQ → REQ → GCR → APCHQ
4. **Validez manuellement**: L'IA peut faire des erreurs

---

**Créé avec ❤️ pour RapidAssur - Vibe Coding Philosophy**
