"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const gestures = ["Open Hand", "Fist", "Peace Sign", "Thumbs Up", "Pointing"];

export default function WebcamFeed() {
  const [recognizedGesture, setRecognizedGesture] = useState<string | null>(null);
  const [isRecognizing, setIsRecognizing] = useState(false);

  useEffect(() => {
    // Initial gesture
    setIsRecognizing(true);
    setRecognizedGesture(gestures[0]);
    setTimeout(() => setIsRecognizing(false), 1000);

    // Cycle through gestures
    const interval = setInterval(() => {
      setIsRecognizing(true);
      const randomGesture = gestures[Math.floor(Math.random() * gestures.length)];
      setRecognizedGesture(randomGesture);
      setTimeout(() => {
        setIsRecognizing(false);
      }, 1000);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Live Feed</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative w-full aspect-video overflow-hidden rounded-lg bg-secondary">
          <Image
            src="https://placehold.co/1280x720.png"
            alt="Webcam Feed"
            fill
            className="object-cover"
            data-ai-hint="webcam view person"
            priority
          />
          <div className="absolute inset-0 bg-black/10" />
          <div
            className={cn(
              "absolute bottom-4 right-4 transition-all duration-300",
              isRecognizing ? "opacity-100 scale-100" : "opacity-0 scale-90"
            )}
          >
            {recognizedGesture && (
              <Badge variant="secondary" className="text-lg font-semibold py-2 px-4 shadow-lg bg-background/80 backdrop-blur-sm">
                {recognizedGesture}
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
