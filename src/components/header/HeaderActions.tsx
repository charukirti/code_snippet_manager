"use client";

import { Dropdown, DropdownItem } from "@/components/ui/Dropdown";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Heart, LogOut, Plus, Settings, Trash2, User } from "lucide-react";
import Link from "next/link";

export default function HeaderActions() {
  return (
    <div className="flex items-center gap-2">
      {/* New Snippet Button */}
      <Link
        href="/snippets/new"
        className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition-colors"
      >
        <Plus className="w-4 h-4" />
        <span className="hidden sm:inline">New Snippet</span>
      </Link>

      {/* Theme Toggle */}
      <ThemeToggle />

      {/* User Menu - Hidden on mobile */}
      <div className="hidden sm:block">
        <Dropdown
          trigger={
            <button className="p-2 text-gray-400 hover:text-gray-600 dark:text-gray-300 dark:hover:text-gray-100 rounded-lg transition-colors">
              <User className="w-5 h-5" />
            </button>
          }
        >
          <DropdownItem icon={<Heart className="w-4 h-4" />}>
            <Link href="/snippets/favorites">Favorites</Link>
          </DropdownItem>
          <DropdownItem icon={<Trash2 className="w-4 h-4" />}>
            <Link href="/snippets/trash">Trash</Link>
          </DropdownItem>
          <div className="border-t border-gray-100 dark:border-gray-600 my-1" />
          <DropdownItem icon={<Settings className="w-4 h-4" />}>
            <Link href="/settings">Settings</Link>
          </DropdownItem>
          <DropdownItem icon={<LogOut className="w-4 h-4" />}>
            Sign Out
          </DropdownItem>
        </Dropdown>
      </div>
    </div>
  );
}
