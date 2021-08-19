import React from "react";
import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage, useField } from "formik";
const AdminImageUpload = () => {
  return (
    <Formik
      initialValues={{
        profile: [],
      }}
      validationSchema={Yup.object({
        profile: Yup.array().min(2, "select at least 1 images"),
      })}
      onSubmit={(values, props) => {
        let data = new FormData();
        values.profile.forEach((photo, index) => {
          data.append(`photo${index}`, values.profile[index]);
        });
      }}
    >
      {(formik) => {
        return (
          <>
            <Form>
              <input
                id="file"
                name="profile"
                type="file"
                onChange={(event) => {
                  const files = event.target.files;
                  let myFiles = Array.from(files);
                  formik.setFieldValue("profile", myFiles);
                }}
                multiple
              />
              <ErrorMessage name="profile" />
              <button type="submit" disabled={formik.isSubmitting}>
                Submit
              </button>
            </Form>
          </>
        );
      }}
    </Formik>
  );
};

export default AdminImageUpload;
