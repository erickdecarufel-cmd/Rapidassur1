'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft, ExternalLink, Mail, Smartphone, Copy, AlertTriangle,
  CheckCircle, Zap, FileText, Shield, User, Building2, ChevronDown,
} from 'lucide-react';

// ─────────────────────────────────────────
// DONNÉES : 10 formulaires JotForm
// ─────────────────────────────────────────
const SELECTEUR_FORMS = [
  {
    id: 'construction',
    label: 'Construction & Rénovation',
    emoji: '🏗️',
    formId: '260507298912260',
    url: 'https://form.jotform.com/260507298912260',
    champs: 208,
    sousProduits: [
      'Entrepreneur général',
      'Entrepreneur spécialisé',
      'Chantier spécifique',
      'Construction annuelle (CGL)',
      'Promoteur immobilier',
      'Rénovation résidentielle',
    ],
    assureurs: ["L'Unique", 'Intact', 'Aviva', 'Northbridge'],
    suggestions: ['immobilier'],
    produits: ['RCG', 'Chantier', 'Cautionnement'],
    callBrokerTags: ['dynamitage', 'décontamination', 'déplacement bâtiment'],
  },
  {
    id: 'flotte',
    label: 'Flotte & Transport',
    emoji: '🚛',
    formId: '260512085208248',
    url: 'https://form.jotform.com/260512085208248',
    champs: 187,
    sousProduits: [
      'Camions commerciaux',
      'Transport de marchandises',
      'Véhicules de service',
      'Transport de personnes',
      'Taxi / VTC',
      'Déménagement',
      'Autobus scolaire',
    ],
    assureurs: ['Intact', 'Aviva', 'Northbridge', 'Economical'],
    suggestions: [],
    produits: ['Auto commerciale', 'Cargo', 'Responsabilité'],
    callBrokerTags: ['matières dangereuses', 'transport spécialisé'],
  },
  {
    id: 'immobilier',
    label: 'Copropriété & Immobilier',
    emoji: '🏢',
    formId: '260512137678257',
    url: 'https://form.jotform.com/260512137678257',
    champs: 190,
    sousProduits: [
      'Condo moins de 4 étages',
      'Condo 4 étages et plus',
      'Immeuble locatif',
      'Terrain vacant',
      'Bâtiment commercial',
      'Syndicat de copropriété',
      'Gestionnaire immobilier',
    ],
    assureurs: ['Intact', 'Aviva', 'RSA', 'Economical'],
    suggestions: ['construction'],
    produits: ["Biens immeubles", "RC immeuble", "Interruption d'affaires"],
    callBrokerTags: ['terrain contaminé', 'bâtiment vacant > 30 jours'],
  },
  {
    id: 'pro',
    label: 'E&O / Cyber / D&O',
    emoji: '🧠',
    formId: '260512255889262',
    url: 'https://form.jotform.com/260512255889262',
    champs: 252,
    sousProduits: [
      "Erreurs & Omissions (E&O)",
      "Cyber & Protection données",
      "Administrateurs & Dirigeants (D&O)",
      "RC Professionnelle",
      "IT & Consultants tech",
      "Consultants gestion",
      "Architectes & Ingénieurs",
    ],
    assureurs: ['Zurich', 'Intact', 'CNA', 'Chubb'],
    suggestions: [],
    produits: ['E&O', 'Cyber', 'D&O'],
    callBrokerTags: [],
  },
  {
    id: 'commercial',
    label: 'Commerce détail & Bureaux',
    emoji: '🏪',
    formId: '260522507223043',
    url: 'https://form.jotform.com/260522507223043',
    champs: 99,
    sousProduits: [
      'Commerce de détail',
      'Épicerie / Alimentation',
      'Bureau professionnel',
      'Franchise',
      'Service rapide',
      'Pharmacie',
    ],
    assureurs: ['Intact', 'Aviva', 'Economical', 'RSA'],
    suggestions: [],
    produits: ["Biens", "RC commerciale", "Interruption d'affaires"],
    callBrokerTags: [],
  },
  {
    id: 'hospitalite',
    label: 'Restauration & Bars',
    emoji: '🍽️',
    formId: '260522506728052',
    url: 'https://form.jotform.com/260522506728052',
    champs: 75,
    sousProduits: [
      'Restaurant',
      'Bar / Brasserie',
      'Traiteur',
      'Food truck',
      'Hôtel / Motel',
      'Bed & Breakfast',
      'Salle de réception',
    ],
    assureurs: ['Intact', 'Aviva', 'Sovereign General'],
    suggestions: ['flotte'],
    produits: ["RC hôte liqueur", "Biens", "Interruption d'affaires"],
    callBrokerTags: ['permis alcool RACJ'],
  },
  {
    id: 'fabrication',
    label: 'Fabrication & Distribution',
    emoji: '🏭',
    formId: '260522561165048',
    url: 'https://form.jotform.com/260522561165048',
    champs: 84,
    sousProduits: [
      'Manufacturier',
      'Distributeur',
      'Entrepôt',
      'Assemblage',
      'Atelier spécialisé',
      'Importateur',
    ],
    assureurs: ['Zurich', 'Intact', 'Northbridge', 'Aviva'],
    suggestions: ['flotte'],
    produits: ["RC produits", "Biens", "Bris équipement"],
    callBrokerTags: ['produits pharmaceutiques', 'alimentation'],
  },
  {
    id: 'agricole',
    label: 'Agricole & Équestre',
    emoji: '🌾',
    formId: '260523334001036',
    url: 'https://form.jotform.com/260523334001036',
    champs: 88,
    sousProduits: [
      'Culture / Récolte',
      'Élevage',
      'Équestre',
      'Agrotourisme',
      'Maraîcher',
      'Érablière',
    ],
    assureurs: ['La Capitale', 'Intact', 'Aviva'],
    suggestions: ['flotte'],
    produits: ["RC agricole", "Bâtiments", "Mortalité animale"],
    callBrokerTags: [],
  },
  {
    id: 'sante',
    label: 'Santé & Services personne',
    emoji: '🏥',
    formId: '260523349099059',
    url: 'https://form.jotform.com/260523349099059',
    champs: 78,
    sousProduits: [
      'Médecin / Clinique',
      'Dentiste',
      'Physiothérapeute',
      'Chiropraticien',
      'Infirmière / Soins',
      'Psychologue / Psy',
      'Kinésiologue',
    ],
    assureurs: ['CHUBB', 'Intact', 'RSA'],
    suggestions: [],
    produits: ["RC médicale", "E&O santé", "Biens clinique"],
    callBrokerTags: ['médecin spécialiste'],
  },
  {
    id: 'securite',
    label: 'Sécurité & Protection',
    emoji: '🛡️',
    formId: '260522729700049',
    url: 'https://form.jotform.com/260522729700049',
    champs: 56,
    sousProduits: [
      'Gardiennage non armé',
      'Gardiennage armé',
      'Sécurité événementielle',
      'Investigation privée',
      "Installation alarme",
      'Surveillance caméra',
    ],
    assureurs: ['Intact', 'Northbridge', 'Chubb'],
    suggestions: ['flotte'],
    produits: ["RC gardiennage", "E&O sécurité", "Biens"],
    callBrokerTags: ['armé', 'investigation'],
  },
];

