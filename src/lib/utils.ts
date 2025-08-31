import { Language } from "@/types";

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.split("\n").slice(0, maxLength).join("\n") + "\n...";
}

export function copyToClipboard(text: string): Promise<void> {
  return navigator.clipboard.writeText(text);
}


export function getMonacoLanguage(language: Language): string {
  const monacoLanguageMap: Record<Language, string> = {
    javascript: "javascript",
    typescript: "typescript",
    jsx: "javascript",
    tsx: "typescript",
    python: "python",
    java: "java",
    cpp: "cpp",
    css: "css",
    html: "html",
    json: "json",
    markdown: "markdown",
    sql: "sql",
    bash: "shell",
    yaml: "yaml",
    other: "plaintext",
  };

  return monacoLanguageMap[language] || "plaintext";
}
