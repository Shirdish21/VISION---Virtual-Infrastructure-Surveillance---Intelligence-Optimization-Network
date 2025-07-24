import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  MousePointer2,
  MousePointerClick,
  ArrowUpDown,
  ZoomIn,
  ZoomOut,
} from "lucide-react";

const actions = [
  { gesture: "Pointing", action: "Move Cursor", icon: <MousePointer2 className="h-5 w-5 text-muted-foreground" /> },
  { gesture: "Fist", action: "Click", icon: <MousePointerClick className="h-5 w-5 text-muted-foreground" /> },
  { gesture: "Open Hand", action: "Scroll", icon: <ArrowUpDown className="h-5 w-5 text-muted-foreground" /> },
  { gesture: "Thumbs Up", action: "Zoom In", icon: <ZoomIn className="h-5 w-5 text-muted-foreground" /> },
  { gesture: "Peace Sign", action: "Zoom Out", icon: <ZoomOut className="h-5 w-5 text-muted-foreground" /> },
];

export default function ActionsPanel() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Gesture Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Gesture</TableHead>
              <TableHead>Action</TableHead>
              <TableHead className="text-right">Icon</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {actions.map((item) => (
              <TableRow key={item.gesture}>
                <TableCell className="font-medium">{item.gesture}</TableCell>
                <TableCell>{item.action}</TableCell>
                <TableCell className="flex justify-end">{item.icon}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
