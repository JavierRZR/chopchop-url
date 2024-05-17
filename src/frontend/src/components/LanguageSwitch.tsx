import { useTranslation } from "react-i18next";
import IconButton from "../ui/IconButton";

const LanguageSwitch = () => {
  const { i18n } = useTranslation();

  return (
    <>
      {/* {
        <IconButton
          onClick={() => {
            i18n.changeLanguage(i18n.language == "es" ? "en" : "es");
          }}
        >
          <span className="text-2xl font-normal p-1">
            {t(`languages.${i18n.language}Short`)}
          </span>
        </IconButton>
      } */}
      <IconButton>
        <label className="inline-flex cursor-pointer items-center">
          <input
            type="checkbox"
            value=""
            className="peer sr-only"
            checked={i18n.language != "es" && i18n.language != "es-ES"}
            onChange={() =>
              i18n.changeLanguage(i18n.language == "es" ? "en" : "es")
            }
          />
          <div
            className="peer relative h-6 w-11 rounded-full 
          bg-[url('es.svg')] duration-100 
          after:absolute after:start-[0px] after:top-[0px] after:h-6 
          after:w-6 after:rounded-full 
           after:border after:bg-neutral-300 after:transition-all after:content-[''] 
          peer-checked:bg-[url('en.svg')]
           peer-checked:after:translate-x-full peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-neutral-100 rtl:peer-checked:after:-translate-x-full 
           dark:bg-[url('es.svg')]
         dark:peer-focus:ring-neutral-900"
          ></div>
        </label>
      </IconButton>
    </>
  );
};

export default LanguageSwitch;
