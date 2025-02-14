import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import filesService from "../../services/files.service";
import { API_CONFIG } from "../../constants/api.constant";

export const useGetFileByName = (name: string) => {
  return useQuery({
    queryKey: ["file", name],
    queryFn: () => filesService.getFileByName(name),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useGetAllFiles = () => {
  const { data } = useQuery({
    queryKey: ["files"],
    queryFn: filesService.getAllFiles,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
  return data;
};

export const useUploadFile = () => {
  const queryClient = useQueryClient();
  const { isPending, isSuccess, mutate, isError } = useMutation({
    mutationKey: ["uploadFile"],
    mutationFn: (data: File) => filesService.uploadFile(data),
    onError: (error: any) => {
      console.error(
        "Upload error:",
        error.response?.data?.error || error.message
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [API_CONFIG.FILES] });
    },
  });
  return { isPending, isSuccess, mutate, isError };
};
