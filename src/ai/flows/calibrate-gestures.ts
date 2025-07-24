'use server';

/**
 * @fileOverview A tool to assist users in calibrating gesture sensitivity within the GestureMate app.
 *
 * This file exports:
 * - `calibrateGestures`: An async function that provides AI-driven assistance for adjusting gesture sensitivity.
 * - `CalibrateGesturesInput`: The input type for the `calibrateGestures` function, defining the structure of user feedback.
 * - `CalibrateGesturesOutput`: The output type for the `calibrateGestures` function, specifying the AI's recommended sensitivity adjustments.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Define the input schema for the calibrateGestures function
const CalibrateGesturesInputSchema = z.object({
  gestureType: z
    .string()
    .describe('The type of gesture being calibrated (e.g., cursor movement, click, scroll).'),
  sensitivityFeedback: z
    .string()
    .describe(
      'User feedback on the current sensitivity. Details what is working vs what is not.'
    ),
  currentSensitivitySetting: z
    .number()
    .describe('The current numerical value of the sensitivity setting.'),
});
export type CalibrateGesturesInput = z.infer<typeof CalibrateGesturesInputSchema>;

// Define the output schema for the calibrateGestures function
const CalibrateGesturesOutputSchema = z.object({
  suggestedSensitivityAdjustment: z
    .number()
    .describe(
      'The AI-suggested numerical adjustment to the sensitivity setting.  Positive number to increase sensitivity, negative to reduce it.'
    ),
  explanation: z
    .string()
    .describe(
      'An explanation from the AI justifying the suggested sensitivity adjustment.'
    ),
});
export type CalibrateGesturesOutput = z.infer<typeof CalibrateGesturesOutputSchema>;

// Exported function to call the flow
export async function calibrateGestures(input: CalibrateGesturesInput): Promise<CalibrateGesturesOutput> {
  return calibrateGesturesFlow(input);
}

// Define the prompt
const calibrateGesturesPrompt = ai.definePrompt({
  name: 'calibrateGesturesPrompt',
  input: {schema: CalibrateGesturesInputSchema},
  output: {schema: CalibrateGesturesOutputSchema},
  prompt: `You are an AI assistant helping users calibrate the sensitivity of hand gestures within an application.

The user is calibrating the "{{gestureType}}" gesture.  The current sensitivity setting is {{currentSensitivitySetting}}.

Based on the user's feedback, suggest an adjustment to the sensitivity setting. Explain your reasoning for the suggested adjustment.

User Feedback: "{{{sensitivityFeedback}}}"

Your suggested sensitivity adjustment (as a number):`,
});

// Define the flow
const calibrateGesturesFlow = ai.defineFlow(
  {
    name: 'calibrateGesturesFlow',
    inputSchema: CalibrateGesturesInputSchema,
    outputSchema: CalibrateGesturesOutputSchema,
  },
  async input => {
    const {output} = await calibrateGesturesPrompt(input);
    return output!;
  }
);
