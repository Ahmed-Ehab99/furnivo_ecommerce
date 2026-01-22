import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";

interface Action {
  labelKey: string;
  href: string;
}

interface EmptyStateProps {
  namespace: string;
  icon: LucideIcon;
  titleKey: string;
  descriptionKey: string;
  primaryAction: Action;
  secondaryAction?: Action;
  className?: string;
}

const EmptyState = ({
  namespace,
  icon: Icon,
  titleKey,
  descriptionKey,
  primaryAction,
  secondaryAction,
  className,
}: EmptyStateProps) => {
  const t = useTranslations(namespace);

  return (
    <div className={cn("flex h-screen items-center justify-center", className)}>
      <Empty className="max-w-xl">
        <EmptyHeader className="flex flex-col items-center gap-4">
          <EmptyMedia
            variant="icon"
            className="bg-secondary/60 flex size-20 items-center justify-center rounded-full"
          >
            <Icon className="text-muted-foreground size-10" />
          </EmptyMedia>

          <EmptyTitle className="text-center text-2xl font-bold">
            {t(titleKey)}
          </EmptyTitle>

          <EmptyDescription className="max-w-sm text-center">
            {t(descriptionKey)}
          </EmptyDescription>
        </EmptyHeader>

        <EmptyContent className="mt-6 flex justify-center gap-3">
          <Button asChild>
            <Link href={primaryAction.href}>{t(primaryAction.labelKey)}</Link>
          </Button>

          {secondaryAction && (
            <Button variant="outline" asChild>
              <Link href={secondaryAction.href}>
                {t(secondaryAction.labelKey)}
              </Link>
            </Button>
          )}
        </EmptyContent>
      </Empty>
    </div>
  );
};

export default EmptyState;
