"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { Dropdown, DropdownItem } from "./Dropdown";

export function ThemeToggle() {
  const { theme, setTheme, mounted } = useTheme();

  if (!mounted) {
    return (
      <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg transition-colors">
        <Sun className="w-5 h-5" />
      </button>
    );
  }

  return (
    <Dropdown
      trigger={
        <button className="p-2 text-gray-400 hover:text-gray-600 dark:text-gray-300 dark:hover:text-gray-100 rounded-lg transition-colors">
          {theme === "dark" ? (
            <Moon className="w-5 h-5" />
          ) : (
            <Sun className="w-5 h-5" />
          )}
        </button>
      }
    >
      <DropdownItem
        onClick={() => setTheme("light")}
        icon={<Sun className="w-4 h-4" />}
        className={`mb-1 ${theme === "light" ? "bg-slate-100 text-blue-700" : ""}`}
      >
        Light
      </DropdownItem>
      <DropdownItem
        onClick={() => setTheme("dark")}
        icon={<Moon className="w-4 h-4" />}
        className={theme === "dark" ? "bg-slate-600 text-blue-700" : ""}
      >
        Dark
      </DropdownItem>
    </Dropdown>
  );
}
