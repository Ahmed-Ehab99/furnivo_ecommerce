import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SigninCard from "./SigninCard";
import SignupCard from "./SignupCard";

const AuthTabs = () => {
  return (
    <Tabs defaultValue="signin">
      <TabsList className="w-full">
        <TabsTrigger value="signin">Signin</TabsTrigger>
        <TabsTrigger value="signup">Signup</TabsTrigger>
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
