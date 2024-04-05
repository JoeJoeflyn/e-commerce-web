import { useRouter } from "next/navigation";
import { useAppSelector } from "./redux";

const useNavigate = (option: string) => {
  const router = useRouter();
  const { user } = useAppSelector((state) => state);

  if (option === "authenticated") {
    if (!user.token) {
      router.push("/login");
    }
  }
  if (option === "unauthenticated") {
    if (user.token) {
      router.back();
    }
  }
};

export default useNavigate;
