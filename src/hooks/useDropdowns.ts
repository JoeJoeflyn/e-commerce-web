import React from "react";

const useDropdowns = (
  dropdownRef: React.RefObject<HTMLDivElement>
): [React.RefObject<HTMLDivElement>, string, (key: string) => void] => {
  const [isOpen, setIsOpen] = React.useState("");

  const toggleDropdown = (key: string) => setIsOpen(key);

  React.useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen("");
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen, dropdownRef]);

  return [dropdownRef, isOpen, toggleDropdown];
};

export default useDropdowns;
