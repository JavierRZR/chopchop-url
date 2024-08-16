import { useTranslation } from "react-i18next";
import { ProfileIcon } from "../assets/svg";
import { useLoginContext } from "../contexts/LoginProvider";
import IconButton from "../ui/IconButton";
import { Dropdown } from "flowbite-react";
import { Link } from "react-router-dom";

const Profile = () => {
  const { t } = useTranslation();
  const { user, logoutUser } = useLoginContext();

  const profileImage = () => {
    return user?.avatarUrl && user.avatarUrl != "" ? (
      <img className="size-10 rounded-full" src={user.avatarUrl} />
    ) : (
      <ProfileIcon color="#999" size={30} />
    );
  };

  return (
    <>
      {user && (
        <IconButton scale={false}>
          <Dropdown
            color={"transparent"}
            label={profileImage()}
            dismissOnClick={false}
            arrowIcon={false}
          >
            <Dropdown.Item className="border border-e-0 border-s-0 border-t-0  border-neutral-200 bg-transparent hover:cursor-default hover:bg-transparent  focus:bg-transparent  dark:border-neutral-600 dark:bg-transparent dark:hover:cursor-default dark:hover:bg-transparent">
              {user.name}
            </Dropdown.Item>
            <Dropdown.Item>
              <Link to={`${import.meta.env.VITE_FRONT_URL}/links`}>
                {t("btn.dashboardLinks")}
              </Link>
            </Dropdown.Item>
            <Dropdown.Item onClick={logoutUser}>
              {t("btn.logout")}
            </Dropdown.Item>
          </Dropdown>
        </IconButton>
      )}
    </>
  );
};

export default Profile;
