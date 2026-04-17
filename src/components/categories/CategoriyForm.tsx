import { useForm } from '@tanstack/react-form';
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { z } from 'zod';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Spinner } from '../ui/spinner';
import { useCreateCategory, useUpdateCategory } from '@/hooks/useCategoryQuery';
import type { CategoryType } from './columns';
import { useEffect } from 'react';

const categorySchema = z.object({
  name: z.string().min(3, "Name is required"),
});

export type CategorySchemaType = z.infer<typeof categorySchema>;

interface Props {
  open: boolean,
  setOpen: (open: boolean) => void;
  category?: CategoryType,
  isEdit: boolean
}

const CategoryForm = ({ open, setOpen, category, isEdit=false }: Props) => {

  const {mutate: createCategoryMutate, isPending} = useCreateCategory();
  const {mutate: updateCategoryMutate, isPending: isPendingEdit } = useUpdateCategory();

  const form = useForm({
    defaultValues: {
      name: "",
    },
    validators: {
      onSubmit: categorySchema
    },
    onSubmit: async ({ value }) => {
      if (isEdit && category) {
        updateCategoryMutate({
          id: category.category_id,
          request: value}, {
            onSuccess: () => {
              setOpen(false);
              form.reset();
            },
            onError: (error) => {
              console.error("create category error:", error);
            },
        });
      } else {
        createCategoryMutate(value, {
          onSuccess: () => {
            setOpen(false);
            form.reset();
          },
          onError: (error) => {
            console.error("create category error:", error);
          },
        });
      }
    }
  });

  useEffect(() => {
    form.reset({
      name: isEdit && category ? category.name : ""
    });
  }, [isEdit, category]);

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
            <DialogTitle>Create Category</DialogTitle>
            <DialogDescription>
              Manage category create and edit
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
                    <FieldLabel htmlFor={field.name}>Category Name</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="Enter category name"
                      autoComplete="off"
                    />
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
              {isPending || isPendingEdit ?
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

export default CategoryForm;
