import React, { useEffect } from "react";
import { Table } from "react-bootstrap";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { selectEntryDatas } from "../../features/admin/AdminEntrySlice";
import { getEntry } from "../../features/admin/AdminEntryAction";
import { selectUid } from "../../features/auth/UserSlice";
import { db } from "../../Firebase";
import { useLocation } from "react-router-dom";
import { RiDeleteBin2Fill, RiEditCircleFill } from "react-icons/all";
const AdminEntryList = () => {
  const dispatch = useDispatch();
  const userId = useSelector(selectUid);
  const entryDatas = useSelector(selectEntryDatas);
  const location = useLocation();

  useEffect(() => {
    console.log("on route change", location.pathname);
  }, [location]);
  useEffect(() => {
    const sub = dispatch(getEntry(userId));
    return () => {
      if (sub) {
        console.log("tttt");
        sub();
      }
    };
  }, [userId, dispatch, location.pathname]);

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
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th className="head-profile">Profiles</th>
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
              <td className="d-flex img-data">
                {entry.imageArr.map((image) => (
                  <img src={image} alt="profile" className="small-img" />
                ))}
              </td>
              <td>{entry.firstname}</td>
              <td>{entry.lastname}</td>
              <td>{entry.address}</td>
              <td>{entry.phoneNo}</td>
              <td>
                <button
                  className="btn btn-danger btn-sm spn-del"
                  onClick={() => {
                    deleteEntry(id);
                  }}
                >
                  Delete
                </button>
                <span
                  className="icon-mob"
                  onClick={() => {
                    deleteEntry(id);
                  }}
                >
                  <RiDeleteBin2Fill
                    style={{ color: "red", cursor: "pointer" }}
                  />
                </span>
              </td>
              <td>
                <button className="btn btn-success btn-sm spn-edit">
                  Edit
                </button>
                <span className="icon-mob">
                  <RiDeleteBin2Fill
                    style={{ color: "green", cursor: "pointer" }}
                  />
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </AdminEntry>
  );
};

const AdminEntry = styled.div`
  .icon-mob {
    display: none;
  }
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  width: 100%;
  .img-data {
    flex-wrap: wrap;
  }
  .small-img {
    flex: 1 1;
    margin: 4px;
    width: 70px;
    height: fit-content;
  }
  @media only screen and (max-width: 980px) {
    padding: 0.5rem 0.8rem;
    .small-img {
      flex: 1 1;
      margin: 4px;
      width: 50px;
      height: fit-content;
    }
    th,
    td {
      font-size: 0.8rem;
    }
  }
  @media only screen and (max-width: 560px) {
    width: 100vw;
    .img-data {
      display: none !important;
    }
    .head-profile {
      display: none;
    }
  }
  @media only screen and (max-width: 480px) {
    width: 100vw;
    .spn-edit {
      display: none;
    }
    .spn-del {
      display: none;
    }
    .icon-mob {
      display: block;
    }
    th,
    td {
      font-size: 0.6rem;
    }
  }
`;
export default React.memo(AdminEntryList);
