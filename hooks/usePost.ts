/* eslint-disable react-hooks/rules-of-hooks */
import baseApiClient from "@/lib/axios/api";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";
import Cookies from "js-cookie";

type PostRequestProps = {
  url: string;
  onSuccess?: (response: AxiosResponse) => void;
  onError?: (error: AxiosError) => void;
  authorize?: boolean;
  contentType?: string;
};

const usePostRequest = ({
  url,
  onSuccess = () => { },
  onError = () => { },
  contentType = "application/json",
}: PostRequestProps) => {
  const mutation = useMutation({
    mutationFn: async (data: unknown) => {
      const headers: Record<string, string> = {
        "Content-Type": contentType,
      };
      return await baseApiClient.post(url, data, { headers });
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

export default usePostRequest;
