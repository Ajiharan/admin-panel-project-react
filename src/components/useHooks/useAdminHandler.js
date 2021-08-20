import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { addEntry } from "../../features/admin/AdminEntryAction";
import toast from "react-hot-toast";
const useAdminHandler = (
  fileObj,
  setFileObj,
  setImage,
  storage,
  uid,
  setLoading
) => {
  const dispatch = useDispatch();
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
      setLoading(true);
      onUploadSubmission(resetForm, values);
    },
  });
  const onUploadSubmission = (resetForm, values) => {
    // prevent page refreshing
    const promises = [];

    fileObj.forEach((image) => {
      const uploadTask = storage.ref(`admin/${image.name}`).put(image);
      promises.push(uploadTask);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progressPercentage = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          console.log(image.name, progressPercentage);
        },
        (err) => {
          console.log(err.message);
        },
        () => {
          // console.log("triggered");
        }
      );
    });

    Promise.all(promises)
      .then(() => {
        console.log("All files uploaded");
        const urlPromises = [];
        fileObj.forEach((fileData) => {
          urlPromises.push(
            new Promise((resolve, reject) => {
              storage
                .ref(`admin/${fileData.name}`)
                .getDownloadURL()
                .then((res) => {
                  resolve(res);
                })
                .catch((err) => {
                  reject(err);
                });
            })
          );
        });
        Promise.all(urlPromises)
          .then((res) => {
            const { fname, lname, pno, address } = values;
            dispatch(
              addEntry({
                imageArr: res,
                firstname: fname,
                lastname: lname,
                address,
                phoneNo: pno,
                uid,
              })
            );

            resetForm();
            setFileObj([]);
            setImage([]);
          })
          .catch((err) => {
            console.log("err", err);
            setFileObj([]);
            setImage([]);
            resetForm();
          });
      })
      .catch((err) => {
        toast.error(err?.code || "Oops something wrong");
        console.log(err.code);
        setFileObj([]);
        setImage([]);
        setLoading(false);
      });
  };
  return { formik, onUploadSubmission };
};

export default useAdminHandler;
