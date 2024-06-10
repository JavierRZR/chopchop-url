import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { toast } from "react-toastify";
import { LinkIcon, RandomIcon } from "../assets/svg";
import InputField from "../ui/InputField";
import Button from "../ui/Button";
import { useThemeContext } from "../contexts/ThemeProvider";
import { useLoginContext } from "../contexts/LoginProvider";
import uuid from "react-uuid";
import { LinkType } from "../types/types";
import useModalContext from "../contexts/ModalContext";
import useLinkStore from "../contexts/LinksStore";

const FORM_TYPE = {
  CREATE: "create",
  MODIFY: "modify",
};

const FormCreateLink: React.FC<{
  initData?: LinkType;
  type?: "create" | "modify";
}> = ({ initData, type = FORM_TYPE.CREATE }) => {
  const { t } = useTranslation();
  const { theme } = useThemeContext();
  const { user } = useLoginContext();
  const { add, modify } = useLinkStore();
  const { toggleShow } = useModalContext();

  const [toUrlValue, setToUrlValue] = useState(initData?.toUrl || "");
  const [fromUrlValue, setFromUrlValue] = useState(initData?.fromUrl || uuid());
  const [descriptionValue, setDescriptionValue] = useState(
    initData?.description || "",
  );
  const [passwordValue, setPasswordValue] = useState(initData?.password || "");
  const [maxNumClicksValue, setMaxNumClicksValue] = useState(
    initData?.maxNumClicks || "",
  );
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data: any) => {
    type == FORM_TYPE.CREATE ? createLink(data) : modifyLink(data);
  };

  const createLink = async (data: any) => {
    try {
      await axios.post(`${import.meta.env.VITE_BACK_URL}/createCompleteLink`, {
        ...data,
        userId: user?.id,
      });
      afterLinkAction();
      add(data);
      toast.info(<span>{t("notification.successLinkCreate")}</span>, {
        autoClose: 1000,
        theme: theme,
      });
    } catch (error: any) {
      toast.error(
        <span>
          {/* {t("notification.error")} */}
          <div>{t(`errors.${error.response?.data?.code}`)}</div>
        </span>,
        {
          autoClose: 3000,
          theme: theme,
        },
      );
    }
  };

  const modifyLink = async (data: any) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_BACK_URL}/links/${initData?._id}`,
        {
          ...data,
          userId: user?.id,
        },
      );
      afterLinkAction();
      modify(initData?._id || "", data);
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

  const afterLinkAction = () => {
    toggleShow(
      type == FORM_TYPE.CREATE ? `create` : `modifyLink${initData?._id}`,
    );
  };
  return (
    <form className="flex flex-col justify-center gap-5">
      {/* to url */}
      <InputField>
        <label className="text-sm font-semibold opacity-80">
          {t("forms.createLink.toUrl") + " *"}
        </label>
        <input
          type="text"
          placeholder="https://"
          value={toUrlValue}
          {...register("toUrl", {
            required: true,
            pattern:
              /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+(\.[a-zA-Z]{2,})(\/[a-zA-Z0-9-._~:?#@!$&'()*+,;=]*)*\/?$/,
            onChange: (e) => setToUrlValue(e.target.value),
          })}
          className="w-full rounded-md border-2 border-neutral-400 bg-neutral-100 text-sm focus:border-neutral-400  dark:border-neutral-700 dark:bg-neutral-900"
        />
        <span className="text-xs font-bold text-red-700 opacity-80">
          {errors?.toUrl && t("forms.createLink.errorToUrl")}
        </span>
      </InputField>
      {/* from url */}
      <InputField>
        <label className="text-sm font-semibold opacity-80">
          {t("forms.createLink.fromUrl") + " *"}
        </label>
        <div className="flex w-full flex-row items-center justify-between">
          <input
            type="text"
            value={fromUrlValue}
            placeholder="/yourUrl"
            {...register("fromUrl", {
              required: true,
              maxLength: 50,
              // pattern: /^\W*(?:[a-zA-Z0-9-]{6,}\W*)$/,
              validate: (value) => /^\W*(?:[a-zA-Z0-9-]{6,}\W*)$/.test(value),
              onChange(event) {
                setFromUrlValue(event.target.value);
              },
            })}
            className="w-full rounded-s-md  border-2 border-neutral-400 bg-neutral-100 text-sm focus:border-neutral-400  dark:border-neutral-700 dark:bg-neutral-900"
          />
          <Button
            type="secondary"
            className=" rounded-none rounded-e-md border-s-0 text-sm"
            onClick={() => {
              setFromUrlValue(uuid());
            }}
          >
            {t("forms.createLink.random")}
            <RandomIcon size={18} />
          </Button>
        </div>
        <span className="text-xs font-bold text-red-700 opacity-80">
          {errors?.fromUrl && t("forms.createLink.errorFromUrl")}
        </span>
      </InputField>

      {/* description */}
      <InputField>
        <label className="text-sm font-semibold opacity-80">
          {t("forms.createLink.description")}
          <span className="text-xs font-thin">{` (${t("forms.createLink.optional")})`}</span>
        </label>
        <textarea
          value={descriptionValue}
          {...register("description", {
            required: false,
            maxLength: 300,
            onChange: (e) => setDescriptionValue(e.target.value),
          })}
          className="max-h-40 w-full rounded-md border-2 border-neutral-400 bg-neutral-100 text-sm focus:border-neutral-400  dark:border-neutral-700 dark:bg-neutral-900"
        />
        <span className="text-xs font-bold text-red-700 opacity-80">
          {errors?.description &&
            watch("description").length +
              t("forms.createLink.errorDescription")}
        </span>
      </InputField>
      <div className="flex flex-row gap-5">
        {/* password */}
        <InputField>
          <label className="text-sm font-semibold opacity-80">
            {t("forms.createLink.password")}
            <span className="text-xs font-thin">{` (${t("forms.createLink.optional")})`}</span>
          </label>
          <input
            type="password"
            value={passwordValue}
            {...register("password", {
              required: false,
              minLength: 4,
              onChange: (e) => setPasswordValue(e.target.value),
            })}
            className="max-h-40 w-full rounded-md border-2 border-neutral-400 bg-neutral-100 text-sm focus:border-neutral-400  dark:border-neutral-700 dark:bg-neutral-900"
          />
          <span className="text-xs font-bold text-red-700 opacity-80">
            {errors?.password && t("forms.createLink.errorPassword")}
          </span>
        </InputField>
        {/* maxNumClicks */}
        <InputField>
          <label className="text-sm font-semibold opacity-80">
            {t("forms.createLink.maxNumClicks")}
            <span className="text-xs font-thin">{` (${t("forms.createLink.optional")})`}</span>
          </label>
          <input
            type="number"
            value={maxNumClicksValue}
            {...register("maxNumClicks", {
              required: false,
              onChange: (e) => setMaxNumClicksValue(e.target.value),
            })}
            className="max-h-40 w-full rounded-md border-2 border-neutral-400 bg-neutral-100 text-sm focus:border-neutral-400  dark:border-neutral-700 dark:bg-neutral-900"
          />
          <span className="text-xs font-bold text-red-700 opacity-80">
            {errors?.maxNumClicks && t("forms.createLink.errorMaxNumClicks")}
          </span>
        </InputField>
      </div>

      <Button
        className="my-5 flex w-full flex-row self-center lg:w-[50%]"
        onClick={handleSubmit(onSubmit)}
      >
        <span className="">
          {type == FORM_TYPE.CREATE ? t("btn.createLink") : t("btn.modifyLink")}
        </span>
        <LinkIcon size={22} />
      </Button>
    </form>
  );
};

export default FormCreateLink;
