import { AxiosError } from "axios";

export type ApiErrorResponse = {
  detail?: string | Array<{ msg?: string }>;
  message?: string;
  error?: string;
  errors?: Array<{ message?: string }>;
  [key: string]: unknown;
};


function isAxiosError<T>(
    error: unknown
  ): error is AxiosError<T> {
    return (
      typeof error === "object" &&
      error !== null &&
      "isAxiosError" in error
    );
  }
  

export function genericErrorHandler(
    error: unknown,
    fallback = "Something went wrong"
  ): string {
    // Axios error
    if (isAxiosError<ApiErrorResponse>(error)) {
      const data = error.response?.data;
  
      if (!data) return fallback;
  
      // FastAPI HTTPException: { detail: "msg" }
      if (typeof data.detail === "string") {
        return data.detail;
      }
  
      // FastAPI validation error: { detail: [{ msg: "msg" }] }
      if (Array.isArray(data.detail)) {
        return data.detail[0]?.msg ?? fallback;
      }
  
      // Common alternatives
      if (typeof data.message === "string") return data.message;
      if (typeof data.error === "string") return data.error;
  
      // Nested error arrays
      if (Array.isArray(data.errors)) {
        return data.errors[0]?.message ?? fallback;
      }
  
      return fallback;
    }
  
    // Native JS Error
    if (error instanceof Error) {
      return error.message;
    }
  
    // String thrown (yes, people do this)
    if (typeof error === "string") {
      return error;
    }
  
    return fallback;
  }
  