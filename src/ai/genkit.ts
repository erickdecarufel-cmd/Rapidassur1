import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

export const DEFAULT_MODEL_NAME = 'googleai/gemini-1.5-flash';

export const ai = genkit({
  plugins: [googleAI()],
  model: DEFAULT_MODEL_NAME,
});