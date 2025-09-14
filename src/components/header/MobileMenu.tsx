"use client";

import { Dropdown, DropdownItem, FilterButton } from "@/components/ui/Dropdown";
import { HeaderSearch } from "./index";
import { Filter, Heart, LogOut, Settings, Trash2 } from "lucide-react";
import { LANGUAGES } from "@/types";
import Link from "next/link";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  searchQuery: string;
  selectedLanguage: string;
  selectedTag: string;
  availableTags: string[];
  hasActiveFilters: boolean;
  onSearchChange: (value: string) => void;
  onLanguageChange: (language: string) => void;
  onTagChange: (tag: string) => void;
  onClearAllFilters: () => void;
}

export default function MobileMenu({
  isOpen,
  onClose,
  searchQuery,
  selectedLanguage,
  selectedTag,
  availableTags,
  hasActiveFilters,
  onSearchChange,
  onLanguageChange,
  onTagChange,
  onClearAllFilters,
}: MobileMenuProps) {
  if (!isOpen) return null;

  return (
    <div className="sm:hidden border-t border-gray-200 py-4 space-y-4">
      {/* Search */}
      <HeaderSearch
        value={searchQuery}
        onChange={onSearchChange}
        className="w-full"
      />

      {/* Filters */}
      <div className="flex gap-4 justify-center">
        <div className="relative z-50">
          <Dropdown
            trigger={
              <FilterButton
                icon={<Filter className="w-4 h-4" />}
                isActive={!!selectedLanguage}
              >
                {selectedLanguage
                  ? LANGUAGES.find((l) => l.value === selectedLanguage)?.label
                  : "Language"}
              </FilterButton>
            }
          >
            <DropdownItem onClick={() => onLanguageChange("")}>
              All Languages
            </DropdownItem>
            {LANGUAGES.map((lang) => (
              <DropdownItem
                className={
                  selectedLanguage === lang.value
                    ? "bg-blue-100 text-blue-700"
                    : ""
                }
                onClick={() => onLanguageChange(lang.value)}
                key={lang.value}
              >
                {lang.label}
              </DropdownItem>
            ))}
          </Dropdown>
        </div>

        <div className="relative z-50">
          <Dropdown
            trigger={
              <FilterButton isActive={!!selectedTag}>
                {selectedTag || "Tag"}
              </FilterButton>
            }
          >
            <DropdownItem onClick={() => onTagChange("")}>
              All Tags
            </DropdownItem>
            {availableTags.map((tag) => (
              <DropdownItem
                key={tag}
                onClick={() => onTagChange(tag)}
                className={
                  selectedTag === tag ? "bg-green-100 text-green-700" : ""
                }
              >
                {tag}
              </DropdownItem>
            ))}
          </Dropdown>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="space-y-2 pt-2 border-t border-gray-200">
        <Link
          href="/snippets/favorites"
          className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
          onClick={onClose}
        >
          <Heart className="w-4 h-4" />
          Favorites
        </Link>
        <Link
          href="/snippets/trash"
          className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
          onClick={onClose}
        >
          <Trash2 className="w-4 h-4" />
          Trash
        </Link>
        <Link
          href="/settings"
          className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
          onClick={onClose}
        >
          <Settings className="w-4 h-4" />
          Settings
        </Link>
        <button className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md text-left">
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <div className="pt-2 border-t border-gray-200 dark:border-gray-600">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500 dark:text-gray-400">Active filters</span>
            <button
              onClick={onClearAllFilters}
              className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            >
              Clear all
            </button>
          </div>
        </div>
      )}
    </div>
  );
}