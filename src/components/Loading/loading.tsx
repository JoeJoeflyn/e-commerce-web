import React from "react";
import Skeleton from "react-loading-skeleton";

export default function Loading() {
  return (
    <div className="rounded-b-lg p-2">
      <div className="relative w-full h-64">
        <Skeleton className="h-full rounded-b-lg" />
      </div>
      <div className="py-2">
        <Skeleton count={3} />
      </div>
    </div>
  );
}
