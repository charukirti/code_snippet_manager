"use client";

import { Dropdown, DropdownItem, FilterButton } from "@/components/ui/Dropdown";
import { Filter } from "lucide-react";
import { LANGUAGES } from "@/types";

interface HeaderFiltersProps {
  selectedLanguage: string;
  selectedTag: string;
  availableTags: string[];
  onLanguageChange: (language: string) => void;
  onTagChange: (tag: string) => void;
}

export default function HeaderFilters({
  selectedLanguage,
  selectedTag,
  availableTags,
  onLanguageChange,
  onTagChange,
}: HeaderFiltersProps) {
  return (
    <>
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
        <DropdownItem onClick={() => onLanguageChange("")}>
          All Languages
        </DropdownItem>
        {LANGUAGES.map((lang) => (
          <DropdownItem
            className={
              selectedLanguage === lang.value ? "bg-blue-700 text-blue-100" : ""
            }
            onClick={() => onLanguageChange(lang.value)}
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
            {selectedTag || "All Tags"}
          </FilterButton>
        }
      >
        <DropdownItem onClick={() => onTagChange("")}>All Tags</DropdownItem>
        {availableTags.map((tag) => (
          <DropdownItem
            key={tag}
            onClick={() => onTagChange(tag)}
            className={selectedTag === tag ? "bg-green-100 text-green-700" : ""}
          >
            {tag}
          </DropdownItem>
        ))}
      </Dropdown>
    </>
  );
}
