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
import { zodResolver } from "@hookform/resolvers/zod";
import { AtSign, LockKeyholeIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { signinSchema } from "../schema/authSchema";

const SigninCard = () => {
  const form = useForm({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const t = useTranslations("auth");

  function onSubmit(values: z.infer<typeof signinSchema>) {}

  return (
    <div className="bg-secondary flex flex-col rounded-2xl p-6">
      <h2 className="font-gilroy text-secondary-foreground mx-auto mb-12 text-center text-2xl font-bold uppercase">
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
            className="font-montserrat mt-auto w-full rounded-xl"
          >
            {t("signinBtn")}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default SigninCard;
