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
import { useCreateProduct } from '@/hooks/useProduct';

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
}

const ProductForm = ({ open, setOpen }: Props) => {
  const { data, isLoading } = useCategories();

  const {mutate: createProductMutate, isPending} = useCreateProduct();

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
      createProductMutate(value, {
        onSuccess: () => {
          setOpen(false);
          form.reset();
        },
        onError: (error) => {
          console.error("create product error:", error);
        },
      });
    }
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <form
        id="product-form"
        onSubmit={(e) => {
          e.preventDefault()
          form.handleSubmit()
        }}>
        <DialogContent className="l:max-w-sm">
          <DialogHeader>
            <DialogTitle>Create Product</DialogTitle>
            <DialogDescription>
              Manage Product create and edit
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
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
          </FieldGroup>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" form='product-form' className='w-30'>
              {isPending?
              <div className='flex gap-2.5 items-center'>
                <Spinner className='size-3' /> 
                <span className='text-sm'>Loading...</span>
              </div>
              :"Save"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}

export default ProductForm;
