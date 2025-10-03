import { Snippet } from "@/lib/api";
import { Language } from "@/types";
import toast from "react-hot-toast";

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

export const handleDownload = (snippet: Snippet) => {
  try {
    const getFileExtension = (language: string) => {
      const extensions: { [key: string]: string } = {
        javascript: "js",
        typescript: "ts",
        python: "py",
        java: "java",
        cpp: "cpp",
        c: "c",
        html: "html",
        css: "css",
        sql: "sql",
        json: "json",
        xml: "xml",
        php: "php",
        ruby: "rb",
        go: "go",
        rust: "rs",
        kotlin: "kt",
        swift: "swift",
      };
      return extensions[language.toLowerCase()] || "txt";
    };

    const fileExtension = getFileExtension(snippet.language);
    const commentChar = [
      "js",
      "ts",
      "java",
      "cpp",
      "c",
      "css",
      "php",
      "go",
      "rust",
      "kt",
      "swift",
    ].includes(fileExtension)
      ? "//"
      : "#";

    const fileContent = `${commentChar} ${snippet.title}
${snippet.description ? `${commentChar} ${snippet.description}` : ""}
${commentChar} Language: ${snippet.language}
${commentChar} Tag: ${snippet.tag}
${commentChar} Created: ${formatDate(new Date(snippet.createdAt!))}

${snippet.code}`;

    const blob = new Blob([fileContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${snippet.title
      .replace(/[^a-z0-9]/gi, "_")
      .toLowerCase()}.${fileExtension}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast.success(`${snippet.title} downloaded successfully!`, {
      duration: 3000,
      icon: "📥",
    });
  } catch (error) {
    toast.error("Failed to download snippet. Please try again.", {
      duration: 4000,
      icon: "❌",
    });
    console.error("Download error:", error);
  }
};
