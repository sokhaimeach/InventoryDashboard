import type { ProductSchemaType } from "@/components/products/ProductForm";


export const fetchProduct = async (search: string) => {
    const res = await fetch(`http://localhost:3000/api/v1/products?search=${search}`);
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