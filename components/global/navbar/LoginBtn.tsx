import { Button } from "@/components/ui/button";
import Link from "next/link";

const LoginBtn = () => {
  return (
    <Button asChild>
      <Link href="/auth">Login</Link>
    </Button>
  );
};

export default LoginBtn;
