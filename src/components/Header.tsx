"use client";

import { SearchInput } from "@/components/ui/SearchInput";
import { Dropdown, DropdownItem, FilterButton } from "@/components/ui/Dropdown";
import { Logo } from "@/components/ui/Logo";
import {
  Filter,
  Heart,
  LogOut,
  Plus,
  Settings,
  Trash2,
  User,
  Menu,
  X,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { snippetStorage } from "@/lib/storage";
import { LANGUAGES } from "@/types";
import Link from "next/link";

export default function Header() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [availableTags, setAvailableTags] = useState<string[]>([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const searchQuery = searchParams.get("search") || "";
  const selectedLanguage = searchParams.get("language") || "";
  const selectedTag = searchParams.get("tag") || "";

  /* Loads available tags */
  useEffect(() => {
    const snippets = snippetStorage.getAll();
    const tags = snippets
      .map((snippet) => snippet.tag)
      .filter((tag) => tag && tag.trim() !== "");
    setAvailableTags([...new Set(tags)].sort());
  }, []);

  /* Update url parameters */
  const updateFilters = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    router.push(`?${params.toString()}`);
  };

  const hasActiveFilters = searchQuery || selectedLanguage || selectedTag;

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main header row */}
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Logo href="/snippets" showTitle={true} />

          {/* Desktop: Search and filters */}
          <div className="hidden lg:flex flex-1 max-w-2xl mx-4 items-center gap-3">
            <SearchInput
              className="flex-1"
              value={searchQuery}
              onChange={(value) => updateFilters("search", value)}
              placeholder="Search snippets..."
            />

            {/* Language Filter */}
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
              <DropdownItem onClick={() => updateFilters("language", "")}>
                All Languages
              </DropdownItem>
              {LANGUAGES.map((lang) => (
                <DropdownItem
                  className={
                    selectedLanguage === lang.value
                      ? "bg-blue-100 text-blue-700"
                      : ""
                  }
                  onClick={() => updateFilters("language", lang.value)}
                  key={lang.value}
                >
                  {lang.label}
                </DropdownItem>
              ))}
            </Dropdown>

            {/* Tag Filter */}
            <Dropdown
              trigger={
                <FilterButton isActive={!!selectedTag}>
                  {selectedTag || "Tag"}
                </FilterButton>
              }
            >
              <DropdownItem onClick={() => updateFilters("tag", "")}>
                All Tags
              </DropdownItem>
              {availableTags.map((tag) => (
                <DropdownItem
                  key={tag}
                  onClick={() => updateFilters("tag", tag)}
                  className={
                    selectedTag === tag ? "bg-green-100 text-green-700" : ""
                  }
                >
                  {tag}
                </DropdownItem>
              ))}
            </Dropdown>
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-2">
            {/* New Snippet Button - Hide text on mobile */}
            <Link
              href="/snippets/new"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">New Snippet</span>
            </Link>

            {/* Desktop User Menu */}
            <div className="hidden sm:block">
              <Dropdown
                trigger={
                  <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg transition-colors">
                    <User className="w-5 h-5" />
                  </button>
                }
              >
                <DropdownItem icon={<Heart className="w-4 h-4" />}>
                  <Link href="/snippets?favorites=true">Favorites</Link>
                </DropdownItem>
                <DropdownItem icon={<Trash2 className="w-4 h-4" />}>
                  <Link href="/snippets/trash">Trash</Link>
                </DropdownItem>
                <div className="border-t border-gray-100 my-1" />
                <DropdownItem icon={<Settings className="w-4 h-4" />}>
                  <Link href="/settings">Settings</Link>
                </DropdownItem>
                <DropdownItem icon={<LogOut className="w-4 h-4" />}>
                  Sign Out
                </DropdownItem>
              </Dropdown>
            </div>

            {/* Mobile menu button */}
            <button
              className="sm:hidden p-2 text-gray-400 hover:text-gray-600 rounded-lg transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="sm:hidden border-t border-gray-200 py-4 space-y-4">
            {/* Mobile Search */}
            <SearchInput
              value={searchQuery}
              onChange={(value) => updateFilters("search", value)}
              placeholder="Search snippets..."
              className="w-full"
            />

            {/* Mobile Filters */}
            <div className="flex gap-2">
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
                <DropdownItem onClick={() => updateFilters("language", "")}>
                  All Languages
                </DropdownItem>
                {LANGUAGES.map((lang) => (
                  <DropdownItem
                    className={
                      selectedLanguage === lang.value
                        ? "bg-blue-100 text-blue-700"
                        : ""
                    }
                    onClick={() => updateFilters("language", lang.value)}
                    key={lang.value}
                  >
                    {lang.label}
                  </DropdownItem>
                ))}
              </Dropdown>

              <Dropdown
                trigger={
                  <FilterButton isActive={!!selectedTag}>
                    {selectedTag || "Tag"}
                  </FilterButton>
                }
              >
                <DropdownItem onClick={() => updateFilters("tag", "")}>
                  All Tags
                </DropdownItem>
                {availableTags.map((tag) => (
                  <DropdownItem
                    key={tag}
                    onClick={() => updateFilters("tag", tag)}
                    className={
                      selectedTag === tag ? "bg-green-100 text-green-700" : ""
                    }
                  >
                    {tag}
                  </DropdownItem>
                ))}
              </Dropdown>
            </div>

            {/* Mobile User Menu */}
            <div className="space-y-2 pt-2 border-t border-gray-200">
              <Link
                href="/snippets?favorites=true"
                className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Heart className="w-4 h-4" />
                Favorites
              </Link>
              <Link
                href="/snippets/trash"
                className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Trash2 className="w-4 h-4" />
                Trash
              </Link>
              <Link
                href="/settings"
                className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Settings className="w-4 h-4" />
                Settings
              </Link>
              <button className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md">
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>

            {/* Active filters indicator */}
            {hasActiveFilters && (
              <div className="pt-2 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Active filters</span>
                  <button
                    onClick={() => {
                      updateFilters("search", "");
                      updateFilters("language", "");
                      updateFilters("tag", "");
                    }}
                    className="text-sm text-blue-600 hover:text-blue-700"
                  >
                    Clear all
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}