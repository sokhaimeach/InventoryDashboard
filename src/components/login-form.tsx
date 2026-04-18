import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import z from "zod";
import { useForm } from "@tanstack/react-form"
import { useLogin } from "@/hooks/useLogin"
import { Spinner } from "./ui/spinner"
import { setAccessToken } from "@/utils/tokenStorage"
import { useNavigate } from "react-router-dom"

const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(4, "Password is required. atleast 4")
});

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  // Login Query
  const { mutate: loginMutate, isPending } = useLogin();

  // navigate
  const navigate = useNavigate();

  const form = useForm({
    defaultValues: {
      email: "",
      password: ""
    },
    validators: {
      onSubmit: loginSchema
    },
    onSubmit: async ({ value }) => {
      loginMutate(value, {
        onSuccess: (res) => {
          console.log(res)
          setAccessToken(res.data.token);
          navigate("/dashboard");
        }
      });
    }
  })

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form
            className="p-6 md:p-8"
            id="login-form"
            onSubmit={(e) => {
              e.preventDefault()
              form.handleSubmit()
            }}>
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Welcome back</h1>
                <p className="text-balance text-muted-foreground">
                  Login to your Inventory system
                </p>
              </div>

              <form.Field
                name="email"
                children={(field) => {
                  const isInvalid =
                    (field.state.meta.isTouched || form.state.submissionAttempts > 0) &&
                    !field.state.meta.isValid
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        placeholder="Enter email"
                        autoComplete="off"
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  )
                }}
              />
              <div className="flex items-center">
                <a
                  href="#"
                  className="ml-auto text-sm underline-offset-2 hover:underline"
                >
                  Forgot your password?
                </a>
              </div>

              <form.Field
                name="password"
                children={(field) => {
                  const isInvalid =
                    (field.state.meta.isTouched || form.state.submissionAttempts > 0) &&
                    !field.state.meta.isValid
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        placeholder="Enter password"
                        autoComplete="off"
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  )
                }}
              />

              <Field>
                <Button type="submit">
                  {isPending ?
                    <div className='flex gap-2.5 items-center'>
                      <Spinner className='size-3' />
                      <span className='text-sm'>Loading...</span>
                    </div>
                    : "Login"}
                </Button>
              </Field>

              <FieldDescription className="text-center">
                Don&apos;t have an account? <a href="#">Sign up</a>
              </FieldDescription>
            </FieldGroup>
          </form>
          <div className="relative hidden bg-muted md:block">
            <img
              src="/placeholder.svg"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
