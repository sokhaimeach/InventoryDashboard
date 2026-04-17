import CategoryForm from "@/components/categories/CategoriyForm";
import { columns, type CategoryType } from "@/components/categories/columns";
import { ConfirmDelete } from "@/components/ConfirmDelete";
import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { useCategories, useDeleteCategory } from "@/hooks/useCategoryQuery";
import { useState } from "react";

const Category = () => {
    // Search
    const [searchInput, setSearchInput] = useState("");
    const [search, setSearch] = useState("");
    // Query data
    const {data: categories, isLoading} = useCategories(search);
    const [editCategory, setEditCategory] = useState<CategoryType>({} as CategoryType);

    const { mutate: deleteCategoryMutate } = useDeleteCategory();
    const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");
    const [deleteId, setDeleteId] = useState<number>(0);

    const [open, setOpen] = useState<boolean>(false);
    const [isEdit, setIsEdit] = useState<boolean>(false);

    const handleSearch = () => {
        setSearch(searchInput);
    }

    const handleCreate = () => {
        setIsEdit(false);
        setEditCategory({} as CategoryType);
        setOpen(true);
    }

    const handleEdit = (category: CategoryType) => {
        setIsEdit(true);
        setEditCategory(category);
        setOpen(true);
    }

    const handleDelete = (category: CategoryType) => {
        setDeleteId(category.category_id);
        setMessage(`Are you sure you want to delete ${category.name}?`);
        setIsDeleteOpen(true);
    }

    const onDelete = () => {
        deleteCategoryMutate(deleteId, {
            onSuccess: () => {
                setIsDeleteOpen(false);
            },
            onError: () => {
                console.error("Error delete category");
                setIsDeleteOpen(false);
            }
        });
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
                    }}/>
                    <Button onClick={handleSearch}>Search</Button>
                </div>
                <Button onClick={handleCreate}>Create Category</Button>
            </div>
            
            <CategoryForm open={open} setOpen={setOpen} category={editCategory} isEdit={isEdit} />
            <DataTable columns={columns({ onEdit: handleEdit, onDelete: handleDelete})} data={categories.data || []} />
            <ConfirmDelete isOpen={isDeleteOpen} setIsOpen={setIsDeleteOpen} message={message} deleteFn={onDelete} />
        </div>
    )
}

export default Category;
