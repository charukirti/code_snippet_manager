"use client";
import { ChevronDown } from "lucide-react";
import { ReactNode, useEffect, useRef, useState } from "react";

interface DropdownProps {
  trigger: ReactNode;
  children: ReactNode;
  className?: string;
}

interface DropdownItemProps {
  children: ReactNode;
  onClick?: () => void;
  icon?: ReactNode;
  className?: string;
}

interface FilterButtonProps {
  children: ReactNode;
  isActive?: boolean;
  icon?: ReactNode;
}

export function Dropdown({ trigger, children, className }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <div onClick={() => setIsOpen(!isOpen)}>{trigger}</div>
      {isOpen && (
        <div className="absolute top-full mt-1 right-0 w-48 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg shadow-lg dark:shadow-slate-900/20 z-50">
          <div className="p-1">{children}</div>
        </div>
      )}
    </div>
  );
}

/* --------------------- Dropdown item component ------------------- */
export function DropdownItem({
  children,
  onClick,
  icon,
  className = "",
}: DropdownItemProps) {
  return (
    <button
      className={`flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-700 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-700 focus:bg-gray-100 dark:focus:bg-slate-700 rounded-md transition-colors outline-none focus:ring-2 focus:ring-blue-500/20 ${className}`}
      onClick={onClick}
    >
      {icon}
      {children}
    </button>
  );
}

/* ------------------ Filter button dropdown --------------------- */
export function FilterButton({
  children,
  isActive = false,
  icon,
}: FilterButtonProps) {
  return (
    <button
      className={`inline-flex items-center gap-2 px-3 py-2 text-sm border rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${
        isActive
          ? "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700/50 text-blue-700 dark:text-blue-300"
          : "bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-600 text-gray-700 dark:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-700"
      }`}
    >
      {icon}
      {children}
      <ChevronDown className="w-4 h-4" />
    </button>
  );
}