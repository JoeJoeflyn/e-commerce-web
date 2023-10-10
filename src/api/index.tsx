export const getAccountList = async () => {
  const dataList = await fetch(
    "http://localhost:5432/api/users?page=1&limit=10"
  ).then((res) => res.json());

  return { ...dataList };
};
