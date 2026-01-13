import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslations } from "next-intl";
import SigninCard from "./SigninCard";
import SignupCard from "./SignupCard";

const AuthTabs = () => {
  const t = useTranslations("auth");
  
  return (
    <Tabs defaultValue="signin">
      <TabsList className="w-full">
        <TabsTrigger value="signin">{t("signinBtn")}</TabsTrigger>
        <TabsTrigger value="signup">{t("signupBtn")}</TabsTrigger>
      </TabsList>
      <TabsContent value="signin">
        <SigninCard />
      </TabsContent>
      <TabsContent value="signup">
        <SignupCard />
      </TabsContent>
    </Tabs>
  );
};

export default AuthTabs;
