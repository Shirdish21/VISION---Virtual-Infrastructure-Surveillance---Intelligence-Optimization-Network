'use server';

/**
 * @fileOverview Provides an AI assistant to suggest optimal times to use GestureMate.
 *
 * - gestureAssistant - A function that analyzes a task and suggests optimal times to use GestureMate.
 * - GestureAssistantInput - The input type for the gestureAssistant function.
 * - GestureAssistantOutput - The return type for the gestureAssistant function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GestureAssistantInputSchema = z.object({
  taskDescription: z
    .string()
    .describe('A detailed description of the task the user is currently undertaking.'),
});
export type GestureAssistantInput = z.infer<typeof GestureAssistantInputSchema>;

const GestureAssistantOutputSchema = z.object({
  suggestion: z
    .string()
    .describe(
      'A suggestion of when the user can utilise GestureMate for optimal performance during the task.'
    ),
});
export type GestureAssistantOutput = z.infer<typeof GestureAssistantOutputSchema>;

export async function gestureAssistant(input: GestureAssistantInput): Promise<GestureAssistantOutput> {
  return gestureAssistantFlow(input);
}

const prompt = ai.definePrompt({
  name: 'gestureAssistantPrompt',
  input: {schema: GestureAssistantInputSchema},
  output: {schema: GestureAssistantOutputSchema},
  prompt: `You are an AI assistant designed to suggest when a user should use a gesture-based control system called GestureMate.

Given the following task description, analyze the task and suggest when using GestureMate would be most efficient. Consider scenarios where hands-free control or specific gestures could speed up or simplify the task.

Task Description: {{{taskDescription}}}

Focus on specific moments or sub-tasks where GestureMate could provide a clear advantage.

Output a concise suggestion.`,
});

const gestureAssistantFlow = ai.defineFlow(
  {
    name: 'gestureAssistantFlow',
    inputSchema: GestureAssistantInputSchema,
    outputSchema: GestureAssistantOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
