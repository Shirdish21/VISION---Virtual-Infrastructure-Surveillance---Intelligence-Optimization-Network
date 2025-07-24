export type AssistantState = {
  suggestion?: string;
  error?: string | { taskDescription?: string[] };
};

export type CalibrationState = {
    suggestion?: {
        suggestedSensitivityAdjustment: number;
        explanation: string;
    };
    error?: string | { sensitivityFeedback?: string[] };
}
