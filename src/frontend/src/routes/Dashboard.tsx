import { useTranslation } from "react-i18next";
import { useThemeContext } from "../contexts/ThemeProvider";
import { useLoginContext } from "../contexts/LoginProvider";
import useLinkStore from "../contexts/LinksStore";
import { LinkIcon } from "../assets/svg";
import Button from "../ui/Button";
import UrlCard from "../components/UrlCard";

const Dashboard = () => {
  const { theme } = useThemeContext();
  const { t } = useTranslation();
  const { user } = useLoginContext();
  const { links, add } = useLinkStore();

  //todo To uncomment, just testing and building actions.
  // if (!user) {
  //   window.location.href = "http://localhost:5173";
  // }

  return (
    <section className="flex w-full flex-col gap-5">
      <div className="flex flex-row justify-between">
        <h1 className="text-2xl font-bold">{t("dashboard.myLinks")}</h1>

        <Button
          className=""
          onClick={() => {
            add({
              _id: "2394781232433042134",
              userId: "2134234234123",
              fromUrl: "/javier-rzr-portfolios.vercel.app",
              toUrl: "https://javier-rzr-portfolios.vercel.app/",
              numClicks: 1,
              maxNumClicks: undefined,
              description:
                "Link que contiene el enlace a mi porfolio, el cual está alojado en vercel y creado con react.",
            });
          }}
        >
          {t("btn.createLink")}
          <LinkIcon size={20} color={theme == "dark" ? "#888" : "#111"} />
        </Button>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-10 lg:justify-start">
        {links &&
          links.map((link, index) => <UrlCard key={link._id} data={link} />)}
      </div>
    </section>
  );
};

export default Dashboard;
