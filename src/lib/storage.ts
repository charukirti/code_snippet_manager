import { Snippet, SnippetFormData } from "@/types";

const STORAGE_KEY = "code-snippets";

export const snippetStorage = {
  getAll(): Snippet[] {
    if (typeof window === "undefined") return [];

    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) return [];

      const snippets = JSON.parse(data);
      // Convert date strings back to Date objects
      return snippets.map((snippet: any) => ({
        ...snippet,
        createdAt: new Date(snippet.createdAt),
        updatedAt: new Date(snippet.updatedAt),
      }));
    } catch (error) {
      console.error("Error loading snippets:", error);
      return [];
    }
  },

  save(snippets: Snippet[]): void {
    if (typeof window === "undefined") return;

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(snippets));
    } catch (error) {
      console.error("Error saving snippets:", error);
    }
  },

  add(formData: SnippetFormData): Snippet {
    const newSnippet: Snippet = {
      id: Date.now().toString(36) + Math.random().toString(36).substr(2),
      title: formData.title,
      description: formData.description,
      language: formData.language,
      code: formData.code,
      tag: formData.tag,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const snippets = this.getAll();
    snippets.unshift(newSnippet);
    this.save(snippets);
    return newSnippet;
  },
  update(
    id: string,
    updates: Partial<Omit<Snippet, "id" | "createdAt">>
  ): Snippet | null {
    const snippets = this.getAll();
    const index = snippets.findIndex((s) => s.id === id);

    if (index === -1) return null;

    const updatedSnippet = {
      ...snippets[index],
      ...updates,
      updatedAt: new Date(),
    };

    snippets[index] = updatedSnippet;
    this.save(snippets);
    return updatedSnippet;
  },

  delete(id: string): boolean {
    const snippets = this.getAll();
    const filteredSnippets = snippets.filter((s) => s.id !== id);

    if (filteredSnippets.length === snippets.length) return false;

    this.save(filteredSnippets);
    return true;
  },

  findById(id: string): Snippet | null {
    const snippets = this.getAll();
    return snippets.find((s) => s.id === id) || null;
  },

  search(query: string, language?: string, tags?: string[]): Snippet[] {
    const snippets = this.getAll();
    const lowerQuery = query.toLowerCase();

    return snippets.filter((snippet) => {
      const matchesQuery =
        !query ||
        snippet.title.toLowerCase().includes(lowerQuery) ||
        snippet.code.toLowerCase().includes(lowerQuery) ||
        snippet.description?.toLowerCase().includes(lowerQuery);

      const matchesLanguage = !language || snippet.language === language;

      const matchesTags =
        !tags ||
        tags.length === 0 ||
        tags.some((tag) => snippet.tag.includes(tag));

      return matchesQuery && matchesLanguage && matchesTags;
    });
  },
};
