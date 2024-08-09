import { useEffect } from "react";
import Button from "../ui/Button";
import axios from "axios";
import { useLoginContext } from "../contexts/LoginProvider";
import { useTranslation } from "react-i18next";
import { ArrowRightIcon } from "../assets/svg";

axios.defaults.withCredentials = true;

const Login: React.FC<{ type?: string }> = ({ type = "login" }) => {
  const { t } = useTranslation();
  const { user, loginUser } = useLoginContext();

  const text = t(`btn.${type}`);

  const loginWithGitHub = () => {
    window.location.href = `${import.meta.env.VITE_BACK_URL}/auth/github`;
  };
  const loginWithGoogle = () => {
    window.location.href = `${import.meta.env.VITE_BACK_URL}/auth/google`;
  };

  useEffect(() => {
    // Check if the user is authenticated when the component mounts
    checkAuthentication();
  }, []);

  const checkAuthentication = async () => {
    try {
      // Check if the user is authenticated by sending a request to the backend
      // const response = await axios.get(
      //   `${import.meta.env.VITE_BACK_URL}/user`,
      //   {
      //     withCredentials: true,
      //     // headers: {
      //     //   "Access-Control-Allow-Origin": "*",
      //     //   "Content-Type": "application/json",
      //     // },
      //   },
      // );
      // const loggedUser = response.data;

      // const response = await fetch(`${import.meta.env.VITE_BACK_URL}/user`, {
      //   method: "GET",
      //   credentials: "include",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // });

      const response = await fetch("https://chopchop-url.onrender.com/user", {
        headers: {
          accept:
            "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
          "accept-language": "es-ES,es;q=0.5",
          "cache-control": "no-cache",
          pragma: "no-cache",
          priority: "u=0, i",
          "sec-ch-ua":
            '"Not)A;Brand";v="99", "Brave";v="127", "Chromium";v="127"',
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": '"Windows"',
          "sec-fetch-dest": "document",
          "sec-fetch-mode": "navigate",
          "sec-fetch-site": "none",
          "sec-fetch-user": "?1",
          "sec-gpc": "1",
          "upgrade-insecure-requests": "1",
        },
        referrerPolicy: "strict-origin-when-cross-origin",
        body: null,
        method: "GET",
        mode: "cors",
        credentials: "include",
      });

      const loggedUser = await response.json();
      loginUser(loggedUser);
      // setUser(loggedUser);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  return (
    <>
      {!user && (
        <>
          <Button onClick={loginWithGitHub}>
            {text}
            <ArrowRightIcon size={20} color="#888" />
          </Button>
          <Button onClick={loginWithGoogle}>
            {text + " google"}
            <ArrowRightIcon size={20} color="#888" />
          </Button>
        </>
      )}
    </>
  );
};
export default Login;
