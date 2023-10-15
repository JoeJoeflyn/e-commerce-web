export const getAccountList = async () => {
  const dataList = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/users?page=1&limit=10`
  );

  return { ...dataList };
};

export const createAccount = async (newAccount: {
  name: string;
  email: string;
  password: string;
}) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/users/register`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newAccount),
    }
  );

  const parseResponse = await response.json();
  if (!response?.ok) {
    throw new Error(
      parseResponse?.error ?? "Server Error, Please try again later!"
    );
  }
  return parseResponse;
};

export const login = async (user: { email: string; password: string }) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/users/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    }
  );
  const parseResponse = await response.json();
  if (!response?.ok) {
    throw new Error(
      parseResponse?.error ?? "Server Error, Please try again later!"
    );
  }
  return parseResponse;
};
