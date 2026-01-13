"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { authClient } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { AtSign, LockKeyholeIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { SigninFormData, signinSchema } from "../schema/authSchema";

const SigninCard = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const t = useTranslations("auth");
  const { isDirty } = form.formState;

  const onSubmit = (values: SigninFormData) => {
    startTransition(async () => {
      const { data: result, error } = await authClient.signIn.email({
        email: values.email,
        password: values.password,
        rememberMe: true,
      });

      if (error) {
        if (error.status === 401 || error.statusText === "UNAUTHORIZED") {
          toast.error(`${t("error.unauthorized")}`);
          return;
        }
        console.error(error);
        toast.error(`${t("error.unexpected")}`);
        return;
      }

      if (result) {
        toast.success(`${t("success.signin")}`);
        form.reset();
        router.push("/");
        router.refresh();
      } else {
        toast.error(`${t("error.signin")}`);
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
                  <div className="flex items-end gap-2">
                    <AtSign size={20} />
                    <Input
                      type="email"
                      placeholder={t("emailInput")}
                      className="w-full"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
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
                    <LockKeyholeIcon size={20} />
                    <Input
                      type="password"
                      placeholder={t("passwordInput")}
                      className="w-full"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={isPending || !isDirty}
            className="font-montserrat mt-auto w-full rounded-xl"
          >
            {isPending ? <Spinner /> : t("signinBtn")}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default SigninCard;
