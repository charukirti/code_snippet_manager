'use client'

import { useState, useCallback } from "react";
import { SnippetFormData } from "@/types";

export function useFormValidation() {
  const [errors, setErrors] = useState<Partial<SnippetFormData>>({});

  const validateForm = useCallback((data: SnippetFormData): boolean => {
    const newErrors: Partial<SnippetFormData> = {};

    if (!data.title.trim()) newErrors.title = "Title is required";
    if (!data?.description?.trim()) newErrors.description = "Description is required";
    if (!data.language.trim()) newErrors.language = "Language selection is required";
    if (!data.tag.trim()) newErrors.tag = "Tags are required";
    if (!data.code.trim()) newErrors.code = "Code snippet is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, []);

  const clearFieldError = useCallback((field: keyof SnippetFormData) => {
    setErrors(prev => ({ ...prev, [field]: undefined }));
  }, []);

  const clearAllErrors = useCallback(() => {
    setErrors({});
  }, []);

  return { errors, validateForm, clearFieldError, clearAllErrors };
}