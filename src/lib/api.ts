

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export interface Snippet {
  _id?: string;
  title: string;
  description: string;
  language: string;
  tag: string;
  code: string;
  userId: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

class ApiClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private async request<T>(
    endpoint: string,
    token: string | null,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    };

    const response = await fetch(`${this.baseURL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => {
        message: "An error occurred";
      });

      throw new Error(
        error.message || `HTTP error! status: ${response.status}`
      );
    }

    return response.json();
  }

  async getAllSnippets(token: string | null): Promise<ApiResponse<Snippet[]>> {
    return this.request<Snippet[]>("/api/snippets", token);
  }

  async getSnippetById(
    token: string | null,
    id: string
  ): Promise<ApiResponse<Snippet>> {
    return this.request<Snippet>(`/api/snippets/${id}`, token);
  }

  async createSnippet(
    token: string | null,
    data: Omit<Snippet, "_id" | "userId" | "createdAt" | "updatedAt">
  ): Promise<ApiResponse<Snippet>> {
    return this.request<Snippet>("/api/snippets", token, {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async updateSnippet(
    token: string | null,
    id: string,
    data: Partial<Snippet>
  ): Promise<ApiResponse<Snippet>> {
    return this.request<Snippet>(`/api/snippets/${id}`, token, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  }

  async deleteSnippet(
    token: string | null,
    id: string
  ): Promise<ApiResponse<Snippet>> {
    return this.request<Snippet>(`/api/snippets/${id}`, token, {
      method: "DELETE",
    });
  }
}

export const apiClient = new ApiClient(API_URL);
