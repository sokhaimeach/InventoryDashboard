import { createProduct } from "@/services/product.service"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useCreateProduct = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createProduct,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["products"]})
        }
    });
}