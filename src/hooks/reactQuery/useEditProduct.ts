import { updateProduct } from "@/api/";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useEditProduct = ({ closeModal }: { closeModal: () => void }) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: updateProduct,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["editProduct"] });
      queryClient.invalidateQueries({ queryKey: ["productsByUserId"] });
      closeModal();
      toast.success("Updated successfully");
    },
    onError(error: { message: string }) {
      toast.error(error?.message);
    },
  });

  return { mutate };
};
