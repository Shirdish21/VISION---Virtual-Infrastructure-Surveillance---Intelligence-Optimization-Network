
"use client";

import { useState } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";

export default function AddAssetForm() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [healthScore, setHealthScore] = useState(100);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const assetData = {
      name: formData.get("name") as string,
      type: formData.get("type") as string,
      location: formData.get("location") as string,
      status: formData.get("status") as string,
      healthScore: healthScore,
      createdAt: serverTimestamp(),
    };

    try {
      await addDoc(collection(db, "infrastructure"), assetData);
      toast({ title: "Asset Added", description: `${assetData.name} has been recorded successfully.` });
      (event.target as HTMLFormElement).reset();
      setHealthScore(100);
    } catch (error) {
      toast({ variant: "destructive", title: "Error", description: "Failed to add asset. Please try again." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add Infrastructure Asset</CardTitle>
        <CardDescription>Register a new city asset into the surveillance network.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Infrastructure Name</Label>
              <Input id="name" name="name" placeholder="e.g. Golden Gate Bridge" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="type">Asset Type</Label>
              <Select name="type" required>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Road">Road</SelectItem>
                  <SelectItem value="Bridge">Bridge</SelectItem>
                  <SelectItem value="Pipeline">Pipeline</SelectItem>
                  <SelectItem value="Streetlight">Streetlight</SelectItem>
                  <SelectItem value="Public Facility">Public Facility</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input id="location" name="location" placeholder="e.g. Sector 5, Downtown" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Initial Status</Label>
              <Select name="status" defaultValue="Operational">
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Operational">Operational</SelectItem>
                  <SelectItem value="Maintenance">Maintenance</SelectItem>
                  <SelectItem value="Critical">Critical</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-4 py-2">
            <div className="flex justify-between">
              <Label htmlFor="healthScore">Health Score</Label>
              <span className="text-sm font-bold text-primary">{healthScore}%</span>
            </div>
            <Slider
              value={[healthScore]}
              onValueChange={(val) => setHealthScore(val[0])}
              max={100}
              step={1}
            />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Registering Asset..." : "Register Infrastructure Asset"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
