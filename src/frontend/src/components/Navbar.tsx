import Login from "./Login";
import ThemeSwitch from "./ThemeSwitch";
import LanguageSwitch from "./LanguageSwitch";
import Profile from "./Profile";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav
      id="header-nav"
      className=" sticky top-0 z-50 flex w-screen max-w-6xl select-none flex-row items-center justify-between rounded-b-xl p-5 "
    >
      <Link to={"/"}>
        <div className="font-mono text-xl font-bold">ChopchopURL</div>
      </Link>
      <div className="flex flex-row items-center justify-center gap-2">
        <ThemeSwitch />
        <LanguageSwitch />

        <Login />
        <Profile />
      </div>
    </nav>
  );
};

export default Navbar;
