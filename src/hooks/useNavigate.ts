import { useRouter } from "next/navigation";
import React from "react";

const useNavigate = (option: string) => {
  const router = useRouter();

  React.useEffect(() => {
    const user = localStorage.getItem("user");

    if (!user) {
      router.push("/login");
    }

    if (
      (user && window.location.pathname === "/login") ||
      window.location.pathname === "/signup"
    ) {
      router.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default useNavigate;
