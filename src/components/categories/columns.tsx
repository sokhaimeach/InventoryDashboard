import type { ColumnDef } from "@tanstack/react-table";
import { Badge } from "../ui/badge";
import { format } from "date-fns";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export type CategoryType = {
    category_id: number,
    name: string,
    is_active: boolean,
    created_at: string
}

interface Props {
    onEdit: (category: CategoryType) => void;
    onDelete: (category: CategoryType) => void;
}

export const columns = ({onEdit, onDelete}: Props): ColumnDef<CategoryType>[] => [
    {
        accessorKey: "category_id",
        header: "ID"
    },
    {
        header: "CATEGORY NAME",
        cell: ({row}) => (
            <div>{row.original.name}</div>
        )
    },
    {
        accessorKey: "is_active",
        header: "STATUS",
        cell: ({row}) => (
            <div>
                {row.original.is_active
                ? <Badge>Active</Badge>
                : <Badge variant="destructive">Inactive</Badge>
                }
            </div>
        )
    },
    {
        accessorKey: "created_at",
        header: "CREATED AT",
        cell: ({row}) => (
            <div>{format(new Date(row.original.created_at), "yyyy-MM-dd")}</div>
        )
    },
    {
        id: "actions",
        header: () => (
            <div className="text-right">ACTIONS</div>
        ),
        cell: ({row}) => {
          return (
            <div className="flex justify-end">
                <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => onEdit(row.original)}><Pencil />Edit</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onDelete(row.original)}>
                        <Trash2 className="text-red-500" />
                        <span className="text-red-500">Delete</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
                </DropdownMenu>
            </div>
          )
        },
  },
];