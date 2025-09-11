"use client";

import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { SnippetFormData, LANGUAGES, Language } from "@/types";
import { FormEvent, useState } from "react";
import { Editor } from "@monaco-editor/react";
import { getMonacoLanguage } from "@/lib/utils";
import { FormHeader } from "@/components/forms/FormHeader";
import { FormField } from "@/components/ui/FormField";
import { useFormValidation } from "@/hooks/useFormValidation";
import { FormActions } from "@/components/forms/FormActions";

interface SnippetFormProps {
  initialData?: Partial<SnippetFormData>;
  onSubmit: (data: SnippetFormData) => void;
  isSubmitting?: boolean;
}

export default function SnippetForm({
  initialData,
  onSubmit,
  isSubmitting = false,
}: SnippetFormProps) {
  const [formData, setFormData] = useState({
    title: initialData?.title ?? "",
    description: initialData?.description ?? "",
    language: initialData?.language ?? "",
    tag: initialData?.tag ?? "",
    code: initialData?.code ?? "",
  });

  const { errors, validateForm, clearFieldError, clearAllErrors } =
    useFormValidation();

  const updateField = <K extends keyof SnippetFormData>(
    field: K,
    value: SnippetFormData[K]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    clearFieldError(field);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (validateForm(formData)) {
      const trimmedData = {
        ...formData,
        title: formData.title.trim(),
        description: formData.description.trim(),
        tag: formData.tag.trim(),
        code: formData.code.trim(),
      };
      onSubmit(trimmedData);
    }
  };

  const handleClear = () => {
    setFormData({
      title: "",
      description: "",
      language: "",
      tag: "",
      code: "",
    });
    clearAllErrors();
  };

  const getFieldClassName = (field: keyof SnippetFormData, baseClass: string) =>
    `${baseClass} ${
      errors[field]
        ? "border-red-500 dark:border-red-400 focus:border-red-500 dark:focus:border-red-400"
        : "border-gray-300 dark:border-slate-600 focus:border-blue-500 dark:focus:border-blue-400"
    }`;

  return (
    <main className="max-w-4xl mx-auto p-6 bg-white dark:bg-slate-800 rounded-lg shadow-sm dark:shadow-slate-900/20 border border-transparent dark:border-slate-700">
      <FormHeader
        title={initialData?.title ? "Edit Snippet" : "Create New Snippet"}
        description="Fill in the details below to save your code snippet"
      />

      <form onSubmit={handleSubmit} className="space-y-6">
        <FormField label="Title" error={errors.title} required>
          <Input
            type="text"
            className={getFieldClassName(
              "title",
              "w-full border rounded-lg p-3 transition-colors bg-white dark:bg-slate-900 text-gray-900 dark:text-slate-100 placeholder:text-gray-500 dark:placeholder:text-slate-400"
            )}
            value={formData.title}
            onChange={(e) => updateField("title", e.target.value)}
            placeholder="Enter a descriptive title for your snippet"
            required
          />
        </FormField>

        <FormField label="Description" error={errors.description} required>
          <Textarea
            rows={4}
            className={getFieldClassName(
              "description",
              "w-full border rounded-lg p-3 transition-colors resize-vertical bg-white dark:bg-slate-900 text-gray-900 dark:text-slate-100 placeholder:text-gray-500 dark:placeholder:text-slate-400"
            )}
            value={formData.description}
            onChange={(e) => updateField("description", e.target.value)}
            placeholder="Describe what this code snippet does and how to use it"
            required
          />
        </FormField>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            label="Tag"
            error={errors.tag}
            hint="Separate multiple tags with commas"
            required
          >
            <Input
              type="text"
              className={getFieldClassName(
                "tag",
                "w-full border rounded-lg p-3 transition-colors bg-white dark:bg-slate-900 text-gray-900 dark:text-slate-100 placeholder:text-gray-500 dark:placeholder:text-slate-400"
              )}
              value={formData.tag}
              onChange={(e) => updateField("tag", e.target.value)}
              placeholder="e.g., react, utility, hooks"
              required
            />
          </FormField>

          <FormField label="Language" error={errors.language} required>
            <select
              className={getFieldClassName(
                "language",
                "w-full border rounded-lg p-3 transition-colors bg-white dark:bg-slate-900 text-gray-900 dark:text-slate-100"
              )}
              onChange={(e) =>
                updateField("language", e.target.value as Language)
              }
              value={formData.language}
              required
            >
              <option value="" className="text-gray-500 dark:text-slate-400">
                Select Language
              </option>
              {LANGUAGES.map((lang) => (
                <option 
                  key={lang.label} 
                  value={lang.value}
                  className="text-gray-900 dark:text-slate-100"
                >
                  {lang.label}
                </option>
              ))}
            </select>
          </FormField>
        </section>

        <FormField
          label="Code Snippet"
          error={errors.code}
          hint="Paste your code snippet above. Syntax highlighting will adjust based on selected language."
          required
        >
          <section
            className={`border-2 rounded-lg overflow-hidden transition-colors ${
              errors.code 
                ? "border-red-500 dark:border-red-400" 
                : "border-gray-300 dark:border-slate-600"
            }`}
          >
            <Editor
              height="500px"
              language={getMonacoLanguage(formData.language as Language)}
              value={formData.code}
              onChange={(value) => updateField("code", value || "")}
              theme="vs-dark"
              options={{
                minimap: { enabled: false },
                fontSize: 15,
                lineNumbers: "on",
                automaticLayout: true,
                quickSuggestions: false,
                suggestOnTriggerCharacters: false,
                parameterHints: { enabled: false },
                hover: { enabled: false },
                renderValidationDecorations: "off",
                folding: true,
                autoClosingBrackets: "always",
                wordWrap: "on",
                formatOnType: true,
                contextmenu: false,
                scrollBeyondLastLine: false,
                padding: { top: 16, bottom: 16 },
              }}
            />
          </section>
        </FormField>

        <FormActions
          isSubmitting={isSubmitting}
          submitText={initialData?.title ? "Update Snippet" : "Save Snippet"}
          onClear={handleClear}
        />
      </form>
    </main>
  );
}