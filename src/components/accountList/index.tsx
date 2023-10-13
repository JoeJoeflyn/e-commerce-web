"use client";
import { useQuery } from "@tanstack/react-query";
import { getAccountList } from "@/api/index";

// export async function getStaticProps() {
//   const posts = await getAccountList();
//   return { props: { posts } };
// }

const AccountList = () => {
  const { data } = useQuery({
    queryKey: ["accountlist"],
    queryFn: getAccountList,
  });

  //  const { data: otherData } = useQuery({
  //    queryKey: ["posts-2"],
  //    queryFn: getAccountList,
  //  });

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
