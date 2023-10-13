export const getAccountList = async () => {
  const dataList = await fetch(
    "http://localhost:5432/api/users?page=1&limit=10"
  ).then((res) => res.json());

  return { ...dataList };
};

export const createAccount = async (newAccount: {
  name: string;
  email: string;
  password: string;
}) => {
  const response = await fetch("http://localhost:5432/api/users/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newAccount),
  }).then((res) => res.json());

  return response;
};

export const login = async (user: { email: string; password: string }) => {
  const response = await fetch("http://localhost:5432/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  }).then((res) => res.json());

  return response;
};
