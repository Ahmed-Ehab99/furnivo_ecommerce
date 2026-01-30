"use client";

import { cn } from "@/lib/utils";
import { setCurrentStep } from "@/redux/features/checkout/checkoutSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Check } from "lucide-react";
import { useTranslations } from "next-intl";

const steps = [
  { number: 1, key: "address", labelKey: "stepOneLabel" },
  { number: 2, key: "payment", labelKey: "stepTwoLabel" },
  { number: 3, key: "review", labelKey: "stepThreeLabel" },
];

const CheckoutStepper = () => {
  const dispatch = useAppDispatch();
  const { currentStep, completedSteps } = useAppSelector(
    (state) => state.checkout,
  );
  const t = useTranslations("checkout");

  const handleStepClick = (stepNumber: number) => {
    // Can navigate to previous steps or current step
    // Cannot skip to future steps
    if (stepNumber <= currentStep || completedSteps.includes(stepNumber - 1)) {
      dispatch(setCurrentStep(stepNumber));
    }
  };

  return (
    <div className="flex items-center justify-between">
      {steps.map((step, index) => {
        const isCompleted = completedSteps.includes(step.number);
        const isCurrent = currentStep === step.number;
        const isAccessible =
          step.number <= currentStep ||
          completedSteps.includes(step.number - 1);

        return (
          <div
            key={step.number}
            className={cn(
              "flex items-center",
              index !== steps.length - 1 && "flex-1",
            )}
          >
            {/* Step Circle */}
            <button
              onClick={() => handleStepClick(step.number)}
              disabled={!isAccessible}
              className={cn(
                "flex cursor-pointer items-center gap-1 rounded-full py-1 ps-1 pe-1 md:gap-3 md:pe-3",
                isCompleted && "bg-green-200",
                !isAccessible && "cursor-not-allowed opacity-50",
              )}
            >
              <div
                className={cn(
                  "flex size-4 items-center justify-center rounded-full border-2 transition-colors md:size-8",
                  isCompleted && "border-green-500 bg-green-500 text-white",
                  !isCurrent && !isCompleted && "border-gray-500",
                )}
              >
                {isCompleted && <Check className="size-5" />}
              </div>

              {/* Step Label */}
              <span
                className={cn(
                  "text-xs font-semibold uppercase md:text-lg",
                  isCompleted && "text-black/70",
                  !isCurrent && !isCompleted && "text-gray-500",
                )}
              >
                {t(step.labelKey)}
              </span>
            </button>

            {/* Connector Line */}
            {index < steps.length - 1 && (
              <div
                className={cn(
                  "mx-1 h-0.5 flex-1 transition-colors duration-500 md:mx-2",
                  isCompleted ? "bg-green-200" : "bg-gray-300",
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default CheckoutStepper;
