import Image from "next/image";
import LogIn from "@/components/logIn";
import SignUp from "@/components/signUp";
import AccountList from "@/components/accountList";
import Providers from "./provider";

export default function Home() {
  return (
    <Providers>
      {/* <LogIn /> */}
      <SignUp />
      {/* <AccountList /> */}
    </Providers>
  );
}
