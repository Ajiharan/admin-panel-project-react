import { db } from "../../Firebase";
import {
  addEntryFailure,
  addEntryRequest,
  addEntrySuccess,
} from "./AdminSlice";

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

export { addEntry };
