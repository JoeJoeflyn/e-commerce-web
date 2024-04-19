import React from "react";
import Skeleton from "react-loading-skeleton";

export default function FormLoading() {
  return (
    <div className="grid md:grid-cols-3 justify-center gap-5 rounded">
      <div>
        <p className="text-lg font-bold text-start md:text-center">
          Product images
        </p>
        <div className="relative border-dotted h-48 mt-5 rounded-lg">
          <Skeleton className="h-full" />
        </div>
      </div>
      <div className="md:col-span-2 grid gap-4">
        {Array(8)
          .fill(null)
          .map((_, index) => (
            <div key={index}>
              <Skeleton />
            </div>
          ))}
      </div>
    </div>
  );
}
