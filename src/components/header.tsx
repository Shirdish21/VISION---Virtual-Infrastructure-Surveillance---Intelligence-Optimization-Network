
import { Activity } from "lucide-react";

export default function Header() {
  return (
    <header className="flex h-16 shrink-0 items-center border-b bg-card px-4 md:px-6 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="bg-primary p-2 rounded-lg">
          <Activity className="h-6 w-6 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight text-foreground leading-none">
            VISION
          </h1>
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">
            Infrastructure Intelligence Network
          </p>
        </div>
      </div>
    </header>
  );
}
