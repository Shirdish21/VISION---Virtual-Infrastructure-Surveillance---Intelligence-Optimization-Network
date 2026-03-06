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
import { MapPin, ArrowRight } from "lucide-react";
import type { InfrastructureAsset } from "@/lib/definitions";

interface AssetListProps {
  limit?: number;
}

export default function AssetList({ limit }: AssetListProps) {
  const [assets, setAssets] = useState<InfrastructureAsset[]>([]);

  useEffect(() => {
    let q = query(collection(db, "infrastructure"), orderBy("createdAt", "desc"));
    if (limit) {
      q = query(q, firestoreLimit(limit));
    }
    
    return onSnapshot(q, (snapshot) => {
      setAssets(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as InfrastructureAsset)));
    });
  }, [limit]);

  const getHealthColor = (score: number) => {
    if (score > 70) return "bg-emerald-500";
    if (score >= 40) return "bg-amber-500";
    return "bg-rose-500";
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'Operational': return 'default';
      case 'Maintenance': return 'outline';
      case 'Critical': return 'destructive';
      default: return 'secondary';
    }
  };

  return (
    <Card className="border-none shadow-sm ring-1 ring-border">
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <div>
          <CardTitle className="text-xl font-bold">Infrastructure Assets</CardTitle>
          <CardDescription>Directory of all urban hardware and systems.</CardDescription>
        </div>
        {limit && (
           <ArrowRight className="h-5 w-5 text-muted-foreground/30" />
        )}
      </CardHeader>
      <CardContent className="px-0 sm:px-6">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50 hover:bg-muted/50">
              <TableHead className="font-bold">Asset Name</TableHead>
              <TableHead className="font-bold">Type</TableHead>
              <TableHead className="font-bold">Location</TableHead>
              <TableHead className="font-bold">Status</TableHead>
              <TableHead className="text-right font-bold">Health</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {assets.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-12 text-muted-foreground">
                  No records found in the intelligence network.
                </TableCell>
              </TableRow>
            ) : (
              assets.map((asset) => (
                <TableRow key={asset.id} className="hover:bg-muted/30">
                  <TableCell className="font-semibold">{asset.name}</TableCell>
                  <TableCell>
                    <span className="text-xs font-medium px-2 py-1 rounded bg-secondary text-secondary-foreground">
                      {asset.type}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1.5 text-muted-foreground text-sm">
                      <MapPin className="h-3.5 w-3.5" />
                      {asset.location}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(asset.status)} className="font-bold px-2.5 py-0.5 uppercase tracking-tighter text-[10px]">
                      {asset.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-3">
                      <div className="flex-col items-end hidden sm:flex">
                        <span className="text-xs font-bold leading-none">{asset.healthScore}%</span>
                        <span className="text-[10px] text-muted-foreground uppercase tracking-widest mt-0.5">Rating</span>
                      </div>
                      <div className={`h-3 w-3 rounded-full shadow-sm ring-2 ring-background ${getHealthColor(asset.healthScore)}`} />
                    </div>
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