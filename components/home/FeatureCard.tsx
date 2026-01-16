import { FeatureItem } from "@/lib/types";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface FeatureCardProps {
  item: FeatureItem;
  className?: string;
}

const FeatureCard = ({ item, className }: FeatureCardProps) => {
  return (
    <div
      className={cn(
        "relative z-20 h-120 rounded-3xl", className
      )}
    >
      <Image
        src={item.image}
        alt={item.title}
        className="rotate-y-180 rounded-3xl object-cover"
        fill
        sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
      />
      <div className="absolute right-4.5 bottom-4.5 left-4.5 flex flex-col gap-8 justify-self-center rounded-3xl bg-white/50 px-5 py-10 text-center backdrop-blur-md md:h-1/2 md:max-w-75 xl:px-10.5 xl:py-15">
        <h3 className="text-lg font-bold">{item.title}</h3>
        <p className="text-sm font-normal">{item.desc}</p>
      </div>
    </div>
  );
};

export default FeatureCard;
