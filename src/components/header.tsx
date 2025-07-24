import { Hand } from "lucide-react";

export default function Header() {
  return (
    <header className="flex h-16 shrink-0 items-center border-b bg-card px-4 md:px-6">
      <div className="flex items-center gap-2">
        <Hand className="h-6 w-6 text-primary" />
        <h1 className="text-xl font-bold tracking-tight text-foreground">
          GestureMate
        </h1>
      </div>
    </header>
  );
}
