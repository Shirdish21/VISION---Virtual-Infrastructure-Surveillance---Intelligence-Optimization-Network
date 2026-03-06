"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, onSnapshot, query, orderBy, limit as firestoreLimit } from "firebase/firestore";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Clock, MessageSquare } from "lucide-react";
import type { InfrastructureIssue } from "@/lib/definitions";

interface ReportedIssuesProps {
  limit?: number;
}

export default function ReportedIssues({ limit }: ReportedIssuesProps) {
  const [issues, setIssues] = useState<InfrastructureIssue[]>([]);

  useEffect(() => {
    let q = query(collection(db, "issues"), orderBy("createdAt", "desc"));
    if (limit) {
      q = query(q, firestoreLimit(limit));
    }
    
    return onSnapshot(q, (snapshot) => {
      setIssues(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as InfrastructureIssue)));
    });
  }, [limit]);

  return (
    <Card className="border-none shadow-sm ring-1 ring-border">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-bold">Incident Management Log</CardTitle>
            <CardDescription>Active citizen feedback and system alerts.</CardDescription>
          </div>
          <MessageSquare className="h-5 w-5 text-muted-foreground/30" />
        </div>
      </CardHeader>
      <CardContent className="px-0 sm:px-6">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50 hover:bg-muted/50">
              <TableHead className="font-bold">Type</TableHead>
              <TableHead className="font-bold">Description</TableHead>
              <TableHead className="font-bold">Location</TableHead>
              <TableHead className="text-right font-bold">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {issues.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-12 text-muted-foreground">
                  Intelligence log is currently empty.
                </TableCell>
              </TableRow>
            ) : (
              issues.map((issue) => (
                <TableRow key={issue.id} className="hover:bg-muted/30">
                  <TableCell className="font-bold text-destructive/80 text-xs uppercase tracking-tighter">
                    {issue.issueType}
                  </TableCell>
                  <TableCell className="max-w-[200px]">
                    <p className="text-sm truncate">{issue.description}</p>
                  </TableCell>
                  <TableCell>
                    <span className="text-xs text-muted-foreground">{issue.location}</span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 font-bold uppercase text-[9px] tracking-widest px-2">
                      <Clock className="h-3 w-3 mr-1" /> {issue.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}