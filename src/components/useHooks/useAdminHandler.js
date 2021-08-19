import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { addEntry } from "../../features/admin/AdminEntryAction";
const useAdminHandler = (fileObj, setFileObj, setImage, storage) => {
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
      onUploadSubmission();
    },
  });
  const onUploadSubmission = () => {
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
            console.log("urlRes", res);
            setFileObj([]);
            setImage([]);
          })
          .catch((err) => {
            console.log("err", err);
            setFileObj([]);
            setImage([]);
          });
      })
      .catch((err) => {
        console.log(err.code);
        setFileObj([]);
        setImage([]);
      });
  };
  return { formik, onUploadSubmission };
};

export default useAdminHandler;
