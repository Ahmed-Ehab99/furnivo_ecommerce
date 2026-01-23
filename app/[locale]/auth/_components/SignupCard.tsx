"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { AtSign, LockKeyholeIcon, TriangleAlert, User2 } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";
import { SignupFormData, signupSchema } from "../schema/authSchema";
import SigninGoogleBtn from "./SigninGoogleBtn";

const defaultValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  marketingConsent: false,
};

const SignupCard = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const form = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues,
  });
  const passwordValue = useWatch({
    control: form.control,
    name: "password",
  });
  const t = useTranslations("auth");
  const toastesT = useTranslations("toastes");
  const { isDirty, errors } = form.formState;

  const onSubmit = (values: SignupFormData) => {
    startTransition(async () => {
      const { data: result, error } = await authClient.signUp.email({
        name: `${values.firstName} ${values.lastName}`,
        email: values.email,
        password: values.password,
      });

      if (error) {
        toast.error(`${toastesT("error.unexpected")}`);
        return;
      }

      if (result) {
        toast.success(`${toastesT("success.signup")}`);
        form.reset();
        router.push("/");
        router.refresh();
      } else {
        toast.error(`${toastesT("error.signup")}`);
      }
    });
  };

  return (
    <div className="bg-secondary rounded-2xl p-6">
      <div className="mx-auto mb-5 flex flex-col items-center gap-1 text-center">
        <h2 className="text-2xl font-bold uppercase">{t("signupTitle")}</h2>
        <p className="text-base font-normal">{t("signupDesc")}</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* FIRST NAME */}
          <FormField
            control={form.control}
            name="firstName"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormControl>
                  <div className="flex items-end gap-2">
                    <User2 className="size-5" />
                    <Input
                      placeholder={t("firstNameInput")}
                      className={cn(
                        fieldState.error && "border-destructive",
                        "w-full",
                      )}
                      {...field}
                    />
                  </div>
                </FormControl>
                {errors.firstName && (
                  <p className="text-destructive ms-7 text-sm">
                    {t(errors.firstName.message as string)}
                  </p>
                )}
              </FormItem>
            )}
          />
          {/* LAST NAME */}
          <FormField
            control={form.control}
            name="lastName"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormControl>
                  <div className="flex items-end gap-2">
                    <User2 className="size-5" />
                    <Input
                      placeholder={t("lastNameInput")}
                      className={cn(
                        fieldState.error && "border-destructive",
                        "w-full",
                      )}
                      {...field}
                    />
                  </div>
                </FormControl>
                {errors.lastName && (
                  <p className="text-destructive ms-7 text-sm">
                    {t(errors.lastName.message as string)}
                  </p>
                )}
              </FormItem>
            )}
          />
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
                  <div className="flex flex-col gap-2">
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
                    <div
                      className={cn(
                        "flex items-center",
                        errors.password ? "justify-between" : "justify-end",
                      )}
                    >
                      {errors.password && (
                        <p className="text-destructive ms-7 text-sm">
                          {t(errors.password.message as string)}
                        </p>
                      )}
                      <p
                        className={cn(
                          passwordValue.length >= 6 && "text-green-500",
                          "text-end text-sm font-normal",
                        )}
                      >
                        {passwordValue.length}/6 {t("characters")}
                      </p>
                    </div>
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
          {/* MARKETING CONSENT */}
          <FormField
            control={form.control}
            name="marketingConsent"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex items-start gap-2">
                    <Checkbox
                      className="mt-1 rounded-full bg-[#D9D9D9]"
                      id="marketingConsent"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                    <label
                      htmlFor="marketingConsent"
                      className="flex flex-col gap-2"
                    >
                      <p>{t("signupNotification")}</p>
                      <Link href="/terms" className="hover:underline">
                        {t("signupTerms")}
                      </Link>
                    </label>
                  </div>
                </FormControl>
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={isPending || !isDirty}
            className="w-full rounded-xl"
          >
            {isPending ? <Spinner /> : t("signupBtn")}
          </Button>
        </form>
      </Form>

      <div className="fle flex-col space-y-3">
        <div className="relative mt-2 text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t-2 after:opacity-30">
          <span className="bg-secondary relative z-10 px-16 font-semibold">
            {t("or")}
          </span>
        </div>

        <p className="mx-auto text-center text-sm opacity-60">
          {t("signinGoogle")}
        </p>

        <SigninGoogleBtn />
      </div>
    </div>
  );
};

export default SignupCard;
