export interface Snippet {
  id: string;
  title: string;
  code: string;
  language: string;
  tags: string[];
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface SnippetFormData {
  title: string;
  code: string;
  language: string;
  tags: string;
  description?: string;
}

export type Language = 
  | 'javascript' 
  | 'typescript' 
  | 'python' 
  | 'java' 
  | 'cpp' 
  | 'css' 
  | 'html' 
  | 'json' 
  | 'markdown' 
  | 'sql'
  | 'bash'
  | 'yaml'
  | 'other';

export const LANGUAGES: { value: Language; label: string }[] = [
  { value: 'javascript', label: 'JavaScript' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'python', label: 'Python' },
  { value: 'java', label: 'Java' },
  { value: 'cpp', label: 'C++' },
  { value: 'css', label: 'CSS' },
  { value: 'html', label: 'HTML' },
  { value: 'json', label: 'JSON' },
  { value: 'markdown', label: 'Markdown' },
  { value: 'sql', label: 'SQL' },
  { value: 'bash', label: 'Bash' },
  { value: 'yaml', label: 'YAML' },
  { value: 'other', label: 'Other' },
];