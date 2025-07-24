"use client";

import { useFormState, useFormStatus } from "react-dom";
import { getGestureSuggestion } from "@/app/actions";
import type { AssistantState } from "@/lib/definitions";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Lightbulb } from "lucide-react";

const initialState: AssistantState = {};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Getting Suggestion..." : "Get Suggestion"}
    </Button>
  );
}

export default function AssistantPanel() {
  const [state, formAction] = useFormState(getGestureSuggestion, initialState);

  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Assistant</CardTitle>
        <CardDescription>Describe your task, and our AI will suggest the best moments to use GestureMate.</CardDescription>
      </CardHeader>
      <form action={formAction}>
        <CardContent>
          <Textarea
            name="taskDescription"
            placeholder="e.g., 'I am designing a presentation with lots of images and text boxes...'"
            rows={4}
            required
            aria-label="Task Description"
          />
          {typeof state.error === 'object' && state.error?.taskDescription && (
            <p className="text-sm font-medium text-destructive mt-2">{state.error.taskDescription[0]}</p>
          )}
        </CardContent>
        <CardFooter className="flex flex-col items-start gap-4">
          <SubmitButton />
          {state.suggestion && (
            <Alert>
                <Lightbulb className="h-4 w-4" />
                <AlertTitle>Suggestion</AlertTitle>
                <AlertDescription>
                    {state.suggestion}
                </AlertDescription>
            </Alert>
          )}
          {typeof state.error === 'string' && (
             <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                    {state.error}
                </AlertDescription>
            </Alert>
          )}
        </CardFooter>
      </form>
    </Card>
  );
}
