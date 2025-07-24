"use server";

import { gestureAssistant } from "@/ai/flows/gesture-assistant";
import { calibrateGestures } from "@/ai/flows/calibrate-gestures";
import { z } from "zod";
import type { AssistantState, CalibrationState } from "@/lib/definitions";

const gestureAssistantSchema = z.object({
  taskDescription: z.string().min(10, { message: "Please describe your task in at least 10 characters." }),
});

export async function getGestureSuggestion(prevState: AssistantState, formData: FormData): Promise<AssistantState> {
  const validatedFields = gestureAssistantSchema.safeParse({
    taskDescription: formData.get('taskDescription'),
  });

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const result = await gestureAssistant({ taskDescription: validatedFields.data.taskDescription });
    return { suggestion: result.suggestion };
  } catch (error) {
    console.error(error);
    return { error: "An error occurred while getting the suggestion. Please try again." };
  }
}


const calibrateGesturesSchema = z.object({
    gestureType: z.string(),
    sensitivityFeedback: z.string().min(10, { message: "Please provide more detailed feedback (min 10 characters)." }),
    currentSensitivitySetting: z.coerce.number(),
});

export async function getCalibrationSuggestion(prevState: CalibrationState, formData: FormData): Promise<CalibrationState> {
    const validatedFields = calibrateGesturesSchema.safeParse({
        gestureType: formData.get('gestureType'),
        sensitivityFeedback: formData.get('sensitivityFeedback'),
        currentSensitivitySetting: formData.get('currentSensitivitySetting'),
    });

    if (!validatedFields.success) {
        return {
            error: validatedFields.error.flatten().fieldErrors,
        };
    }

    try {
        const result = await calibrateGestures(validatedFields.data);
        return { 
            suggestion: result,
        };
    } catch(e) {
        console.error(e);
        return { error: 'Failed to get calibration suggestion.' };
    }
}
