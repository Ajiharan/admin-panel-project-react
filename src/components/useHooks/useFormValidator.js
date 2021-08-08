import axios from "../../Axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import toast from "react-hot-toast";
const useFormValidator = () => {
  const [loading, setLoading] = useState(false);
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
    axios
      .post("/user/add", values, {
        headers: {
          adminToken: JSON.parse(localStorage.getItem("auth_admin")),
        },
      })
      .then((res) => {
        func();
        toast.success("user sucessfully added");
      })
      .catch((err) => {
        func();
        toast.error(err.response.data);
      });
  };

  return { Formik, loading };
};

export default useFormValidator;
