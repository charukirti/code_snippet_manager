import { apiClient, Snippet } from "@/lib/api";
import { SNIPPETS_QUERY_KEY } from "@/types";
import { useAuth } from "@clerk/nextjs";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

// fetch all snippets
export function useSnippets() {
  const { getToken } = useAuth();
  return useQuery({
    queryKey: SNIPPETS_QUERY_KEY,
    queryFn: async () => {
      const token = await getToken();
      const response = await apiClient.getAllSnippets(token);
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
      toast.success(response.message || "Snippet deleted successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to delete snippet");
    },
  });
}
