import { useForm } from '@tanstack/react-form';
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { z } from 'zod';
import { Textarea } from '../ui/textarea';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectValue, SelectItem, SelectTrigger } from '../ui/select';
import { useCategories } from '@/hooks/useCategoryQuery';
import { Spinner } from '../ui/spinner';
import { useCreateProduct, useDeleteProductImage, useUpdateProduct, useUploadProductImage } from '@/hooks/useProduct';
import type { ProductType } from './columns';
import { useEffect, useState } from 'react';
import FileUpload01 from '../file-upload-01';
import { toast } from 'sonner';

const productSchema = z.object({
  name: z.string().min(1, "Name is required"),
  price: z.number(),
  category_id: z.number(),
  qty: z.number().int().min(0, "Quantity must be 0 or more"),
  color: z.string(),
  description: z.string(),
});

export type ProductSchemaType = z.infer<typeof productSchema>;

interface Props {
  open: boolean,
  setOpen: (open: boolean) => void;
  product?: ProductType;
  isEdit: boolean;
}

const ProductForm = ({ open, setOpen, product, isEdit }: Props) => {
  const { data, isLoading } = useCategories();

  const { mutate: createProductMutate, isPending } = useCreateProduct();
  const { mutate: updateProductMutate, isPending: isPeningUpdate } = useUpdateProduct();
  // upload file mutate
  const { mutate: uploadProductImageMutate } = useUploadProductImage();
  const [uploadedFile, setUploadedFile] = useState<File[] | null>(null);
  // delete file mutate
  const { mutate: deleteProductImageMutate, isPending: isPendingDeleteImage } = useDeleteProductImage();

  const form = useForm({
    defaultValues: {
      name: "",
      price: 0,
      category_id: 1,
      qty: 0,
      color: "",
      description: ""
    },
    validators: {
      onSubmit: productSchema
    },
    onSubmit: async ({ value }) => {
      if (isEdit && product) {
        updateProductMutate({
          id: product.product_id,
          request: value
        }, {
          onSuccess: () => {
            uploadedImage(product);
            toast.success("Product updated successfully");
          },
          onError: (error) => {
            console.error("update product error:", error);
          },
        });
      } else {
        createProductMutate(value, {
          onSuccess: (res) => {
            uploadedImage(res.data);
          },
          onError: (error) => {
            console.error("create product error:", error);
          },
        });
      }
    }
  });

  useEffect(() => {
    form.reset({
      name: isEdit && product ? product.name : "",
      price: isEdit && product ? Number(product.price) : 0,
      category_id: isEdit && product ? product.category_id : 1,
      qty: isEdit && product ? Number(product.qty) : 0,
      color: "",
      description: isEdit && product ? product.description : ""
    });
  }, [isEdit, product]);

  // Handle file upload complete
  const handleUploadComplete = (file: File[]) => {
    setUploadedFile(file);
  }

  const uploadedImage = (product: ProductType) => {
    for (const file of uploadedFile || []) {
      uploadProductImageMutate({
        id: product.product_id,
        file: file as File
      }, {
        onSuccess: () => {
          console.log("File uploaded successfully");
        },
        onError: (error) => {
          console.error("File upload error:", error);
        },
        onSettled: () => {
          setOpen(false);
          form.reset();
        }
      });
    }
  }

  const handleDeleteImage = (imageId: number) => {
    deleteProductImageMutate(imageId, {
      onSuccess: () => {
        toast.success("Image deleted successfully");
      },
      onError: (error) => {
        console.error("Delete image error:", error);
      }
    });
  }

    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <form
          id="product-form"
          onSubmit={(e) => {
            e.preventDefault()
            form.handleSubmit()
          }}>
          <DialogContent className="sm:max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create Product</DialogTitle>
              <DialogDescription>
                Manage Product create and edit
              </DialogDescription>
            </DialogHeader>
            <FieldGroup>
              <div className="flex gap-2">
                {/* name */}
                <form.Field
                  name="name"
                  children={(field) => {
                    const isInvalid =
                      (field.state.meta.isTouched || form.state.submissionAttempts > 0) &&
                      !field.state.meta.isValid
                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name}>Product Name</FieldLabel>
                        <Input
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          aria-invalid={isInvalid}
                          placeholder="Enter product name"
                          autoComplete="off"
                        />
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    )
                  }}
                />
                {/* price */}
                <form.Field
                  name="price"
                  children={(field) => {
                    const isInvalid =
                      (field.state.meta.isTouched || form.state.submissionAttempts > 0) &&
                      !field.state.meta.isValid
                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name}>Price</FieldLabel>
                        <Input
                          type='number'
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.valueAsNumber)}
                          aria-invalid={isInvalid}
                          placeholder="Enter price"
                          autoComplete="off"
                        />
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    )
                  }}
                />
              </div>

              <div className="flex gap-2">
                {/* category */}
                <form.Field
                  name="category_id"
                  children={(field) => {
                    const isInvalid =
                      (field.state.meta.isTouched || form.state.submissionAttempts > 0) &&
                      !field.state.meta.isValid
                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name}>Category</FieldLabel>
                        <Select
                          name={field.name}
                          value={String(field.state.value)}
                          onValueChange={(val) => field.handleChange(Number(val))}
                        >
                          <SelectTrigger
                            id={field.name}
                            aria-invalid={isInvalid}>
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                          <SelectContent>
                            {isLoading ?
                              <div><Spinner className='size-4' /> Loading categories...</div>
                              : (data?.data?.map((category: any) => (
                                <SelectItem key={category.category_id} value={String(category.category_id)}>{category.name}</SelectItem>
                              )))}
                          </SelectContent>
                        </Select>
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    )
                  }}
                />
                {/* qty */}
                <form.Field
                  name="qty"
                  children={(field) => {
                    const isInvalid =
                      (field.state.meta.isTouched || form.state.submissionAttempts > 0) &&
                      !field.state.meta.isValid
                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name}>Quantity</FieldLabel>
                        <Input
                          type='number'
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.valueAsNumber)}
                          aria-invalid={isInvalid}
                          placeholder="Enter quantity"
                          autoComplete="off"
                        />
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    )
                  }}
                />
              </div>
              {/* description */}
              <form.Field
                name="description"
                children={(field) => {
                  const isInvalid =
                    (field.state.meta.isTouched || form.state.submissionAttempts > 0) &&
                    !field.state.meta.isValid
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Description</FieldLabel>
                      <Textarea
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        placeholder="Write description of product"
                        autoComplete="off"
                      />
                      <FieldDescription>
                        {/* Include steps to reproduce, expected behavior, and what
                      actually happened. */}
                      </FieldDescription>
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  )
                }}
              />

              <FileUpload01 onUploadComplete={handleUploadComplete} previewUrls={product?.images} onDeleteImage={handleDeleteImage} loadingDeleteImage={isPendingDeleteImage} />
            </FieldGroup>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit" form='product-form' className='w-30'>
                {isPending || isPeningUpdate ?
                  <div className='flex gap-2.5 items-center'>
                    <Spinner className='size-3' />
                    <span className='text-sm'>Loading...</span>
                  </div>
                  : "Save"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>
    )
  }
  
  export default ProductForm;
