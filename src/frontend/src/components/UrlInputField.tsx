import { useTranslation } from "react-i18next";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { LinkIcon } from "../assets/svg";
import Button from "../ui/Button";
import { useThemeContext } from "../contexts/ThemeProvider";
import axios from "axios";
import { useState } from "react";
import { useLoginContext } from "../contexts/LoginProvider";
import UrlCard from "./UrlCard";

const URL_REGEX: RegExp =
  /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(\/[a-zA-Z0-9-._~:?#@!$&'()*+,;=]*)?$/;

const UrlInputField = () => {
  const { t } = useTranslation();
  const { theme } = useThemeContext();
  const { user } = useLoginContext();

  const [urlValue, setUrlValue] = useState("");
  const [disableURL, setDisableURl] = useState(true);

  const [lastChopped, setLastChopped] = useState(null);

  const addBasicLink = async () => {
    let newLink = {
      userId: user?.id || null,
      toUrl: urlValue,
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACK_URL}/createBasicLink`,
        newLink,
      );
      setLastChopped(response.data.newLink);
      toast.info(<span>{t("notification.successLinkCreate")}</span>, {
        autoClose: 1000,
        theme: theme,
      });
    } catch (error: any) {
      toast.error(
        <span>
          <div>{t(`errors.${error.response?.data?.code}`)}</div>
        </span>,
        {
          autoClose: 3000,
          theme: theme,
        },
      );
    }
  };

  return (
    <>
      <div className="mt-12 flex w-[70%] max-w-[640px] flex-row">
        <input
          type="text"
          className="w-full rounded-s-md border  bg-transparent focus:border-neutral-300"
          placeholder="https://"
          value={urlValue}
          onChange={(event) => {
            if (URL_REGEX.test(urlValue)) {
              setDisableURl(false);
            } else if (!disableURL) {
              setDisableURl(true);
            }
            setUrlValue(event.target.value);
          }}
        />
        <Button
          type="secondary"
          className={`rounded-none rounded-e-md border-s-0 border-neutral-500`}
          disabled={disableURL}
          onClick={() => {
            if (disableURL) return;
            addBasicLink();
          }}
        >
          <LinkIcon size={20} />
          {t("btn.short")}
        </Button>
      </div>
      <label className="-mt-12 w-[70%] max-w-[640px] text-start font-mono text-xs font-extralight opacity-50">
        {t("home.timeLimit")}
      </label>
      {lastChopped && (
        <section className="max-w-[400px]">
          <UrlCard data={lastChopped} simpleView={true} />
        </section>
      )}
    </>
  );
};
export default UrlInputField;
