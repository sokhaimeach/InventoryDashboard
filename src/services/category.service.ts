import type { CategorySchemaType } from "@/components/categories/CategoriyForm";
import api from "@/lib/axios";

export const getCategories = async (search: string) => {
    return await api.get(`/categories`, { params: { search } });
}

export const createCategory = async (request: CategorySchemaType) => {
    return await api.post(`/categories`, request);
}

export const updateCategory = async (payload:{id: number, request: CategorySchemaType}) => {
    return await api.put(`/categories/${payload.id}`, payload.request);
}

export const deleteCategory = async (id: number) => {
    return await api.delete(`/categories/${id}`);
}