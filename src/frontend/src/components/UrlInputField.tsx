import { useTranslation } from "react-i18next";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { LinkIcon } from "../assets/svg";
import Button from "../ui/Button";
import { useThemeContext } from "../contexts/ThemeProvider";

const UrlInputField = () => {
  const { t } = useTranslation();
  const { theme } = useThemeContext();

  return (
    <>
      <div className="mt-12 flex w-[70%] max-w-[640px] flex-row">
        <input
          type="text"
          className="w-full rounded-s-md border  bg-transparent focus:border-neutral-300"
          placeholder="https://"
        />
        <Button
          className=" rounded-none rounded-e-md border-s-0 border-neutral-500"
          onClick={() => {
            toast.info(<h1>Hola</h1>, {
              position: "top-right",
              autoClose: 15000,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: theme,
            });
          }}
        >
          <LinkIcon size={20} color={theme == "dark" ? "#999" : "#333"} />
          {t("btn.short")}
        </Button>
      </div>
      <label className="-mt-12 w-[70%] max-w-[640px] text-start font-mono text-xs font-extralight opacity-50">
        {t("home.timeLimit")}
      </label>
    </>
  );
};
export default UrlInputField;
