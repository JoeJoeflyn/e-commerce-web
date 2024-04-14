"use client";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export default function ScrollToTop() {
  const [visible, setVisible] = React.useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  React.useEffect(() => {
    window.addEventListener("scroll", toggleVisible);
  }, []);

  return (
    <button
      className="fixed font-bold bg-white hover:text-blue-700 border-y border-l border-[#ddd] p-2 right-0 bottom-10 rounded-tl rounded-bl cursor-pointer"
      style={{ display: visible ? "inline" : "none" }}
    >
      <div className="flex items-center">
        <FontAwesomeIcon onClick={scrollToTop} width={16} icon={faChevronUp} />
      </div>
    </button>
  );
}
