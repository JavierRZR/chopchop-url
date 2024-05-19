import { Link } from "react-router-dom";
import Tippy from "@tippyjs/react";
import {
  CopyIcon,
  DeleteIcon,
  ExternalLinkIcon,
  LockIcon,
  LockOffIcon,
  SettingsIcon,
} from "../assets/svg";
import { LinkType } from "../types/types";
import IconButton from "../ui/IconButton";
import { toast } from "react-toastify";
import { useThemeContext } from "../contexts/ThemeProvider";
import useLinkStore from "../contexts/LinksStore";
import { useTranslation } from "react-i18next";

interface UrlCardProps {
  data: LinkType;
}

const UrlCard: React.FC<UrlCardProps> = ({ data }) => {
  0;
  const {
    _id,
    userId,
    fromUrl,
    toUrl,
    numClicks,
    maxNumClicks,
    password,
    description,
  } = data;

  const { theme } = useThemeContext();
  const { t } = useTranslation();

  const { remove } = useLinkStore();

  return (
    <article className="flex h-auto w-full flex-col gap-5 rounded-xl border border-neutral-300 p-5 dark:border-neutral-800">
      <header className="flex flex-row justify-between">
        <div className="flex w-full  flex-col gap-2 overflow-hidden truncate text-ellipsis">
          <Link
            to={"//todo"}
            className="flex w-auto flex-row items-center gap-2"
          >
            <h1 className="inline max-w-[80%] truncate text-xl font-bold dark:opacity-80">
              {fromUrl}{" "}
            </h1>
            <ExternalLinkIcon size={14} />
          </Link>

          <h2 className="text-md dark: truncate text-ellipsis dark:opacity-60">
            {toUrl}
          </h2>
        </div>
        <div className="flex w-[40%] flex-row items-start justify-end gap-1 opacity-80">
          {/*Num clocks*/}
          <IconButton className="font-mono text-sm hover:scale-100">
            <span className="">{numClicks}</span>
            {maxNumClicks && <span>/{maxNumClicks}</span>}
            <span className="ms-2"> {t("link.visited")}</span>
          </IconButton>
          {/*Candado pass*/}
          {password ? (
            <Tippy
              content={
                <div className="flex flex-col gap-2 text-neutral-100/70">
                  <span className="flex flex-row gap-2 font-bold">
                    <CopyIcon size={18} />
                    {password}
                  </span>
                  <span className="block text-xs">
                    {t("link.copyPassword")}
                  </span>
                </div>
              }
              arrow={true}
              animation={"shift-toward-subtle"}
              duration={1000}
              delay={0}
              className="rounded-xl p-1"
            >
              <span>
                <IconButton
                  onClick={() => {
                    navigator.clipboard.writeText(password);
                    toast.info(<span>{t("notification.copiedToCB")}</span>, {
                      position: "top-right",
                      autoClose: 2000,
                      hideProgressBar: true,
                      closeOnClick: true,
                      pauseOnHover: false,
                      draggable: true,
                      progress: undefined,
                      theme: theme,
                    });
                  }}
                >
                  <LockIcon
                    size={18}
                    color={theme == "dark" ? "#f5f5f5" : "#111"}
                  />
                </IconButton>
              </span>
            </Tippy>
          ) : (
            <Tippy
              content={
                <span className="block text-xs">{t("link.noPassword")}</span>
              }
              arrow={true}
              animation={"shift-toward-subtle"}
              duration={1000}
              delay={0}
              className="rounded-xl p-1"
            >
              <span>
                <IconButton>
                  <LockOffIcon
                    size={18}
                    color={theme == "dark" ? "#f5f5f5" : "#111"}
                  />
                </IconButton>
              </span>
            </Tippy>
          )}
          <span className="border-s text-transparent opacity-10">I</span>
          {/*Modificar*/}
          <IconButton
            className="font-mono text-sm hover:scale-100"
            onClick={() => {
              //todo modificación
            }}
          >
            <SettingsIcon
              size={18}
              color={theme == "dark" ? "#f5f5f5" : "#111"}
            />
          </IconButton>{" "}
          {/*Borrar*/}
          <IconButton
            className="font-mono text-sm hover:scale-100"
            onClick={() => {
              //todo eliminación
              remove(_id);
            }}
          >
            <DeleteIcon
              size={18}
              color={theme == "dark" ? "#f5f5f5" : "#111"}
            />
          </IconButton>
        </div>
      </header>
      <p className="text-sm dark:opacity-60">{description}</p>
    </article>
  );
};
export default UrlCard;
