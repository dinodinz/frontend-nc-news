import { createContext, useContext, useState } from "react";
const LoggedUserContext = createContext();

export function AppProvider({ children }) {
  const [loggedUser, setLoggedUser] = useState(null);

  return (
    <LoggedUserContext.Provider value={{ loggedUser, setLoggedUser }}>
      {children}
    </LoggedUserContext.Provider>
  );
}

export function useLoggedUser() {
  return useContext(LoggedUserContext);
}
