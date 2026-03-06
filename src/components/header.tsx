"use client"

import { SidebarTrigger } from "@/components/ui/sidebar";
import { ThemeToggle } from "@/components/theme-toggle";
import { User, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Header() {
  return (
    <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center justify-between border-b bg-background/80 px-4 backdrop-blur-md md:px-6">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="h-9 w-9" />
        <div className="hidden md:block">
          <p className="text-xs uppercase tracking-widest text-muted-foreground font-bold">
            Infrastructure Intelligence Network
          </p>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <ThemeToggle />
        <Button variant="ghost" size="icon" className="rounded-full">
          <Bell className="h-5 w-5" />
        </Button>
        <div className="w-px h-6 bg-border mx-2" />
        <div className="flex items-center gap-3 pl-2">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold leading-none">Admin Console</p>
            <p className="text-xs text-muted-foreground mt-1">Smart City Dept</p>
          </div>
          <Avatar className="h-9 w-9 cursor-pointer border">
            <AvatarImage src="https://picsum.photos/seed/vision/100" />
            <AvatarFallback>AD</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}