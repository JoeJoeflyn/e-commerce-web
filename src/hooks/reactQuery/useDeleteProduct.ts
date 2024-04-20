import { deleteProduct } from "@/api/";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationKey: ["deleteProduct"],
    mutationFn: (id: number) => deleteProduct(id),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["productsByUserId"] });
      toast.success("Deleted item successfully");
    },
    onError() {
      toast.error("Failed to delete item, check your internet connection");
    },
  });

  return { mutate };
};
