import { auth } from "../../Firebase";
import { useDispatch } from "react-redux";
import { setSignOut } from "../../features/auth/UserSlice";
import { useHistory } from "react-router-dom";
import { setUserListDefault } from "../../features/auth/userListSlice";

const useSignOut = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const logout = () => {
    auth
      .signOut()
      .then(() => {
        localStorage.removeItem("auth_admin");
        dispatch(
          setSignOut({
            name: null,
            email: null,
            photo: null,
            isEmailVerified: null,
            uid: null,
          })
        );
        dispatch(setUserListDefault());
        history.push("/");
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  return { logout };
};

export default useSignOut;
