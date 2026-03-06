
"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Building2, 
  CheckCircle2, 
  Wrench, 
  AlertTriangle, 
  MessageSquare 
} from "lucide-react";
import type { DashboardStats } from "@/lib/definitions";

export default function DashboardOverview() {
  const [stats, setStats] = useState<DashboardStats>({
    totalAssets: 0,
    operational: 0,
    maintenance: 0,
    critical: 0,
    reportedIssues: 0,
  });

  useEffect(() => {
    const unsubAssets = onSnapshot(collection(db, "infrastructure"), (snapshot) => {
      const docs = snapshot.docs.map(doc => doc.data());
      setStats(prev => ({
        ...prev,
        totalAssets: docs.length,
        operational: docs.filter(d => d.status === 'Operational').length,
        maintenance: docs.filter(d => d.status === 'Maintenance').length,
        critical: docs.filter(d => d.status === 'Critical').length,
      }));
    });

    const unsubIssues = onSnapshot(collection(db, "issues"), (snapshot) => {
      setStats(prev => ({
        ...prev,
        reportedIssues: snapshot.docs.length,
      }));
    });

    return () => {
      unsubAssets();
      unsubIssues();
    };
  }, []);

  const cards = [
    { title: "Total Assets", value: stats.totalAssets, icon: Building2, color: "text-blue-500" },
    { title: "Operational", value: stats.operational, icon: CheckCircle2, color: "text-green-500" },
    { title: "Maintenance", value: stats.maintenance, icon: Wrench, color: "text-yellow-500" },
    { title: "Critical", value: stats.critical, icon: AlertTriangle, color: "text-red-500" },
    { title: "Reported Issues", value: stats.reportedIssues, icon: MessageSquare, color: "text-purple-500" },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
      {cards.map((card) => (
        <Card key={card.title} className="overflow-hidden border-t-4" style={{ borderTopColor: 'currentColor' }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              {card.title}
            </CardTitle>
            <card.icon className={`h-4 w-4 ${card.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{card.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
