import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import Cookies from "js-cookie";

type FetchRequestProps = {
  url: string;
  onSuccess?: (response: AxiosResponse) => void;
  onError?: (error: AxiosError) => void;
  responseType?: AxiosRequestConfig["responseType"];
  authorize?: boolean;
};

const useFetchRequest = ({
  url,
  onSuccess,
  onError,
  responseType = "json",
  authorize = true,
}: FetchRequestProps) => {
  const mutation = useMutation({
    mutationFn: async () => {
      const accessToken = Cookies.get("userToken");
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };
      if (accessToken && authorize) {
        headers["Authorization"] = `Bearer ${accessToken}`;
      }

      return await axios.get(url, { headers, responseType });
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

export default useFetchRequest;
