'use client'

import { SearchInput } from "@/components/ui/SearchInput";

interface HeaderSearchProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export default function HeaderSearch({value, onChange, className}:HeaderSearchProps) {
  return <SearchInput className={className} value={value} onChange={onChange}/>
}
