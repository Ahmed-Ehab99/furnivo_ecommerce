"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { AtSign, LockKeyholeIcon, TriangleAlert } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { SigninFormData, signinSchema } from "../schema/authSchema";

const defaultValues = {
  email: "",
  password: "",
};

const SigninCard = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(signinSchema),
    defaultValues,
  });
  const t = useTranslations("auth");
  const toastesT = useTranslations("toastes");
  const { isDirty, errors } = form.formState;

  const onSubmit = (values: SigninFormData) => {
    startTransition(async () => {
      const { data: result, error } = await authClient.signIn.email({
        email: values.email,
        password: values.password,
        rememberMe: true,
      });

      if (error) {
        if (error.status === 401 || error.statusText === "UNAUTHORIZED") {
          toast.error(`${toastesT("error.unauthorized")}`);
          return;
        }
        toast.error(`${toastesT("error.unexpected")}`);
        return;
      }

      if (result) {
        toast.success(`${toastesT("success.signin")}`);
        form.reset();
        router.push("/");
        router.refresh();
      } else {
        toast.error(`${toastesT("error.signin")}`);
      }
    });
  };

  return (
    <div className="bg-secondary flex flex-col rounded-2xl p-6">
      <h2 className="font-gilroy mx-auto mb-12 text-center text-2xl font-bold uppercase">
        {t("signinTitle")}
      </h2>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-1 flex-col space-y-8"
        >
          {/* EMAIL */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative flex items-end gap-2">
                    <AtSign className="size-5" />
                    <Input
                      type="email"
                      placeholder={t("emailInput")}
                      className={cn(
                        "w-full",
                        errors.email && "border-b-destructive",
                      )}
                      {...field}
                    />
                    <TriangleAlert
                      className={cn(
                        "absolute end-0 bottom-1.5 size-5",
                        errors.email && "text-destructive",
                      )}
                    />
                  </div>
                </FormControl>
                {errors.email && (
                  <p className="text-destructive ms-7 text-sm">
                    {t(errors.email.message as string)}
                  </p>
                )}
              </FormItem>
            )}
          />
          {/* PASSWORD */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex items-end gap-2">
                    <LockKeyholeIcon className="size-5" />
                    <Input
                      type="password"
                      placeholder={t("passwordInput")}
                      className={cn(
                        "w-full",
                        errors.password && "border-b-destructive",
                      )}
                      {...field}
                    />
                  </div>
                </FormControl>
                {errors.password && (
                  <p className="text-destructive ms-7 text-sm">
                    {t(errors.password.message as string)}
                  </p>
                )}
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={isPending || !isDirty}
            className="mt-auto w-full rounded-xl"
          >
            {isPending ? <Spinner /> : t("signinBtn")}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default SigninCard;
