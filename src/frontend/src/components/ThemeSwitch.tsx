import { useEffect } from "react";
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/shift-toward-subtle.css";

import { LightThemeIcon, DarkThemeIcon } from "../assets/svg";

import { MyContextValue, useThemeContext } from "../contexts/ThemeProvider";
import IconButton from "../ui/IconButton";

const ThemeSwitch = () => {
  const themeContext = useThemeContext();
  const { theme, setTheme }: MyContextValue = themeContext;

  useEffect(() => {
    if (theme == "dark") {
      document.querySelector("html")?.classList.add("dark");
    } else {
      document.querySelector("html")?.classList.remove("dark");
    }
  }, [theme]);

  return (
    <IconButton onClick={() => setTheme(theme == "light" ? "dark" : "light")}>
      {theme == "dark" && (
        <LightThemeIcon
          className="origin-center duration-300 hover:rotate-45"
          color="#999"
        />
      )}
      {theme == "light" && (
        <DarkThemeIcon
          className="origin-center duration-300 hover:-rotate-45"
          color="#000"
        />
      )}
    </IconButton>
    // </Tippy>
  );
};

export default ThemeSwitch;
