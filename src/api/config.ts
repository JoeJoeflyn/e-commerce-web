export const headers = (options?: { Authorization: string }) => {
  return {
    ...options,
  };
};

export const removeToken = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};
