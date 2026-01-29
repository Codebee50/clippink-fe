/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";
import Cookies from "js-cookie";

type PatchRequestProps = {
  url: string;
  onSuccess?: (response: AxiosResponse) => void;
  onError?: (error: AxiosError) => void;
  authorize?: boolean;
  contentType?: string;
};

const usePatchRequest = ({
  url,
  onSuccess = () => {},
  onError = () => {},
  authorize = true,
  contentType = "application/json",
}: PatchRequestProps) => {
  const mutation = useMutation({
    mutationFn: async (data: unknown) => {
      const accessToken = Cookies.get("userToken");

      const headers: Record<string, string> = {
        "Content-Type": contentType,
      };

      if (accessToken && authorize) {
        headers["Authorization"] = `Bearer ${accessToken}`;
      }

      return await axios.patch(url, data, { headers, withCredentials:true });
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

export default usePatchRequest;
