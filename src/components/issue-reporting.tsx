
"use client";

import { useState } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export default function IssueReporting() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const issueData = {
      issueType: formData.get("issueType") as string,
      description: formData.get("description") as string,
      location: formData.get("location") as string,
      status: "Reported",
      createdAt: serverTimestamp(),
    };

    try {
      await addDoc(collection(db, "issues"), issueData);
      toast({ title: "Issue Reported", description: "City authorities have been notified of the problem." });
      (event.target as HTMLFormElement).reset();
    } catch (error) {
      toast({ variant: "destructive", title: "Error", description: "Failed to report issue. Please try again." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Report Infrastructure Issue</CardTitle>
        <CardDescription>Help us maintain the city by reporting damages or utility failures.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="issueType">Issue Type</Label>
              <Select name="issueType" required>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Pothole">Pothole</SelectItem>
                  <SelectItem value="Broken Streetlight">Broken Streetlight</SelectItem>
                  <SelectItem value="Water Leakage">Water Leakage</SelectItem>
                  <SelectItem value="Road Damage">Road Damage</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input id="location" name="location" placeholder="Street address or vicinity" required />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea 
              id="description" 
              name="description" 
              placeholder="Describe the issue in detail..." 
              rows={4} 
              required 
            />
          </div>
          <Button type="submit" className="w-full" variant="accent" disabled={loading}>
            {loading ? "Submitting Report..." : "Submit Issue Report"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
