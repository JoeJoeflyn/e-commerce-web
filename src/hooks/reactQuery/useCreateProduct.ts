import { createProduct } from "@/api/";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export const useCreateProduct = () => {
  const router = useRouter();

  const { mutate } = useMutation({
    mutationFn: createProduct,
    onSuccess() {
      toast.success("Created product successfully");
      router.push("/");
    },
    onError(error: { message: string }) {
      toast.error(error?.message);
    },
  });

  return { mutate };
};
