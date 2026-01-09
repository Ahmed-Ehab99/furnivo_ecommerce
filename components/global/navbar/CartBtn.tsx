import { ShoppingBagIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "../../ui/button";

const CartBtn = () => {
  return (
    <Button size="icon" variant="ghost" className="relative">
      <Link href="/cart">
        <ShoppingBagIcon className="text-secondary-foreground size-5" />
        <span className="bg-primary absolute -top-1 -right-1 flex items-center justify-center rounded-full px-1.5 py-1 text-xs">
          0
        </span>
      </Link>
    </Button>
  );
};

export default CartBtn;
