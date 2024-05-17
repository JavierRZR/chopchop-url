// LoginContext.tsx
import React, { ReactNode, createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { GithubUser } from "../types/types";

// Define the type for the context value
export interface LoginContextType {
  user: GithubUser | null;
  loginUser: (userData: GithubUser) => void;
  logoutUser: () => void;
}

// Create the context
const LoginContext = createContext<LoginContextType | undefined>(undefined);

// Custom hook to use the LoginContext
export const useLoginContext = () => {
  const context = useContext(LoginContext);
  if (!context) {
    throw new Error(
      "useLoginContext must be used within a LoginContextProvider",
    );
  }
  return context;
};

// Define props for the provider component
interface LoginProviderProps {
  children: ReactNode;
}

// Create the provider component
export const LoginContextProvider: React.FC<LoginProviderProps> = ({
  children,
}) => {
  const navigate = useNavigate();
  // State to hold the user data
  const [user, setUser] = useState<GithubUser | null>(null);

  // Method to set the user data
  const loginUser = (userData: GithubUser) => {
    setUser(userData);
  };

  // Method to clear the user data (logout)
  const logoutUser = async () => {
    try {
      // Make a request to the logout endpoint
      await axios.get("http://localhost:5000/logout", {
        withCredentials: true,
      });

      setUser(null);
      navigate("/");
      // Optionally, perform any additional actions after logout
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  // Value to be provided by the context
  const contextValue: LoginContextType = {
    user,
    loginUser,
    logoutUser,
  };

  return (
    <LoginContext.Provider value={contextValue}>
      {children}
    </LoginContext.Provider>
  );
};
