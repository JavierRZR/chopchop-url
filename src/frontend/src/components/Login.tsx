import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Button from "../ui/Button";
import axios from "axios";
import { useLoginContext } from "../contexts/LoginProvider";
import { useTranslation } from "react-i18next";
import { ArrowRightIcon } from "../assets/svg";
import Modal from "../ui/Modal";
import useModalContext from "../contexts/ModalContext";

function setCookie(name: string, value: string, days: number) {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}
function getCookie(name: string) {
  const nameEQ = name + "=";
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

const Login: React.FC<{ type?: string }> = ({ type = "login" }) => {
  const { t } = useTranslation();
  const { user, loginUser } = useLoginContext();
  const [searchParams, setSearchParams] = useSearchParams();
  const [token] = useState(
    searchParams.get("token") || getCookie("tokencillo"),
  );
  const { toggleShow } = useModalContext();

  const text = t(`btn.${type}`);

  const loginWithGitHub = () => {
    setTimeout(() => {
      toggleShow("serverLoader");
    }, 500);
    window.location.href = `${import.meta.env.VITE_BACK_URL}/auth/github`;
  };
  const loginWithGoogle = () => {
    setTimeout(() => {
      toggleShow("serverLoader");
    }, 500);
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
        const response = await axios.post(
          `${import.meta.env.VITE_BACK_URL}/user`,
          {
            token: token,
          },
        );
        loginUser(response.data);
        setCookie("tokencillo", token, 1);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
  };

  return (
    <>
      {!user && (
        <>
          <Button onClick={loginWithGitHub}>
            {text + " github"}
            <ArrowRightIcon size={20} color="#888" />
          </Button>
          <Button onClick={loginWithGoogle}>
            {text + " google"}
            <ArrowRightIcon size={20} color="#888" />
          </Button>

          <Modal
            id="serverLoader"
            closeOutside={false}
            header={t(`notification.serverLoaderTitle`)}
          >
            {t(`notification.serverLoader`)}
          </Modal>
        </>
      )}
    </>
  );
};
export default Login;
