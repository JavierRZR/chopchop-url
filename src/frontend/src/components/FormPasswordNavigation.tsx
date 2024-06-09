import { useForm } from "react-hook-form";
import InputField from "../ui/InputField";
import { useTranslation } from "react-i18next";
import Button from "../ui/Button";
import axios from "axios";
import { toast } from "react-toastify";
import { useThemeContext } from "../contexts/ThemeProvider";

const FormPasswordNavigation: React.FC<{
  actionAfterValidate: Function;
  fromUrl: string;
}> = ({ actionAfterValidate, fromUrl }) => {
  const { t } = useTranslation();
  const { theme } = useThemeContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data: any) => {
    console.log(data);

    try {
      const response = await axios.post("http://localhost:5000/authorizeUrl", {
        fromUrl: fromUrl,
        password: data.password,
      });
      toast.info(<span>{t("notification.successLinkCreate")}</span>, {
        autoClose: 1000,
        theme: theme,
      });
      actionAfterValidate();
    } catch (error: any) {
      toast.error(
        <span>
          {/* {t("notification.error")} */}
          <div>{t(`errors.${error.response?.data?.code}`)}</div>
        </span>,
        {
          autoClose: 2000,
          theme: theme,
        },
      );
    }
  };

  return (
    <>
      <form
        className="flex flex-col justify-center gap-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* password */}
        <InputField>
          <input
            type="password"
            {...register("password", {
              required: true,
            })}
            className="max-h-40 w-full rounded-md border-2 border-neutral-400 bg-neutral-100 text-sm focus:border-neutral-400  dark:border-neutral-700 dark:bg-neutral-900"
          />
          <span className="text-xs font-bold text-red-700 opacity-80">
            {errors?.password && t("forms.createLink.errorPassword")}
          </span>
        </InputField>

        <Button
          className=" flex w-full flex-row self-center lg:w-[50%]"
          onClick={handleSubmit(onSubmit)}
        >
          <span className="">{t("btn.send")}</span>
        </Button>
      </form>
    </>
  );
};
export default FormPasswordNavigation;
