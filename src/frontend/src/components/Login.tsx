import { useEffect } from "react";
import Button from "../ui/Button";
import axios from "axios";
import { useLoginContext } from "../contexts/LoginProvider";
import { useTranslation } from "react-i18next";
import { ArrowRightIcon } from "../assets/svg";

const Login: React.FC<{ type?: string }> = ({ type = "login" }) => {
  const { t } = useTranslation();
  const { user, loginUser } = useLoginContext();

  const text = t(`btn.${type}`);

  const loginWithGitHub = () => {
    window.location.href = "http://localhost:5000/auth/github";
  };

  useEffect(() => {
    // Check if the user is authenticated when the component mounts
    checkAuthentication();
  }, []);

  const checkAuthentication = async () => {
    try {
      // Check if the user is authenticated by sending a request to the backend
      const response = await axios.get("http://localhost:5000/user", {
        withCredentials: true,
      });
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
        <Button onClick={loginWithGitHub}>
          {text}
          <ArrowRightIcon size={20} color="#888" />
        </Button>
      )}
    </>
  );
};
export default Login;
