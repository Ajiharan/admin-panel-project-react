import axios from "../../Axios";
import { db } from "../../Firebase";
import {
  getUserListRequest,
  getUserListSucess,
  getUserListEror,
} from "./userListSlice";
import {
  getUserIdsEror,
  getUserIdsRequest,
  getUserIdsSucess,
} from "./userOnlineList";

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

const getAllUsersIds = () => async (dispatch) => {
  dispatch(getUserIdsRequest());
  try {
    db.collection("status")
      .where("state", "==", "online")
      .onSnapshot(async function (snapshot) {
        let arr = [];
        await snapshot.docChanges().forEach(function (change) {
          if (change.type === "added") {
            var msg = "User " + change.doc.id + " is online.";
            console.log(msg);
            // ...
            arr.push(change.doc.id);
          }
          if (change.type === "removed") {
            var msg = "User " + change.doc.id + " is offline.";
            console.log(msg);
            // ...
          }
        });
        dispatch(
          getUserIdsSucess({ userUids: arr, loading: false, error: "" })
        );
      });
  } catch (err) {
    dispatch(getUserIdsEror({ userUids: [], loading: false, error: err }));
  }
};

export { getAllUsers, getAllUsersIds };
