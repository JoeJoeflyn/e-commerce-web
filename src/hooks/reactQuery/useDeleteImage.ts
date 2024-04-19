import { deleteImage } from "@/api/";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useDeleteImage = (
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (id: number) => deleteImage(id),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["editProduct"] });
      toast.success("Deleted image successfully");
      setOpen(false);
    },
    onError() {
      toast.error("Failed to delete image, check your internet connection");
    },
  });

  return { mutate };
};
