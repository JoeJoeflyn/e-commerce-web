import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as fasHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export default function FavoriteItem() {
  const [heartStatus, setHeartStatus] = React.useState(false);

  return (
    <div
      className="cursor-pointer absolute top-2 right-2 text-sm font-light bg-white px-2 py-1 rounded-full"
      onClick={(event) => {
        event.preventDefault();
        setHeartStatus((prev) => !prev);
      }}
    >
      {heartStatus ? (
        <FontAwesomeIcon width={16} size="xl" icon={fasHeart} />
      ) : (
        <FontAwesomeIcon width={16} size="xl" icon={farHeart} />
      )}
    </div>
  );
}
