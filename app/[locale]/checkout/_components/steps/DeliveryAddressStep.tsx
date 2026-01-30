"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useCheckout } from "../../hooks/useCheckout";
import {
  DeliveryAddressFormData,
  deliveryAddressSchema,
} from "../../schema/checkoutSchema";

const DeliveryAddressStep = ({ locale }: { locale: string }) => {
  const router = useRouter();
  const deliveryAddress = useAppSelector(
    (state: RootState) => state.checkout.deliveryAddress,
  );
  const t = useTranslations("checkout");
  const { saveDeliveryAddress } = useCheckout(locale);

  const form = useForm<DeliveryAddressFormData>({
    resolver: zodResolver(deliveryAddressSchema),
    defaultValues: deliveryAddress || {
      city: "",
      streetName: "",
      buildingName: "",
    },
  });

  const { errors } = form.formState;

  const onSubmit = (data: DeliveryAddressFormData) => {
    saveDeliveryAddress(data);
  };

  const handleBack = () => {
    router.push("/cart");
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-base font-semibold uppercase md:text-2xl">
          {t("stepOne.title")}
        </h2>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* City */}
          <FormField
            control={form.control}
            name="city"
            render={({ field, fieldState }) => (
              <FormItem className="space-y-1">
                <FormControl>
                  <Input
                    placeholder={t("stepOne.cityPlaceholder")}
                    className={
                      fieldState.error
                        ? "border-destructive focus-visible:ring-destructive"
                        : ""
                    }
                    {...field}
                  />
                </FormControl>
                {errors.city && (
                  <p className="text-destructive text-sm">
                    {t(errors.city.message as string)}
                  </p>
                )}
              </FormItem>
            )}
          />

          {/* Street Name */}
          <FormField
            control={form.control}
            name="streetName"
            render={({ field, fieldState }) => (
              <FormItem className="space-y-1">
                <FormControl>
                  <Input
                    placeholder={t("stepOne.streetNamePlaceholder")}
                    className={
                      fieldState.error
                        ? "border-destructive focus-visible:ring-destructive"
                        : ""
                    }
                    {...field}
                  />
                </FormControl>
                {errors.streetName && (
                  <p className="text-destructive text-sm">
                    {t(errors.streetName.message as string)}
                  </p>
                )}
              </FormItem>
            )}
          />

          {/* Building Name */}
          <FormField
            control={form.control}
            name="buildingName"
            render={({ field, fieldState }) => (
              <FormItem className="space-y-1">
                <FormControl>
                  <Input
                    placeholder={t("stepOne.buildingNamePlaceholder")}
                    className={
                      fieldState.error
                        ? "border-destructive focus-visible:ring-destructive"
                        : ""
                    }
                    {...field}
                  />
                </FormControl>
                {errors.buildingName && (
                  <p className="text-destructive text-sm">
                    {t(errors.buildingName.message as string)}
                  </p>
                )}
              </FormItem>
            )}
          />

          {/* Buttons */}
          <div className="flex justify-between pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleBack}
              className="gap-2"
            >
              {locale === "ar" ? (
                <ArrowRight className="size-4" />
              ) : (
                <ArrowLeft className="size-4" />
              )}
              {t("back")}
            </Button>

            <Button type="submit" className="gap-2">
              {t("next")}
              {locale === "ar" ? (
                <ArrowLeft className="size-4" />
              ) : (
                <ArrowRight className="size-4" />
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default DeliveryAddressStep;
