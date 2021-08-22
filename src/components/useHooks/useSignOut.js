import { auth } from "../../Firebase";
import { useHistory } from "react-router-dom";

const useSignOut = () => {
  const history = useHistory();
  const logout = () => {
    auth
      .signOut()
      .then(() => {
        localStorage.removeItem("auth_admin");

        history.push("/");
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  return { logout };
};

export default useSignOut;
