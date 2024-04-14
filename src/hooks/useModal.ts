"use client";
import React from "react";

const useModal = () => {
  const [open, setOpen] = React.useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  return { open, onOpenModal, onCloseModal };
};

export default useModal;
