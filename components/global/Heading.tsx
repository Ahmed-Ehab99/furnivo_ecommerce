import { cn } from "@/lib/utils";

const Heading = ({
  title,
  description,
  className,
}: {
  title: string;
  description: string;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <h1 className="font-gilroy text-3xl font-extrabold tracking-tight md:text-4xl lg:text-5xl">
        {title}
      </h1>
      <p className="text-base font-normal opacity-80 md:text-lg lg:text-xl">
        {description}
      </p>
    </div>
  );
};

export default Heading;
