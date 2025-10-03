// src/app/providers.tsx
"use client";

import { SWRConfig } from "swr";
import api from "@/lib/axios";

const axiosFetcher = (url: string) => api.get(url).then((res) => res.data);

export function SWRProvider({ children }: { children: React.ReactNode }) {
  return (
    <SWRConfig
      value={{
        fetcher: axiosFetcher,
        revalidateOnFocus: true,
        dedupingInterval: 10000,
      }}
    >
      {children}
    </SWRConfig>
  );
}
