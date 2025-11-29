import { apiClient, QueryParams, Snippet } from "@/lib/api";
import { FAVOURITES_QUERY_KEY, SNIPPETS_QUERY_KEY } from "@/types";
import { useAuth } from "@clerk/nextjs";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

// fetch all snippets
export function useSnippets(params?: QueryParams) {
  const { getToken } = useAuth();
  return useQuery({
    queryKey: [...SNIPPETS_QUERY_KEY, params],
    queryFn: async () => {
      const token = await getToken();
      const response = await apiClient.getAllSnippets(token, params);
      return response.data;
    },
  });
}

// fetch snippet by id

export function useSnippet(id: string) {
  const { getToken } = useAuth();

  return useQuery({
    queryKey: [SNIPPETS_QUERY_KEY, id],
    queryFn: async () => {
      const token = await getToken();
      const response = await apiClient.getSnippetById(token, id);
      return response.data;
    },
    enabled: !!id,
  });
}

// create snippet

export function useCreateSnippet() {
  const queryClient = useQueryClient();
  const { getToken } = useAuth();

  return useMutation({
    mutationFn: async (
      data: Omit<Snippet, "_id" | "userId" | "createdAt" | "updatedAt">
    ) => {
      const token = await getToken();
      return apiClient.createSnippet(token, data);
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: SNIPPETS_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: FAVOURITES_QUERY_KEY });
      toast.success(response.message || "Snippet created successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to create snippet");
    },
  });
}

// Update snippet
export function useUpdateSnippet() {
  const queryClient = useQueryClient();
  const { getToken } = useAuth();

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: Partial<Snippet>;
    }) => {
      const token = await getToken();
      return apiClient.updateSnippet(token, id, data);
    },
    onSuccess: (response, variables) => {
      queryClient.invalidateQueries({ queryKey: SNIPPETS_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: FAVOURITES_QUERY_KEY });
      queryClient.invalidateQueries({
        queryKey: [...SNIPPETS_QUERY_KEY, variables.id],
      });
      toast.success(response.message || "Snippet updated successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update snippet");
    },
  });
}

// Toggle favourites

export function useToggleFavorite() {
  const queryClient = useQueryClient();
  const { getToken } = useAuth();

  return useMutation({
    mutationFn: async (id: string) => {
      const token = await getToken();
      return apiClient.toggleFavourite(token, id);
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: SNIPPETS_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: FAVOURITES_QUERY_KEY }),
        toast.success(response.message || "Favorite status updated");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update favorite");
    },
  });
}

// Get favorites
export function useFavourites(params?: QueryParams) {
  const { getToken } = useAuth();

  return useQuery({
    queryKey: [...FAVOURITES_QUERY_KEY, params],
    queryFn: async () => {
      const token = await getToken();
      const response = await apiClient.getFavourites(token, params);
      return response;
    },
  });
}

// Export snippets
export function useExportSnippets() {
  const { getToken } = useAuth();

  return useMutation({
    mutationFn: async ({
      snippetIds,
      format = "json",
    }: {
      snippetIds: string[];
      format?: string;
    }) => {
      const token = await getToken();
      const blob = await apiClient.exportSnippets(token, snippetIds, format);

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `snippets-export-${
        new Date().toISOString().split("T")[0]
      }.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    },
    onSuccess: () => {
      toast.success("Snippets exported successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to export snippets");
    },
  });
}

// Delete snippet
export function useDeleteSnippet() {
  const queryClient = useQueryClient();
  const { getToken } = useAuth();

  return useMutation({
    mutationFn: async (id: string) => {
      const token = await getToken();
      return apiClient.deleteSnippet(token, id);
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: SNIPPETS_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: FAVOURITES_QUERY_KEY });
      toast.success(response.message || "Snippet deleted successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to delete snippet");
    },
  });
}
