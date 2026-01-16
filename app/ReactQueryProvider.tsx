"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import PropTypes from "prop-types";
import type { PropsWithChildren } from "react";

const queryClient = new QueryClient();

export const ReactQueryProvider = ({ children }: PropsWithChildren) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

ReactQueryProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
