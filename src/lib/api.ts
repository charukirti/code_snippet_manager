const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export interface Snippet {
  _id?: string;
  title: string;
  description: string;
  language: string;
  tag: string;
  code: string;
  userId: string;
  isFavourite?: boolean;
  favouritedAt?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface PaginationMeta {
  total: number;
  count: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  pagination?: PaginationMeta;
}

export interface QueryParams {
  page?: number;
  limit?: number;
  search?: string;
  language?: string;
  tag?: string;
  sortBy?: "createdAt" | "updatedAt" | "title" | "language";
  order?: "asc" | "desc";
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
        "An error occurred";
      });

      throw new Error(
        error.message || `HTTP error! status: ${response.status}`
      );
    }

    return response.json();
  }

  private buildQueryString(params: QueryParams): string {
    const searchParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        searchParams.append(key, String(value));
      }
    });

    const queryString = searchParams.toString();
    return queryString ? `?${queryString}` : "";
  }

  async getAllSnippets(
    token: string | null,
    params?: QueryParams
  ): Promise<ApiResponse<Snippet[]>> {
    const queryString = params ? this.buildQueryString(params) : "";
    return this.request<Snippet[]>(`/api/snippets/${queryString}`, token);
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

  async toggleFavourite(
    token: string | null,
    id: string
  ): Promise<ApiResponse<Snippet>> {
    return this.request<Snippet>(`/api/snippets/${id}/favourite`, token, {
      method: "PATCH",
    });
  }

  async getFavourites(
    token: string | null,
    params?: QueryParams
  ): Promise<ApiResponse<Snippet[]>> {
    const queryString = params ? this.buildQueryString(params) : "";
    return this.request<Snippet[]>(
      `/api/snippets/favourites${queryString}`,
      token
    );
  }

  async exportSnippets(
    token: string | null,
    snippetIds: string[],
    format: string = "json"
  ): Promise<Blob> {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    };

    const response = await fetch(
      `${this.baseURL}/api/snippets/export?format=${format}`,
      {
        method: "POST",
        headers,
        body: JSON.stringify({ snippetIds }),
      }
    );

    if (!response.ok) {
      throw new Error(`Export failed: ${response.statusText}`);
    }

    return response.blob();
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
