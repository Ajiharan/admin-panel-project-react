import { useFormik } from "formik";
import * as Yup from "yup";
import { auth } from "../../Firebase";
const useFormValidator = () => {
  const formik = useFormik({
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
      console.log("values", values);
    },
  });

  return { formik };
};

export default useFormValidator;
