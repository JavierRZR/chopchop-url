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
      const response = await axios.get(
        `${import.meta.env.VITE_BACK_URL}/user`,
        {
          withCredentials: true,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
        },
      );
      const loggedUser = response.data;
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
