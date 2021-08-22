import { db } from "../../Firebase";
import {
  addEntryFailure,
  addEntryRequest,
  addEntrySuccess,
  updateEntryFailure,
  updateEntryRequest,
  updateEntrySuccess,
} from "./AdminSlice";
import {
  getEntryFailure,
  getEntryRequest,
  getEntrySuccess,
} from "./AdminEntrySlice.js";

const addEntry = (data) => (dispatch) => {
  // console.log("data", data);
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
        // console.log(err);
        dispatch(
          addEntryFailure({ loading: false, error: err, entryData: null })
        );
      });
  } catch (err) {
    // console.log(err);
    dispatch(addEntryFailure({ loading: false, error: err, entryData: null }));
  }
};
const updateEntry = (data, doc_id) => (dispatch) => {
  // console.log("data", data, doc_id);
  try {
    dispatch(updateEntryRequest());
    db.collection("entries")
      .doc(doc_id)
      .update(data)
      .then((res) => {
        dispatch(
          updateEntrySuccess({ loading: false, error: null, entryData: data })
        );
      })
      .catch((err) => {
        console.log(err);
        dispatch(
          updateEntryFailure({ loading: false, error: err, entryData: null })
        );
      });
  } catch (err) {
    // console.log(err);
    dispatch(
      updateEntryFailure({ loading: false, error: err, entryData: null })
    );
  }
};

const getEntry = (uid, userlevel) => (dispatch) => {
  try {
    dispatch(getEntryRequest());
    if (userlevel) {
      const unsubscribe = db
        .collection("entries")
        .onSnapshot(async (snapshot) => {
          const tempData = await snapshot.docs.map((doc) => ({
            id: doc.id,
            entry: doc.data(),
          }));
          console.log("tempData", tempData);
          dispatch(
            getEntrySuccess({
              loading: false,
              error: null,
              entryDatas: tempData,
            })
          );
        });
      return unsubscribe;
    } else {
      const unsubscribe = db
        .collection("entries")
        .where("uid", "==", uid)
        .onSnapshot(async (snapshot) => {
          const tempData = await snapshot.docs.map((doc) => ({
            id: doc.id,
            entry: doc.data(),
          }));
          console.log("tempData", tempData);
          dispatch(
            getEntrySuccess({
              loading: false,
              error: null,
              entryDatas: tempData,
            })
          );
        });
      return unsubscribe;
    }
  } catch (err) {
    dispatch(getEntryFailure({ loading: false, error: err, entryDatas: [] }));
  }
};

export { addEntry, getEntry, updateEntry };
