import { db } from "../../Firebase";
import {
  addEntryFailure,
  addEntryRequest,
  addEntrySuccess,
} from "./AdminSlice";
import {
  getEntryFailure,
  getEntryRequest,
  getEntrySuccess,
} from "./AdminEntrySlice.js";
let unsub;
const addEntry = (data) => (dispatch) => {
  try {
    dispatch(addEntryRequest());
    db.collection("entries")
      .add(data)
      .then((res) => {
        dispatch(
          addEntrySuccess({ loading: false, error: null, entryData: data })
        );
      })
      .catch((err) => {
        dispatch(
          addEntryFailure({ loading: false, error: err, entryData: null })
        );
      });
  } catch (err) {
    dispatch(addEntryFailure({ loading: false, error: err, entryData: null }));
  }
};

const getEntry = (uid) => (dispatch) => {
  try {
    dispatch(getEntryRequest());
    const unsubscribe = db
      .collection("entries")
      .where("uid", "==", uid)
      .onSnapshot(async (snapshot) => {
        const tempData = await snapshot.docs.map((doc) => ({
          id: doc.id,
          entry: doc.data(),
        }));
        // console.log("tempData", tempData);
        dispatch(
          getEntrySuccess({ loading: false, error: null, entryDatas: tempData })
        );
      });
    return unsubscribe;
  } catch (err) {
    dispatch(getEntryFailure({ loading: false, error: err, entryDatas: [] }));
  }
};

export { addEntry, getEntry };
