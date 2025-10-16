"use client";
import useSWR from "swr";

export function useCategories() {
  const { data, error, isLoading, mutate } = useSWR("categories/");

  return {
    categories: data,
    isLoadingCategories: isLoading,
    isErrorCategories: error,
    mutateCategories: mutate,
  };
}
