"use server";

import { useQuery } from "@tanstack/react-query";
import { getAccountList } from "@/api/index";

const AccountList = () => {
  const { data } = useQuery({
    queryKey: ["accountList"],
    queryFn: () => getAccountList(),
    staleTime: 1000 * 60,
  });

  console.log(data);

  return (
    <div className="container mx-auto my-16">
      <ul className="flex flex-wrap gap-8 justify-center">
        {/* {data?.results?.map(() => (
          <li key={id}></li>
        ))} */}
      </ul>
    </div>
  );
};

export default AccountList;
