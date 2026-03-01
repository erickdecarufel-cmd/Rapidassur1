'use server';
import { ai } from '@/ai/genkit';
import { z } from 'zod';

const GenerateQuizRecommendationInputSchema = z.object({
  userConcern: z.string().describe("La préoccupation de l'utilisateur sélectionnée dans le quiz."),
  profileTitle: z.string().describe("Le titre du profil d'assurance recommandé."),
});
export type GenerateQuizRecommendationInput = z.infer<typeof GenerateQuizRecommendationInputSchema>;

const GenerateQuizRecommendationOutputSchema = z.object({
  explanation: z.string().describe("L'explication personnalisée justifiant la recommandation."),
});
export type GenerateQuizRecommendationOutput = z.infer<typeof GenerateQuizRecommendationOutputSchema>;

export async function generateQuizRecommendation(
  input: GenerateQuizRecommendationInput
): Promise<GenerateQuizRecommendationOutput> {
  return generateQuizRecommendationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateQuizRecommendationPrompt',
  input: { schema: GenerateQuizRecommendationInputSchema },
  output: { schema: GenerateQuizRecommendationOutputSchema },
  prompt: `Tu es un copilote d'assurance expert chez RapidAssur.\n\nTon rôle est de rassurer l'utilisateur et de justifier brièvement pourquoi un certain profil d'assurance est recommandé en fonction de sa préoccupation.\n\nSois concis, rassurant et direct. L'explication doit faire 1 à 2 phrases maximum.\n\nPréoccupation de l'utilisateur : "{{userConcern}}"\nProfil recommandé : "{{profileTitle}}"\n\nGénère une explication qui lie la préoccupation au profil.\n\nExemple :\nPréoccupation : "Je crains de causer des dommages à la propriété de mon client pendant mes travaux."\nProfil recommandé : "Entrepreneurs généraux"\nExplication attendue : "C'est une crainte légitime. Le profil Entrepreneur général inclut une assurance Responsabilité Civile Générale robuste, spécifiquement conçue pour vous couvrir en cas de dommages matériels chez vos clients."`, 
});

const generateQuizRecommendationFlow = ai.defineFlow(
  {
    name: 'generateQuizRecommendationFlow',
    inputSchema: GenerateQuizRecommendationInputSchema,
    outputSchema: GenerateQuizRecommendationOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);