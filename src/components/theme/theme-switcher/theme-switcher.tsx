"use client";

import { useState, useEffect, ReactNode } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "~/components/ui/button";
import { Skeleton } from "~/components/ui/skeleton";

export const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  const themeButtons: Record<string, ReactNode> = {
    light: <Moon className="absolute h-[1.2rem] w-[1.2rem] stroke-foreground" />,
    dark: <Sun className="h-[1.2rem] w-[1.2rem] stroke-foreground" />,
  };

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <Skeleton className="h-10 w-10" />;
  }

  return (
    <Button variant="ghost" size="icon" onClick={toggleTheme}>
      {themeButtons[theme as string]}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};
