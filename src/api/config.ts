export const headers = (options?: { Authorization: string }) => {
  return {
    ...options,
    "Content-Type": "application/json",
  };
};

export const removeToken = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};
