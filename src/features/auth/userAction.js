import axios from "../../Axios";
import {
  getUserListRequest,
  getUserListSucess,
  getUserListEror,
} from "./userListSlice";

const getAllUsers = () => (dispatch) => {
  dispatch(getUserListRequest());
  axios
    .get("user/getAll", {
      headers: {
        adminToken: JSON.parse(localStorage.getItem("auth_admin")),
      },
    })
    .then((result) => {
      console.log(result.data);
      dispatch(
        getUserListSucess({ userlist: result.data, loading: false, error: "" })
      );
    })
    .catch((err) => {
      //   if (err.response.status === 403) {
      //     //   console.log(err.response.data);
      //   }
      dispatch(
        getUserListEror({ userlist: [], loading: false, error: err.response })
      );
    });
};

export { getAllUsers };
