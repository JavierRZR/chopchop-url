import { useTranslation } from "react-i18next";
import Login from "../components/Login";
import UrlInputField from "../components/UrlInputField";

const Home = () => {
  const { t } = useTranslation();

  return (
    <section className="flex flex-col items-center justify-center gap-14 p-5 text-center">
      <h1 className="text-pretty text-6xl font-bold">{t("home.title")}</h1>
      <p className="text-balance opacity-80 md:max-w-[70%] lg:max-w-[70%]">
        {t("home.description")}
      </p>
      <Login type="loginLong" />

      <UrlInputField />
    </section>
  );
};

export default Home;
