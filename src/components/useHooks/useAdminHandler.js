import { useFormik } from "formik";
import * as Yup from "yup";

const useAdminHandler = () => {
  const formik = useFormik({
    initialValues: {
      fname: "",
      lname: "",
      pno: "",
      upimage: "",
      address: "",
    },
    validationSchema: Yup.object({
      fname: Yup.string().required("firstname is required"),
      lname: Yup.string().required("lastname is required"),
      pno: Yup.string()
        .required("phone number is required")
        .matches(/^7[123456789]\d{7}$/, "phone number is invalid"),
      address: Yup.string().required("address is required"),
      upimage: Yup.array()
        .required("please upload an image")
        .min(2, "minimum 2 images are required"),
    }),
    onSubmit: (values, { resetForm }) => {
      console.log("values", values);
    },
  });

  return { formik };
};

export default useAdminHandler;
