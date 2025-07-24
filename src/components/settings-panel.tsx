"use client";

import { useState, useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { getCalibrationSuggestion } from "@/app/actions";
import type { CalibrationState } from "@/lib/definitions";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Wand2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const initialState: CalibrationState = {};

function CalibrateButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" disabled={pending} variant="outline">
            {pending ? "Calibrating..." : "Calibrate with AI"}
        </Button>
    )
}

export default function SettingsPanel() {
  const [cursorSensitivity, setCursorSensitivity] = useState(50);
  const [scrollSensitivity, setScrollSensitivity] = useState(50);
  const [state, formAction] = useFormState(getCalibrationSuggestion, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if(state.suggestion) {
        toast({
            title: "Calibration Suggestion Ready!",
            description: "Our AI has a new suggestion for your sensitivity settings."
        })
    }
  }, [state.suggestion, toast]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Settings</CardTitle>
        <CardDescription>Adjust gesture sensitivity for optimal performance.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="cursor-sensitivity">Cursor Sensitivity</Label>
          <div className="flex items-center gap-4">
            <Slider
              id="cursor-sensitivity"
              value={[cursorSensitivity]}
              onValueChange={(value) => setCursorSensitivity(value[0])}
              max={100}
              step={1}
            />
            <span className="text-sm font-medium w-10 text-center">{cursorSensitivity}</span>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="scroll-sensitivity">Scroll Sensitivity</Label>
           <div className="flex items-center gap-4">
            <Slider
                id="scroll-sensitivity"
                value={[scrollSensitivity]}
                onValueChange={(value) => setScrollSensitivity(value[0])}
                max={100}
                step={1}
            />
             <span className="text-sm font-medium w-10 text-center">{scrollSensitivity}</span>
          </div>
        </div>
      </CardContent>

      <Separator className="my-4" />

      <form action={formAction}>
        <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
                <Wand2 className="text-accent"/>
                AI Calibration
            </CardTitle>
            <CardDescription>Not sure about the settings? Let our AI help you.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="gestureType">Gesture to Calibrate</Label>
                <Select name="gestureType" defaultValue="Cursor Movement">
                    <SelectTrigger id="gestureType">
                        <SelectValue placeholder="Select a gesture" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Cursor Movement">Cursor Movement</SelectItem>
                        <SelectItem value="Scroll">Scroll</SelectItem>
                        <SelectItem value="Click">Click</SelectItem>
                        <SelectItem value="Zoom">Zoom</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <input type="hidden" name="currentSensitivitySetting" value={cursorSensitivity} />
            <div className="space-y-2">
                <Label htmlFor="sensitivityFeedback">Feedback</Label>
                <Textarea id="sensitivityFeedback" name="sensitivityFeedback" placeholder="e.g., 'The cursor moves too fast and overshoots targets.'" rows={3} required />
                 {typeof state.error === 'object' && state.error?.sensitivityFeedback && (
                    <p className="text-sm font-medium text-destructive mt-2">{state.error.sensitivityFeedback[0]}</p>
                 )}
            </div>
        </CardContent>
        <CardFooter className="flex flex-col items-start gap-4">
            <CalibrateButton />
            {state.suggestion && (
                <Alert className="bg-primary/5 border-primary/20">
                    <Wand2 className="h-4 w-4 text-primary" />
                    <AlertTitle className="text-primary">AI Recommendation</AlertTitle>
                    <AlertDescription>
                        <p className="font-semibold">{state.suggestion.explanation}</p>
                        <p className="mt-2">Suggested adjustment: <span className="font-bold text-primary">{state.suggestion.suggestedSensitivityAdjustment > 0 ? `+${state.suggestion.suggestedSensitivityAdjustment}` : state.suggestion.suggestedSensitivityAdjustment}</span></p>
                    </AlertDescription>
                </Alert>
            )}
            {typeof state.error === 'string' && (
                <Alert variant="destructive">
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{state.error}</AlertDescription>
                </Alert>
            )}
        </CardFooter>
      </form>
    </Card>
  );
}
