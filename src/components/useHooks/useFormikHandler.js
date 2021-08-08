import { useFormik } from "formik";
import * as Yup from "yup";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { db } from "../../Firebase";
const useFormikHandler = (setLoading, toast, auth, setUserLoginDetails) => {
  const dispatch = useDispatch();
  const userDispatch = useCallback(
    (payload, isError = false, func, userlevel) => {
      setLoading(false);
      func();
      if (isError) {
        dispatch(
          setUserLoginDetails({
            name: null,
            email: null,
            photo: null,
            isEmailVerified: false,
            userlevel: userlevel,
            uid: null,
          })
        );
      } else {
        const { displayName, photoURL, emailVerified, email, uid } = payload;
        dispatch(
          setUserLoginDetails({
            name: displayName,
            email: email,
            photo: photoURL,
            isEmailVerified: emailVerified,
            userlevel: userlevel,
            uid: uid,
          })
        );
      }
    },
    [dispatch, setLoading, setUserLoginDetails]
  );

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
      setLoading(true);
      // console.log(values);
      const { email, password } = values;
      setTimeout(() => {
        auth
          .signInWithEmailAndPassword(email, password)
          .then((result) => {
            checkAdmin(result.user, resetForm);
          })
          .catch((err) => {
            toast.error(err.message);
            userDispatch(null, true, resetForm, 0);
          });
      }, 2000);
    },
  });

  const checkAdmin = (user, resetForm) => {
    db.collection("admins")
      .where("email", "==", user.email)
      .where("userlevel", "==", 1)
      .get()
      .then((querySnapshot) => {
        const arrData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        if (arrData.length > 0) {
          toast.success("admin login successfully");
          userDispatch(user, false, resetForm, 1);
        } else {
          toast.success("login successfully");
          userDispatch(user, false, resetForm, 0);
        }
      })
      .catch((error) => {
        auth
          .signOut()
          .then(() => {
            toast.error("invalid login");

            userDispatch(null, true, resetForm, 0);
          })
          .catch((err) => {
            toast.error(err.message);

            userDispatch(null, true, resetForm, 0);
          });
      });
  };
  return { formik };
};

export default useFormikHandler;
