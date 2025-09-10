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
      <legend className="text-sm font-semibold text-gray-700">{label}</legend>
      {children}
      {hint && !error && <p className="text-xs text-gray-500">{hint}</p>}
      {error && <p className="text-xs text-red-600">{error}</p>}
    </fieldset>
  );
}
