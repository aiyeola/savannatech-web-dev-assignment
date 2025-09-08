import {
  useMutation,
  useQueryClient,
  useQuery,
  keepPreviousData,
} from "@tanstack/react-query";
import { request } from "@/api/config";
import { User, Post, CreatePostData, PaginatedResponse, ApiResponse } from "@/types";

export const useGetUsers = (pageNumber: number, pageSize: number) => {
  return useQuery<PaginatedResponse<User>>({
    queryKey: ["get_users", pageNumber, pageSize],
    queryFn: ({ signal }) =>
      request
        .get(`/users`, { signal, params: { pageNumber, pageSize } })
        .then((res) => res.data)
        .catch((error) => {
          throw error.response.data;
        }),
    placeholderData: keepPreviousData,
  });
};

export const useGetUserbyId = (userId: string) => {
  return useQuery<User>({
    queryKey: ["get_user_by_id", userId],
    queryFn: ({ signal }) =>
      request
        .get(`/users/${userId}`, { signal })
        .then((res) => res.data)
        .catch((error) => {
          throw error.response.data;
        }),
    enabled: Boolean(userId),
  });
};

export const useGetPostByUserId = (userId: string) => {
  return useQuery<Post[]>({
    queryKey: ["get_posts_by_user", userId],
    queryFn: ({ signal }) =>
      request
        .get(`/posts`, { signal, params: { userId } })
        .then((res) => res.data)
        .catch((error) => {
          throw error.response.data;
        }),
    enabled: Boolean(userId),
  });
};

export const useCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse, Error, CreatePostData>({
    mutationFn: (values: CreatePostData) =>
      request
        .post(`/posts`, values)
        .then((res) => res.data)
        .catch((error) => {
          throw error.response.data;
        }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["get_posts_by_user", variables?.userId],
      });
    },
  });
};

export const useDeletePost = (userId: string) => {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse, Error, string>({
    mutationFn: (postId: string) =>
      request
        .delete(`/posts/${postId}`)
        .then((res) => res.data)
        .catch((error) => {
          throw error.response.data;
        }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["get_posts_by_user", userId],
      });
    },
  });
};
