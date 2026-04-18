import type { ProductType } from "@/components/products/columns";
import type { ProductSchemaType } from "@/components/products/ProductForm";
import api from "@/lib/axios";

interface ProductResponse {
    data: ProductType[];
    pagination: {
        currentPage: number;
        limit: number;
        nextPage: number;
        prevPage: number;
        total: number;
        totalPages: number;
    }
}

export const fetchProduct = async (search: string, page: number = 1, limit: number = 10) => {
    return await api.get<ProductResponse, ProductResponse>(`/products`, { params: { search, page, limit } });
}

export const createProduct = async (request: ProductSchemaType) => {
    return await api.post(`/products`, request);
}

export const updateProduct = async (payload: {id: number, request: ProductSchemaType}) => {
    return await api.put(`/products/${payload.id}`, payload.request);
}

export const deleteProduct = async (id: number) => {
    return await api.delete(`/products/${id}`);
}

export const uploadProductImage = async (payload: {id: number, file: File}) => {
    const formData = new FormData();
    formData.append("image", payload.file);

    return await api.post(`/products/${payload.id}/upload`, formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
}