import type { CategorySchemaType } from "@/components/categories/CategoriyForm";

export const getCategories = async (search: string) => {
    const res = await fetch(`http://localhost:3000/api/v1/categories?search=${search}`);
    const data = await res.json();

    return data;
}

export const createCategory = async (request: CategorySchemaType) => {
    const res = await fetch(`http://localhost:3000/api/v1/categories`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(request)
    });

    const data = await res.json();

    return data;
}

export const updateCategory = async (payload:{id: number, request: CategorySchemaType}) => {
    const data = await fetch(`http://localhost:3000/api/v1/categories/${payload.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload.request)
    }).then(res => res.json());

    return data;
}

export const deleteCategory = async (id: number) => {
    const data = await fetch(`http://localhost:3000/api/v1/categories/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res => res.json());

    return data;
}