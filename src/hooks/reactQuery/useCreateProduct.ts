import { createProduct } from "@/api/";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useCreateProduct = ({
  closeModal,
}: {
  closeModal: () => void;
}) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationKey: ["createProduct"],
    mutationFn: createProduct,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["editProduct"] });
      queryClient.invalidateQueries({ queryKey: ["productsByUserId"] });
      toast.success("Created product successfully");
      closeModal();
    },
    onError(error: { message: string }) {
      toast.error("Failed to create product, check your internet connection");
    },
  });

  return { mutate };
};
