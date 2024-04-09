import { useRouter } from "next/navigation";
import React from "react";

const useNavigate = (option: string) => {
  const router = useRouter();

  React.useEffect(() => {
    const user = localStorage.getItem("user");
    console.log("user check", user);
    if (!user) {
      router.push("/login");
    }

    if (
      (user && window.location.pathname === "/login") ||
      window.location.pathname === "/signup"
    ) {
      router.push("/");
    }
  }, []);
};

export default useNavigate;
