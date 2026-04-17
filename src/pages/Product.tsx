import { Input } from "@/components/ui/input";
import { DataTable } from "../components/data-table";
import { columns } from "@/components/products/columns";
import { Spinner } from "@/components/ui/spinner";
import { fetchProduct } from "@/services/product.service";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import ProductForm from "@/components/products/ProductForm";

const Product = () => {
    const [searchInput, setSearchInput] = useState("");
    const [search, setSearch] = useState("");
    // Queries
    const {data, isLoading} = useQuery({ 
        queryKey: ['products', search], 
        queryFn: () => fetchProduct(searchInput) 
    });

    const [open, setOpen] = useState<boolean>(false);

    const handleSearch = () => {

        setSearch(searchInput);
    }

    if (isLoading) {
        return (
            <div className="flex justify-center gap-6">
                <Spinner className="size-8" />
            </div>
        )
    }

  return (
    <div>
        <div className="flex justify-between mt-4 mb-3 w-full">
            <div className="flex gap-2 w-[50%]">
                <Input 
                placeholder="Search product by name or category"
                onChange={(e) => setSearchInput(e.target.value)} 
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        handleSearch();
                    }
                }} />
                <Button onClick={handleSearch}>Search</Button>
            </div>
            <Button onClick={() => setOpen(true)}>Create Product</Button>
        </div>

        <ProductForm open={open} setOpen={setOpen} />
        <DataTable columns={columns} data={data.data || []} />
    </div>
  )
}

export default Product;