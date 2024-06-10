import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Modal from "../ui/Modal";
import { useTranslation } from "react-i18next";
import useModalContext from "../contexts/ModalContext";
import FormPasswordNavigation from "../components/FormPasswordNavigation";

const Navigate = () => {
  const { t } = useTranslation();
  const { fromUrl } = useParams();
  const { toggleShow } = useModalContext();

  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [toUrl, setToUrl] = useState("");

  useEffect(() => {
    const fetchUrlData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACK_URL}/${fromUrl}`,
        );

        console.log(response.data);

        if (response.data.password) {
          setPassword(response.data.password || "");
          setToUrl(response.data.toUrl);
          toggleShow("navigatePassword");
        }
        if (!response.data.password) window.location.href = response.data.toUrl;
      } catch (error: any) {
        const code = error.response.data.code;
        setError(code + ": " + t(`errors.${code}`));
      }
    };
    fetchUrlData();
  }, [fromUrl]);

  const navigateAfterPass = () => {
    window.location.href = toUrl;
  };

  return (
    <section className="flex flex-col items-center justify-center gap-14 p-5 text-center">
      {!error && <h1>password : {password}</h1>}
      {error && <h1 className="text-2xl">{error}</h1>}
      <Modal
        id="navigatePassword"
        closable={false}
        closeOutside={false}
        header={t("forms.passwordNavigate.header")}
        subHeader={t("forms.passwordNavigate.subheader")}
      >
        <FormPasswordNavigation
          fromUrl={fromUrl || ""}
          actionAfterValidate={navigateAfterPass}
        />
      </Modal>
    </section>
  );
};
export default Navigate;
