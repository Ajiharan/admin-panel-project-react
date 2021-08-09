import axios from "../../Axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import toast from "react-hot-toast";
import { useHistory } from "react-router";
import useSignOut from "./useSignOut";
const useFormValidator = () => {
  const [loading, setLoading] = useState(false);
  const { logout } = useSignOut();
  const history = useHistory();
  const Formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("email address is required")
        .email("invalid email address"),
      password: Yup.string().required("password is required"),
    }),
    onSubmit: (values, { resetForm }) => {
      setLoading(true);

      addUser(values, resetForm);
    },
  });

  const addUser = (values, func) => {
    setTimeout(() => {
      axios
        .post("/user/add", values, {
          headers: {
            adminToken: JSON.parse(localStorage.getItem("auth_admin")),
          },
        })
        .then((res) => {
          setLoading(false);
          func();
          toast.success("user sucessfully added");
        })
        .catch((err) => {
          setLoading(false);
          func();
          toast.error(err.response.data);
          if (err.response.status === 403) {
            logout();
          }
        });
    }, 2000);
  };

  return { Formik, loading };
};

export default useFormValidator;
