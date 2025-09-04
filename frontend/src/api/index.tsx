import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { request } from "@/api/config";

export const useGetUsers = (pageNumber: number, pageSize: number) => {
  return useQuery({
    queryKey: ["get_users", pageNumber, pageSize],
    queryFn: ({ signal }) =>
      request
        .get(`/users`, { signal, params: { pageNumber, pageSize } })
        .then((res) => res.data)
        .catch((error) => {
          throw error.response.data;
        }),
  });
};

export const useGetUserbyId = (userId: string) => {
  return useQuery({
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
  return useQuery({
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

interface CreatePost {
  userId: string;
  title: string;
  body: string;
}

export const useCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (values: CreatePost) =>
      request
        .post(`/posts`, values)
        .then((res) => res.data)
        .catch((error) => {
          throw error.response.data;
        }),
    onSuccess: (variables) => {
      queryClient.invalidateQueries({
        queryKey: ["get_posts_by_user", variables?.userId],
      });
    },
  });
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (postId: string) =>
      request
        .delete(`/posts/${postId}`)
        .then((res) => res.data)
        .catch((error) => {
          throw error.response.data;
        }),
    onSuccess: ({ variables }) => {
      queryClient.invalidateQueries({
        queryKey: ["get_posts_by_user", variables.userId],
      });
    },
  });
};
