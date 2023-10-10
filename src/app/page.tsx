import Image from "next/image";
import LogIn from "@/components/logIn";
import SignUp from "@/components/signUp";
import AccountList from "@/components/accountList";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* <LogIn /> */}
      {/* <SignUp /> */}
      <AccountList />
    </QueryClientProvider>
  );
}
