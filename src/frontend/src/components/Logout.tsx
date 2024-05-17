import Button from "../ui/Button";
import { useLoginContext } from "../contexts/LoginProvider";

const Logout = () => {
  const { user, logoutUser } = useLoginContext();

  return <>{user && <Button onClick={logoutUser}>Sign out</Button>}</>;
};
export default Logout;
