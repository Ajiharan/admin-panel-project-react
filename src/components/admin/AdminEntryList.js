import React, { useEffect } from "react";
import { Table } from "react-bootstrap";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { selectEntryDatas } from "../../features/admin/AdminEntrySlice";
import { getEntry } from "../../features/admin/AdminEntryAction";
import { selectUid } from "../../features/auth/UserSlice";
import { db } from "../../Firebase";
const AdminEntryList = () => {
  const dispatch = useDispatch();
  const userId = useSelector(selectUid);
  const entryDatas = useSelector(selectEntryDatas);

  useEffect(() => {
    const sub = dispatch(getEntry(userId));
    return () => {
      if (sub) {
        console.log("tttt");
        sub();
      }
    };
  }, [userId]);

  const deleteEntry = (id) => {
    db.collection("entries")
      .doc(id)
      .delete()
      .then((r) => {
        console.log("deleted");
      })
      .catch((er) => {
        console.log("er", er);
      });
  };
  return (
    <AdminEntry>
      <Table striped bordered hover variant="dark" responsive>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Address</th>
            <th>Phone no</th>
            <th>Delete</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {entryDatas.map(({ id, entry }) => (
            <tr key={id}>
              <td>{entry.firstname}</td>
              <td>{entry.lastname}</td>
              <td>{entry.address}</td>
              <td>{entry.phoneNo}</td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => {
                    deleteEntry(id);
                  }}
                >
                  Delete
                </button>
              </td>
              <td>
                <button className="btn btn-success">Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </AdminEntry>
  );
};

const AdminEntry = styled.div`
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  width: 100%;
`;
export default AdminEntryList;
