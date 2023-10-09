import { createContext, useState } from "react";

const UserContext = createContext({ email: "", auth: false });

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({ email: "", auth: false });
  const login = (email, token) => {
    setUser({
      email: email,
      auth: true,
    });
    localStorage.setItem("token", token);
    localStorage.setItem("email", email);
  };
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    setUser({
      email: "",
      auth: false,
    });
  };
  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
export { UserContext, UserProvider };
