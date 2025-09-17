export interface Snippet {
  id: string;
  title: string;
  code: string;
  language: string;
  userId: string;
  tag: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface SnippetFormData {
  title: string;
  code: string;
  language: string;
  tag: string;
  description?: string;
  userId?: string;
}

export type Language =
  | "javascript"
  | "typescript"
  | "jsx"
  | "tsx"
  | "python"
  | "java"
  | "cpp"
  | "css"
  | "html"
  | "json"
  | "markdown"
  | "sql"
  | "bash"
  | "yaml"
  | "other";

export const LANGUAGES: { value: Language; label: string }[] = [
  { value: "javascript", label: "JavaScript" },
  { value: "typescript", label: "TypeScript" },
  { value: "jsx", label: "JSX" },
  { value: "tsx", label: "TSX" },
  { value: "python", label: "Python" },
  { value: "java", label: "Java" },
  { value: "cpp", label: "C++" },
  { value: "css", label: "CSS" },
  { value: "html", label: "HTML" },
  { value: "json", label: "JSON" },
  { value: "markdown", label: "Markdown" },
  { value: "sql", label: "SQL" },
  { value: "bash", label: "Bash" },
  { value: "yaml", label: "YAML" },
  { value: "other", label: "Other" },
];
