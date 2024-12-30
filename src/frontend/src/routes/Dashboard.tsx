import { useEffect } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { useLoginContext } from "../contexts/LoginProvider";
import useLinkStore from "../contexts/LinksStore";
import { LinkIcon } from "../assets/svg";
import UrlCard from "../components/UrlCard";
import Button from "../ui/Button";
import useModalContext from "../contexts/ModalContext";
import Modal from "../ui/Modal";
import FormCreateLink from "../components/FormCreateLink";

const Dashboard = () => {
  const { t } = useTranslation();
  const { user } = useLoginContext();
  const { links, setInitialLinks } = useLinkStore();
  const { toggleShow } = useModalContext();

  if (!user) {
    window.location.href = `${import.meta.env.VITE_FRONT_URL}`;
  }

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACK_URL}/getUserLinks/${user?.id}`)
      .then((response) => {
        setInitialLinks(response.data.links);
      });
  }, [user, setInitialLinks]);

  return (
    <section className="flex w-full flex-col gap-5">
      <div className="flex flex-row justify-between">
        <h1 className="text-2xl font-bold">{t("dashboard.myLinks")}</h1>

        <Button
          className=""
          onClick={() => {
            toggleShow("dashboard");
          }}
        >
          {t("btn.createLink")}
          <LinkIcon size={20} />
        </Button>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-10 lg:justify-start">
        {links && links.map((link) => <UrlCard key={link._id} data={link} />)}
      </div>

      {/* Modal to create urls */}
      <Modal
        id="dashboard"
        closeOutside={false}
        header={t("forms.createLink.header")}
      >
        <FormCreateLink />
      </Modal>
    </section>
  );
};

export default Dashboard;
