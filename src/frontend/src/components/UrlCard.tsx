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
import axios from "axios";
import Modal from "../ui/Modal";
import FormCreateLink from "./FormCreateLink";
import useModalContext from "../contexts/ModalContext";

interface UrlCardProps {
  data: LinkType;
  simpleView?: boolean;
}

const UrlCard: React.FC<UrlCardProps> = ({ data, simpleView = false }) => {
  0;
  const {
    _id,
    // userId,
    fromUrl,
    toUrl,
    numClicks,
    maxNumClicks,
    password,
    description,
  } = data;

  const { t } = useTranslation();
  const { theme } = useThemeContext();
  const { toggleShow } = useModalContext();

  const { remove } = useLinkStore();

  const deleteLink = async () => {
    //Añadir el userId para seguridad
    await axios.delete(`${import.meta.env.VITE_BACK_URL}/links/${_id}`);
  };

  return (
    <>
      <article className="flex h-auto w-full flex-col gap-5 rounded-xl border border-neutral-300 p-5 dark:border-neutral-800">
        <header className="flex flex-row justify-between">
          <div className="flex w-full  flex-col gap-2 overflow-hidden truncate text-ellipsis text-start">
            <Link
              target="_blank"
              to={`${import.meta.env.VITE_FRONT_URL}/${fromUrl}`}
              className="flex w-auto flex-row items-center gap-2"
            >
              <h1 className="text-md inline max-w-[80%] truncate font-bold lg:text-xl dark:opacity-80">
                {fromUrl}{" "}
              </h1>
              <ExternalLinkIcon size={14} />
            </Link>

            <h2 className="lg:text-md dark: truncate text-ellipsis text-sm dark:opacity-60">
              {toUrl}
            </h2>
          </div>
          <div className="flex w-[40%] flex-row items-start justify-end gap-1 opacity-80">
            {/*Num clocks*/}
            {simpleView || (
              <IconButton className="font-mono text-sm hover:scale-100">
                <span className="">{numClicks}</span>
                {maxNumClicks && <span>/{maxNumClicks}</span>}
                <span className="ms-2"> {t("link.visited")}</span>
              </IconButton>
            )}
            {/*Candado pass*/}
            {password && !simpleView ? (
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
                duration={300}
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
                    <LockIcon size={18} />
                  </IconButton>
                </span>
              </Tippy>
            ) : (
              simpleView || (
                <Tippy
                  content={
                    <span className="block text-xs">
                      {t("link.noPassword")}
                    </span>
                  }
                  arrow={true}
                  animation={"shift-toward-subtle"}
                  duration={300}
                  delay={0}
                  className="rounded-xl p-1"
                >
                  <span>
                    <IconButton>
                      <LockOffIcon size={18} />
                    </IconButton>
                  </span>
                </Tippy>
              )
            )}
            <span className="border-s text-transparent opacity-10">I</span>
            {/*Copiar*/}
            <Tippy
              content={t("link.copy")}
              arrow={true}
              animation={"shift-toward-subtle"}
              duration={300}
              delay={0}
              className="rounded-xl p-1"
            >
              <span>
                <IconButton
                  className="font-mono text-sm hover:scale-100"
                  onClick={() => {
                    navigator.clipboard.writeText(
                      `${import.meta.env.VITE_FRONT_URL}/${fromUrl}`,
                    );
                  }}
                >
                  <CopyIcon size={18} />
                </IconButton>{" "}
              </span>
            </Tippy>
            {/*Modificar*/}
            {simpleView || (
              <Tippy
                content={t("link.modify")}
                arrow={true}
                animation={"shift-toward-subtle"}
                duration={300}
                delay={0}
                className="rounded-xl p-1"
              >
                <span>
                  <IconButton
                    className="font-mono text-sm hover:scale-100"
                    onClick={() => {
                      toggleShow(`modifyLink${_id}`);
                    }}
                  >
                    <SettingsIcon size={18} />
                  </IconButton>{" "}
                </span>
              </Tippy>
            )}
            {/*Borrar*/}
            {simpleView || (
              <Tippy
                content={t("link.delete")}
                arrow={true}
                animation={"shift-toward-subtle"}
                duration={300}
                delay={0}
                className="rounded-xl p-1"
              >
                <span>
                  <IconButton
                    className="font-mono text-sm hover:scale-100"
                    onClick={() => {
                      deleteLink();
                      remove(_id);
                    }}
                  >
                    <DeleteIcon size={18} />
                  </IconButton>
                </span>
              </Tippy>
            )}
          </div>
        </header>
        <p className="text-sm dark:opacity-60">{description}</p>
      </article>
      <Modal
        id={`modifyLink${_id}`}
        closeOutside={false}
        header={t("forms.createLink.modifyHeader")}
      >
        <FormCreateLink initData={data} type="modify" />
      </Modal>
    </>
  );
};
export default UrlCard;
