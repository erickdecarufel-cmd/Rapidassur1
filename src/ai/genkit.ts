
import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/googleai';

// Correction: Le modèle 2.5 flash
export const DEFAULT_MODEL = 'googleai/gemini-2.5-flash';

export const ai = genkit({
  plugins: [
    // Je garde la clé hardcodée en commentaire si jamais l'environnement lâche de nouveau
    // googleAI({ apiKey: "AIzaSyAJKJ0HofV_Sh8UULXoFVCdZ4oTEOjronY" }),
    googleAI({ apiKey: process.env.GOOGLE_GENAI_API_KEY || "AIzaSyAJKJ0HofV_Sh8UULXoFVCdZ4oTEOjronY" }),
  ],
  model: DEFAULT_MODEL,
});