// ─────────────────────────────────────────
// COMPOSANT PRINCIPAL
// ─────────────────────────────────────────
export default function PropositionsNouvellesAffaires() {
  // Sélecteur
  const [selectedFormId, setSelectedFormId] = useState('');
  const [selectedSousProduit, setSelectedSousProduit] = useState('');
  const [selectedAssureur, setSelectedAssureur] = useState('');
  const [showIframe, setShowIframe] = useState(false);

  // Fiche Nominative SOCLE
  const [nomLegal, setNomLegal] = useState('');
  const [neq, setNeq] = useState('');
  const [adresse, setAdresse] = useState('');
  const [ville, setVille] = useState('');
  const [codePostal, setCodePostal] = useState('');
  const [contactNom, setContactNom] = useState('');
  const [telephone, setTelephone] = useState('');
  const [courriel, setCourriel] = useState('');
  const [copied, setCopied] = useState(false);

  const form = SELECTEUR_FORMS.find(f => f.id === selectedFormId);

  // Calcul complétude fiche (pour indicateur visuel)
  const ficheFields = [nomLegal, neq, adresse, ville, codePostal, contactNom, telephone, courriel];
  const ficheRemplis = ficheFields.filter(v => v.trim() !== '').length;
  const ficheTotal = ficheFields.length;
  const fichePct = Math.round((ficheRemplis / ficheTotal) * 100);

  // Construction de l'URL pré-remplie
  function buildUrl(): string {
      if (!form) return '';
      const params = new URLSearchParams();
      params.set('meta_source', 'rapidassur-courtier');
      if (selectedAssureur) params.set('meta_assureur', selectedAssureur);
      if (selectedSousProduit) params.set('meta_sousproduit', selectedSousProduit);
      if (nomLegal) params.set('core_legal_name', nomLegal);
      if (neq) params.set('core_neq', neq);
      if (adresse) params.set('core_address', adresse);
      if (ville) params.set('core_city', ville);
      if (codePostal) params.set('core_postal', codePostal);
      if (contactNom) params.set('core_contact_name', contactNom);
      if (telephone) params.set('core_phone', telephone);
      if (courriel) params.set('core_email', courriel);
      return `${form.url}?${params.toString()}`;
  }

  const prefillUrl = buildUrl();

  function copyUrl() {
      navigator.clipboard.writeText(prefillUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
  }

  // Alertes intelligentes
  const callBrokerAlert = form?.callBrokerTags.length ? form.callBrokerTags.some(tag =>
      selectedSousProduit.toLowerCase().includes(tag.toLowerCase())
  ) : false;

  const suggestions = form?.suggestions
      .map(id => SELECTEUR_FORMS.find(f => f.id === id))
      .filter(Boolean) ?? [];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <Link href="/internal/dashboard" className="text-gray-400 hover:text-gray-600">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-[#003366]"> Nouvelle Affaire -- Sélecteur de propositions </h1>
            <p className="text-sm text-gray-500"> Identifiez le bon formulaire · Pré-remplissez · Lancez en direct </p>
          </div>
        </div>

        {/* ─── SECTION 1 : SÉLECTEUR EXPRESS ─── */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-4">
            <div className="flex items-center gap-2 mb-4">
                <Zap className="w-5 h-5 text-[#E9711C]" />
                <h2 className="text-lg font-semibold text-[#003366]">Sélecteur Express</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                {/* Secteur */}
                <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1 uppercase tracking-wide"> Secteur d&apos;activité </label>
                    <select
                        value={selectedFormId}
                        onChange={e => {
                            setSelectedFormId(e.target.value);
                            setSelectedSousProduit('');
                            setSelectedAssureur('');
                            setShowIframe(false);
                        }}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                    >
                        <option value="">-- Choisir le secteur --</option>
                        {SELECTEUR_FORMS.map(f => (
                            <option key={f.id} value={f.id}>
                                {f.emoji} {f.label} ({f.champs} champs)
                            </option>
                        ))}
                    </select>
                </div>

                {/* Sous-produit */}
                <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1 uppercase tracking-wide"> Sous-produit </label>
                    <select
                        value={selectedSousProduit}
                        onChange={e => setSelectedSousProduit(e.target.value)}
                        disabled={!form}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB] disabled:bg-gray-100"
                    >
                        <option value="">-- Choisir --</option>
                        {form?.sousProduits.map(sp => (
                            <option key={sp} value={sp}>{sp}</option>
                        ))}
                    </select>
                </div>

                {/* Assureur cible */}
                <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1 uppercase tracking-wide"> Assureur cible </label>
                    <select
                        value={selectedAssureur}
                        onChange={e => setSelectedAssureur(e.target.value)}
                        disabled={!form}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB] disabled:bg-gray-100"
                    >
                        <option value="">-- Assureur habituel --</option>
                        {form?.assureurs.map(a => (
                            <option key={a} value={a}>{a}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Résultat sélection */}
            {form && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <div className="flex flex-wrap items-center gap-3">
                        <span className="text-xl">{form.emoji}</span>
                        <span className="font-semibold text-[#003366] text-sm">{form.label}</span>
                        <span className="text-xs text-gray-500 bg-white border rounded px-2 py-0.5"> {form.champs} champs </span>
                        {form.produits.map(p => (
                            <span key={p} className="text-xs bg-white border rounded px-2 py-0.5 text-gray-600">{p}</span>
                        ))}
                        {selectedSousProduit && (
                            <span className="text-xs bg-blue-100 text-blue-700 border border-blue-200 rounded px-2 py-0.5 font-medium"> {selectedSousProduit} </span>
                        )}
                        {selectedAssureur && (
                            <span className="text-xs bg-[#003366] text-white rounded px-2 py-0.5 font-medium"> {selectedAssureur} </span>
                        )}
                    </div>
                </div>
            )}
        </div>

        {/* ─── SECTION 2 : FICHE NOMINATIVE SOCLE (intégrée) ─── */}
        {form && (
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm mb-4 overflow-hidden">
                {/* Header carte */}
                <div className="flex items-center justify-between px-5 py-3 border-b bg-gray-50">
                    <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-[#003366]" />
                        <span className="text-sm font-semibold text-[#003366]">Fiche Nominative -- SOCLE</span>
                        <span className="text-xs text-gray-400">· pré-remplit JotForm automatiquement</span>
                    </div>
                    {/* Indicateur de complétude */}
                    <div className="flex items-center gap-2">
                        <div className="w-24 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                            <div
                                className={`h-full rounded-full transition-all duration-300 ${ 
                                    fichePct === 100 ? 'bg-green-500' : fichePct >= 50 ? 'bg-[#E9711C]' : 'bg-gray-300'
                                }`}
                                style={{ width: `${fichePct}%` }}
                            />
                        </div>
                        <span className="text-xs text-gray-500 w-16 text-right"> {ficheRemplis}/{ficheTotal} champs </span>
                    </div>
                </div>

                {/* Corps de la fiche */}
                <div className="p-5">
                    {/* Ligne 1 : Entreprise */}
                    <div className="flex items-center gap-2 mb-3">
                        <Building2 className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                        <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Entreprise</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                        <div className="md:col-span-2">
                            <label className="block text-xs text-gray-500 mb-1">Nom légal</label>
                            <input value={nomLegal} onChange={e => setNomLegal(e.target.value)} placeholder="Construction ABC inc." type="text" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB] bg-gray-50 focus:bg-white" />
                        </div>
                        <div>
                            <label className="block text-xs text-gray-500 mb-1">NEQ</label>
                            <input value={neq} onChange={e => setNeq(e.target.value)} placeholder="1234567890" type="text" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB] bg-gray-50 focus:bg-white" />
                        </div>
                    </div>

                    {/* Ligne 2 : Adresse */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                        <div className="md:col-span-1">
                            <label className="block text-xs text-gray-500 mb-1">Adresse</label>
                            <input value={adresse} onChange={e => setAdresse(e.target.value)} placeholder="123, rue Principale" type="text" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB] bg-gray-50 focus:bg-white" />
                        </div>
                        <div>
                            <label className="block text-xs text-gray-500 mb-1">Ville</label>
                            <input value={ville} onChange={e => setVille(e.target.value)} placeholder="Montréal" type="text" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB] bg-gray-50 focus:bg-white" />
                        </div>
                        <div>
                            <label className="block text-xs text-gray-500 mb-1">Code postal</label>
                            <input value={codePostal} onChange={e => setCodePostal(e.target.value)} placeholder="H2X 1Y4" type="text" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB] bg-gray-50 focus:bg-white" />
                        </div>
                    </div>

                    {/* Ligne 3 : Contact */}
                    <div className="flex items-center gap-2 mb-3">
                        <User className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                        <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Contact principal</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                        <div>
                            <label className="block text-xs text-gray-500 mb-1">Nom</label>
                            <input value={contactNom} onChange={e => setContactNom(e.target.value)} placeholder="Jean Tremblay" type="text" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB] bg-gray-50 focus:bg-white" />
                        </div>
                        <div>
                            <label className="block text-xs text-gray-500 mb-1">Téléphone</label>
                            <input value={telephone} onChange={e => setTelephone(e.target.value)} placeholder="514-555-1234" type="tel" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB] bg-gray-50 focus:bg-white" />
                        </div>
                        <div>
                            <label className="block text-xs text-gray-500 mb-1">Courriel</label>
                            <input value={courriel} onChange={e => setCourriel(e.target.value)} placeholder="jean@constructionabc.com" type="email" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB] bg-gray-50 focus:bg-white" />
                        </div>
                    </div>

                    {/* URL pré-remplie + actions */}
                    <div className="border border-gray-200 rounded-lg overflow-hidden">
                        <div className="flex items-center justify-between px-3 py-2 bg-gray-50 border-b border-gray-200">
                            <span className="text-xs font-medium text-gray-600">URL pré-remplie → JotForm</span>
                            <div className="flex items-center gap-3">
                                <button onClick={copyUrl} className="flex items-center gap-1 text-xs text-[#2563EB] hover:text-blue-800 font-medium">
                                    <Copy className="w-3 h-3" />
                                    {copied ? '✓ Copié !' : 'Copier'}
                                </button>
                            </div>
                        </div>
                        <div className="px-3 py-2 text-xs text-gray-400 break-all font-mono leading-relaxed bg-white">
                            {prefillUrl || <span className="text-gray-300 italic">Sélectionnez un secteur pour générer l&apos;URL…</span>}
                        </div>
                    </div>

                    {/* Boutons d'action */}
                    <div className="flex gap-2 flex-wrap mt-4">
                        <button
                            onClick={() => setShowIframe(true)}
                            className="flex items-center gap-2 bg-[#2563EB] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition"
                        >
                            <ExternalLink className="w-4 h-4" />
                            GO LIVE -- Ouvrir JotForm
                        </button>
                        <button
                            onClick={() => window.open(`mailto:?subject=Formulaire RapidAssur -- ${form.label}&body=${encodeURIComponent(prefillUrl)}`, '_blank')}
                            className="flex items-center gap-2 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm hover:bg-gray-50 transition"
                        >
                            <Mail className="w-4 h-4" />
                            Par courriel
                        </button>
                        <button
                            onClick={() => window.open(`sms:?body=${encodeURIComponent(prefillUrl)}`, '_blank')}
                            className="flex items-center gap-2 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm hover:bg-gray-50 transition"
                        >
                            <Smartphone className="w-4 h-4" />
                            SMS
                        </button>
                    </div>
                </div>

                {/* Footer Loi 25 */}
                <div className="flex items-start gap-2 px-5 py-2.5 border-t bg-gray-50 text-xs text-gray-400">
                    <Shield className="w-3.5 h-3.5 mt-0.5 shrink-0 text-gray-400" />
                    <span>
                        <strong className="text-gray-500">Loi 25 :</strong>{' '}
                        RapidAssur ne conserve que le courriel + consentement.
                        Toutes les données client transitent vers Epic via PDF. Aucun stockage Firestore.
                    </span>
                </div>
            </div>
        )}

        {/* ─── ALERTES + RECOMMANDATIONS ─── */}
        {form && (callBrokerAlert || suggestions.length > 0) && (
            <div className="flex flex-col gap-2 mb-4">
                {callBrokerAlert && (
                    <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 text-sm text-amber-800">
                        <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" />
                        <span>
                            Ce type de risque requiert une attention spéciale.
                            Appelez votre souscripteur avant de soumettre.
                        </span>
                    </div>
                )}
                {suggestions.length > 0 && (
                    <div className="flex items-start gap-2 bg-green-50 border border-green-200 rounded-lg px-4 py-3 text-sm text-green-800">
                        <CheckCircle className="w-4 h-4 mt-0.5 shrink-0" />
                        <span>
                            Ce prospect pourrait aussi avoir besoin de :{' '}
                            {suggestions.map((s, i) => (
                                <button
                                    key={s!.id}
                                    onClick={() => {
                                        setSelectedFormId(s!.id);
                                        setSelectedSousProduit('');
                                        setSelectedAssureur('');
                                        setShowIframe(false);
                                    }}
                                    className="font-semibold underline hover:text-green-900"
                                >
                                    {s!.emoji} {s!.label}{i < suggestions.length - 1 ? ', ' : ''}
                                </button>
                            ))}
                        </span>
                    </div>
                )}
            </div>
        )}

        {/* ─── SECTION GO LIVE : IFRAME JOTFORM ─── */}
        {showIframe && form && (
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="flex items-center justify-between px-4 py-3 border-b bg-[#003366]">
                    <div className="flex items-center gap-2">
                        <ExternalLink className="w-4 h-4 text-white/70" />
                        <span className="text-white font-medium text-sm">
                            {form.emoji} {form.label}
                            {selectedSousProduit ? ` -- ${selectedSousProduit}` : ''}
                            {selectedAssureur ? ` · ${selectedAssureur}` : ''}
                        </span>
                    </div>
                    <button
                        onClick={() => setShowIframe(false)}
                        className="text-white/60 hover:text-white text-xs px-2 py-1 rounded hover:bg-white/10 transition"
                    >
                        ✕ Fermer
                    </button>
                </div>
                <iframe
                    src={prefillUrl}
                    className="w-full"
                    style={{ height: '750px', border: 'none' }}
                    title={`Formulaire ${form.label}`}
                />
            </div>
        )}

      </div>
    </div>
  );
}
