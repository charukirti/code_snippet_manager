import { ReactNode } from "react";

interface FormFieldProps {
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
  children: ReactNode;
}

export function FormField({
  label,
  children,
  required,
  error,
  hint,
}: FormFieldProps) {
  return (
    <fieldset className="space-y-2">
      <legend className="text-sm font-semibold text-gray-700 dark:text-slate-200">
        {label}
        {required && <span className="text-red-500 dark:text-red-400 ml-1">*</span>}
      </legend>
      {children}
      {hint && !error && (
        <p className="text-xs text-gray-500 dark:text-slate-400">{hint}</p>
      )}
      {error && (
        <p className="text-xs text-red-600 dark:text-red-400">{error}</p>
      )}
    </fieldset>
  );
}