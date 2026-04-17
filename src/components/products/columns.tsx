"use client"

import type { ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "../ui/badge";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ProductType = {
  product_id: number
  name: string
  price: number
  qty: number
  category_id: number
  is_active: boolean
  category: {
    category_id: number
    name: string
  }
  images: string[]
}

export const columns: ColumnDef<ProductType>[] = [
  {
    accessorKey: "product_id",
    header: "ID",
  },
  {
    header: "PRODUCT NAME",
    cell: ({ row }) => (
      <div className="text-rose-400 font-semibold">
        {row.original.name}
      </div>
    )
  },
  {
    header: "PRICE",
    cell: ({ row }) => (
      <div className="text-green-400 font-semibold">
        {row.original.price} $
      </div>
    )
  },
  // {
  //   header: "IMAGES",
  //   cell: ({row}) => (
  //       <div className="flex gap-1">
  //           {row.original.images? row.original.images.map((image) => (
  //               <img key={image} className="w-20 object-cover" src={image} alt={image} />
  //           ))
  //           :
  //           <p>No image</p>}
  //       </div>
  //   )
  // },
  {
    header: "Quantity",
    cell: ({ row }) => (
      <div>{row.original.qty} {row.original.qty > 1 ? "units" : "unit"}</div>
    )
  },
  {
    header: "CATEGORY",
    cell: ({ row }) => (
      <div>
        <Badge>{row.original.category.name}</Badge>
      </div>
    )
  },
  {
    id: "actions",
    header: () => (
      <div className="text-right">CATEGORY</div>
    ),
    cell: () => {
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
              <DropdownMenuItem><Pencil />Edit</DropdownMenuItem>
              <DropdownMenuItem><Trash2 className="text-red-500" /><span className="text-red-500">Delete</span></DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )
    },
  },
]
