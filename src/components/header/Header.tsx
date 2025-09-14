"use client";

import { Logo } from "@/components/ui/Logo";
import { HeaderSearch, HeaderFilters, HeaderActions, MobileMenu } from "./index";
import { Menu, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { snippetStorage } from "@/lib/storage";

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

  const handleClearAllFilters = () => {
    updateFilters("search", "");
    updateFilters("language", "");
    updateFilters("tag", "");
  };

  const hasActiveFilters = searchQuery || selectedLanguage || selectedTag;

  const activeFilters = Boolean(hasActiveFilters)

  return (
    <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-400 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Logo href="/snippets" showTitle={true} />

          {/* Desktop Search and Filters */}
          <div className="hidden lg:flex flex-1 max-w-2xl mx-4 items-center gap-3">
            <HeaderSearch
              value={searchQuery}
              onChange={(value) => updateFilters("search", value)}
              className="flex-1"
            />

            <HeaderFilters
              selectedLanguage={selectedLanguage}
              selectedTag={selectedTag}
              availableTags={availableTags}
              onLanguageChange={(language) => updateFilters("language", language)}
              onTagChange={(tag) => updateFilters("tag", tag)}
            />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <HeaderActions />

            {/* Mobile Menu Toggle */}
            <button
              className="sm:hidden p-2 text-gray-400 hover:text-gray-600 rounded-lg transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <MobileMenu
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
          searchQuery={searchQuery}
          selectedLanguage={selectedLanguage}
          selectedTag={selectedTag}
          availableTags={availableTags}
          hasActiveFilters={activeFilters}
          onSearchChange={(value) => updateFilters("search", value)}
          onLanguageChange={(language) => updateFilters("language", language)}
          onTagChange={(tag) => updateFilters("tag", tag)}
          onClearAllFilters={handleClearAllFilters}
        />
      </div>
    </header>
  );
}