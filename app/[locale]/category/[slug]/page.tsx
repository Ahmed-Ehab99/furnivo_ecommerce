import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Image from "next/image";

const CategoryPage = () => {
  return (
    <div className="container mx-auto grid grid-cols-2 items-center gap-24 px-4 py-32 md:grid-cols-3 lg:grid-cols-4">
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
    </div>
  );
};

export default CategoryPage;

const ProductCard = () => {
  return (
    <div className="flex flex-col">
      <div className="bg-[#FAFAFA]">
        <Image
          src="/categories/living-room/products/chair1.webp"
          alt="asdasd"
          width={400}
          height={400}
          className="relative bottom-10"
        />
      </div>
      <div className="flex flex-col gap-9 p-4">
        <div>
          <span className="text-base font-normal text-[#8D8D8D]">Chair</span>
          <h2 className="text-xl font-semibold">Sakarias Armchair</h2>
        </div>
        <div className="flex items-center justify-between">
          <span className="flex items-start gap-1 text-xl font-semibold">
            <span className="text-sm">€</span> 392
          </span>
          <Button
            size="icon-lg"
            className="bg-secondary-foreground rounded-full"
          >
            <Plus />
          </Button>
        </div>
      </div>
    </div>
  );
};
