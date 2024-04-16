import { useState } from "react";

const useModal = () => {
  const [open, setOpen] = useState(false);
  const [productId, setProductId] = useState<number>();

  const toggleModal = (productId?: number) => {
    setOpen((prev) => !prev);
    setProductId(productId);
  };

  return { open, toggleModal, productId };
};

export default useModal;
