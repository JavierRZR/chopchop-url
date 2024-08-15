import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Button from "../ui/Button";
import axios from "axios";
import { useLoginContext } from "../contexts/LoginProvider";
import { useTranslation } from "react-i18next";
import { ArrowRightIcon } from "../assets/svg";

axios.defaults.withCredentials = true;

const Login: React.FC<{ type?: string }> = ({ type = "login" }) => {
  const { t } = useTranslation();
  const { user, loginUser } = useLoginContext();
  const [searchParams, setSearchParams] = useSearchParams();
  const [token, setToken] = useState(searchParams.get("token"));

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
  }, [token]);

  const checkAuthentication = async () => {
    if (token) {
      searchParams.delete("token");
      setSearchParams();
      try {
        const response = await axios.post("http://localhost:5000/user", {
          token: token,
        });
        console.log(response.data);
        loginUser(response.data);
        // Check if the user is authenticated by sending a request to the backend
        // const response = await axios.get(
        //   `${import.meta.env.VITE_BACK_URL}/user`,
        //   {
        //     withCredentials: true,
        //     headers: {
        //       // "Access-Control-Allow-Origin": "*",
        //       "Content-Type": "application/json",
        //     },
        //   },
        // );
        // const instance = axios.create({
        //   withCredentials: true,
        //   baseURL: import.meta.env.VITE_BACK_URL,
        // });
        // const response = await instance.get("/user");
        // const loggedUser = response.data;
        // const response = await fetch(`${import.meta.env.VITE_BACK_URL}/user`, {
        //   method: "GET",
        //   credentials: "include",
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        // });
        // const response = await fetch("https://chopchop-url.onrender.com/user", {
        //   method: "GET",
        //   credentials: "include", // Incluye cookies en la solicitud
        //   headers: {
        //     "Content-Type": "application/json", // Asegúrate de que el backend espera este tipo de contenido
        //   },
        // });
        // if (!response.ok) {
        //   throw new Error("No ha logeado una mierda");
        // }
        // const loggedUser = await response.json();
        // loginUser(loggedUser);
        // setUser(loggedUser);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    } else {
      console.log("no token");
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
