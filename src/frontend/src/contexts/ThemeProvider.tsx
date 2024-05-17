import React, { createContext, useState, useContext, ReactNode } from "react";

export interface MyContextValue {
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
}
const themeContext = createContext<MyContextValue | undefined>(undefined);

// Define props for the provider component
interface MyProviderProps {
  children: ReactNode;
}

export const useThemeContext = (): MyContextValue => {
  const context = useContext(themeContext);
  if (!context) {
    throw new Error("useThemeContext must be used within a ThemeProvider");
  }
  return context;
};

export const ThemeProvider: React.FC<MyProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<string>(() => {
    if (window.matchMedia("(prefers-color-scheme:dark)").matches) {
      return "dark";
    } else {
      return "light";
    }
  });

  const contextValue: MyContextValue = {
    theme,
    setTheme,
  };

  return (
    <themeContext.Provider value={contextValue}>
      {children}
    </themeContext.Provider>
  );
};
