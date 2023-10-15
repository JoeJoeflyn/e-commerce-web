import Image from "next/image";
import LogIn from "@/components/logIn";
import SignUp from "@/components/signUp";
import AccountList from "@/components/accountList";
import Providers from "./provider";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  return (
    <Providers>
      <ToastContainer />
      <LogIn />
      {/* <SignUp /> */}
      {/* <AccountList /> */}
    </Providers>
  );
}
