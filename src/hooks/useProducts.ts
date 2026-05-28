import { useQuery } from "@tanstack/react-query";
import { fetchProductByHandle, fetchProducts } from "@/lib/shopify";

export function useProducts() {
  return useQuery({ queryKey: ["products"], queryFn: () => fetchProducts(20), staleTime: 60_000 });
}

export function useProduct(handle: string) {
  return useQuery({
    queryKey: ["product", handle],
    queryFn: () => fetchProductByHandle(handle),
    staleTime: 60_000,
    enabled: !!handle,
  });
}
