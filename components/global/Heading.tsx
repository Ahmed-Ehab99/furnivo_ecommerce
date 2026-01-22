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
      <h1 className="font-gilroy text-5xl font-extrabold tracking-tight lg:text-6xl">
        {title}
      </h1>
      <p className="text-lg font-normal opacity-80 lg:text-xl">
        {description}
      </p>
    </div>
  );
};

export default Heading;
