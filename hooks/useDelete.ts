import baseApiClient from "@/lib/axios/api";
import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";

type DeleteRequestProps = {
  url: string;
  onSuccess?: (response: AxiosResponse) => void;
  onError?: (error: AxiosError) => void;
};

const useDeleteRequest = ({
  url,
  onSuccess = () => {},
  onError = () => {},
}: DeleteRequestProps) => {
  const mutation = useMutation({
    mutationFn: async () => {
      return await baseApiClient.delete(url);
    },
    onSuccess,
    onError,
  });

  const { mutate, isPending: isLoading, isSuccess, isError } = mutation;
  return {
    mutate,
    isLoading,
    isSuccess,
    isError,
  };
};

export default useDeleteRequest;