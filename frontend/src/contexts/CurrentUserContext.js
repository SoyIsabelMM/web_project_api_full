import { createContext } from "react";

export const CurrentUserContext = createContext();

export const CurrentUserProvider = ({ children, currentUser }) => {
  return (
    <CurrentUserContext.Provider value={currentUser}>
      {children}
    </CurrentUserContext.Provider>
  );
};
