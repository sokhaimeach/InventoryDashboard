import { createProduct, deleteProduct, fetchProduct, updateProduct } from "@/services/product.service"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

export const useProduct = (search?: string, page?: number, limit?: number) => {
    return useQuery({
        queryKey: ['products', search, page, limit], 
        queryFn: () => fetchProduct(search || "", page, limit)
    })
}

export const useCreateProduct = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createProduct,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["products"]})
        }
    });
}

export const useUpdateProduct = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateProduct,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["products"]})
        }
    });
}

export const useDeleteProduct = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteProduct,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["products"]})
        }
    });
}