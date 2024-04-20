import React from "react";
import { User } from "./../shared/interfaces/user";

const useGetUser = () => {
  const [user, setUser] = React.useState<User>({} as User);
  React.useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setUser(JSON.parse(user));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { user };
};

export default useGetUser;
