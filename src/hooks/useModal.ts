import { useState } from "react";

const useModal = () => {
  const [open, setOpen] = useState(false);
  const [productId, setProductId] = useState<number>();

  const openModal = (productId?: number) => {
    setOpen(true);
    setProductId(productId);
  };

  const closeModal = () => {
    setOpen(false);
  };

  return { open, openModal, closeModal, productId };
};

export default useModal;
