import { Input } from "@/components/ui/input";
import { DataTable } from "../components/data-table";
import { columns, type ProductType } from "@/components/products/columns";
import { Spinner } from "@/components/ui/spinner";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import ProductForm from "@/components/products/ProductForm";
import { useDeleteProduct, useProduct } from "@/hooks/useProduct";
import { ConfirmDelete } from "@/components/ConfirmDelete";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Field, FieldLabel } from "@/components/ui/field";

const Product = () => {
    const [searchInput, setSearchInput] = useState("");
    const [search, setSearch] = useState("");
    // set pagination
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(2);
    // Queries
    const { data: products, isLoading } = useProduct(search, page, limit);
    // paginations 
    const pagination = products?.pagination;
    const pages = Array.from({
        length: pagination?.totalPages <= 3? pagination?.totalPages : 3
    }, (_, i) => i + 1);
    // Edit variable
    const [editProduct, setEditProduct] = useState<ProductType>({} as ProductType);
    const [isEdit, setIsEdit] = useState<boolean>(false);

    // Delete variables
    const { mutate: deleteProductMutate } = useDeleteProduct();
    const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");
    const [deleteId, setDeleteId] = useState<number>(0);

    const [open, setOpen] = useState<boolean>(false);

    const handleSearch = () => {

        setSearch(searchInput);
    }

    const handleCreate = () => {
        setIsEdit(false);
        setEditProduct({} as ProductType);
        setOpen(true);
    }

    const handleEdit = (product: ProductType) => {
        setIsEdit(true);
        setEditProduct(product);
        setOpen(true);
    }

    const handleDelete = (product: ProductType) => {
        setDeleteId(product.product_id);
        setMessage(`Are you sure you want to delete ${product.name}?`);
        setIsDeleteOpen(true);
    }

    const onDelete = () => {
        deleteProductMutate(deleteId, {
            onSuccess: () => {
                setIsDeleteOpen(false);
            },
            onError: () => {
                console.error("Error delete product");
                setIsDeleteOpen(false);
            }
        });
    }

    // handle paginations
    const handleLimitChange = (limit: number) => {
        setLimit(limit);
        setPage(1);
    }

    // const handlePaginationEllipsis = () => {
    //     if (!pagination || !pages || (pages[-1] >= pagination?.totalPages)) {
    //         return;
    //     }

    //     pages.pop();
    // }

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
                <Button onClick={handleCreate}>Create Product</Button>
            </div>

            <ProductForm open={open} setOpen={setOpen} product={editProduct} isEdit={isEdit} />
            <DataTable columns={columns({ onEdit: handleEdit, onDelete: handleDelete })} data={products.data || []} />
            <ConfirmDelete isOpen={isDeleteOpen} setIsOpen={setIsDeleteOpen} message={message} deleteFn={onDelete} />

            <div className="flex justify-between mt-2">
                <Field className="w-full max-w-60 flex flex-row items-center">
                    <FieldLabel>Rows per page</FieldLabel>
                    <Select defaultValue="5" onValueChange={(value) => handleLimitChange(Number(value))}>
                        <SelectTrigger>
                            <SelectValue placeholder="page number" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="5">5</SelectItem>
                                <SelectItem value="10">10</SelectItem>
                                <SelectItem value="25">25</SelectItem>
                                <SelectItem value="50">50</SelectItem>
                                <SelectItem value="100">100</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </Field>

                <Pagination className="flex justify-end">
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious onClick={() => setPage(pagination?.prevPage)} />
                        </PaginationItem>
                        {pages?.map((p) => (
                            <PaginationItem key={p}>
                                <PaginationLink 
                                isActive={p === pagination?.currentPage}
                                onClick={() => setPage(p)}
                                >{p}</PaginationLink>
                            </PaginationItem>
                        ))}

                        <PaginationItem>
                            <PaginationEllipsis/>
                        </PaginationItem>
                        
                        <PaginationItem>
                            <PaginationNext onClick={() => setPage(pagination?.nextPage)} />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        </div>
    )
}

export default Product;