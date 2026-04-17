import type { ProductSchemaType } from "@/components/products/ProductForm";


export const fetchProduct = async (search: string, page: number = 1, limit: number = 10) => {
    const res = await fetch(`http://localhost:3000/api/v1/products?search=${search}&page=${page}&limit=${limit}`);
    const data = await res.json();

    return data;
}

export const createProduct = async (request: ProductSchemaType) => {
    const res = await fetch(`http://localhost:3000/api/v1/products`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(request)
    });

    const data = await res.json();

    return data;
}

export const updateProduct = async (payload: {id: number, request: ProductSchemaType}) => {
    const data = await fetch(`http://localhost:3000/api/v1/products/${payload.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload.request)
    }).then(res => res.json());

    return data;
}

export const deleteProduct = async (id: number) => {
    const data = await fetch(`http://localhost:3000/api/v1/products/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res => res.json());

    return data;
}