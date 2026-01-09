"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { AtSign, LockKeyholeIcon, User2 } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import GoogleImg from "../../../../public/google.svg";
import { signupSchema } from "../schema/authSchema";

const SignupCard = () => {
  const form = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      marketingConsent: false,
    },
  });
  const passwordValue = useWatch({
    control: form.control,
    name: "password",
  });
  const t = useTranslations("auth");

  function onSubmit(values: z.infer<typeof signupSchema>) {}

  return (
    <div className="bg-secondary rounded-2xl p-6">
      <div className="mx-auto mb-5 flex flex-col items-center gap-1 text-center">
        <h2 className="font-gilroy text-secondary-foreground text-2xl font-bold uppercase">
          {t("signupTitle")}
        </h2>
        <p className="text-secondary-foreground font-montserrat text-base font-normal">
          {t("signupDesc")}
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* FIRST NAME */}
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex items-end gap-2">
                    <User2 size={20} />
                    <Input
                      placeholder={t("firstNameInput")}
                      className="w-full"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* LAST NAME */}
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex items-end gap-2">
                    <User2 size={20} />
                    <Input
                      placeholder={t("lastNameInput")}
                      className="w-full"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
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
                  <div className="flex flex-col gap-2">
                    <div className="flex items-end gap-2">
                      <LockKeyholeIcon size={20} />
                      <Input
                        type="password"
                        placeholder={t("passwordInput")}
                        className="w-full"
                        {...field}
                      />
                    </div>
                    <p
                      className={cn(
                        passwordValue.length >= 6 && "text-green-500",
                        "text-end text-sm font-normal",
                      )}
                    >
                      {passwordValue.length}/6 {t("characters")}
                    </p>
                  </div>
                </FormControl>
                <FormMessage />
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
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="font-montserrat w-full rounded-xl">
            {t("signupBtn")}
          </Button>
        </form>
      </Form>

      <div className="fle flex-col space-y-3">
        <div className="after:border-secondary-foreground/30 relative mt-2 text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t-2">
          <span className="bg-secondary text-secondary-foreground font-montserrat relative z-10 px-16 font-semibold">
            {t("or")}
          </span>
        </div>

        <p className="text-secondary-foreground/60 font-montserrat mx-auto text-center text-sm">
          {t("signupGoogle")}
        </p>

        <Image
          src={GoogleImg}
          alt="Signup with google"
          className="mx-auto size-12 cursor-pointer"
        />
      </div>
    </div>
  );
};

export default SignupCard;
