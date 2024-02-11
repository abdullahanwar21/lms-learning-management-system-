import { collection, addDoc, getFirestore } from "firebase/firestore";
import { Box, CircularProgress, MenuItem, TextField } from "@mui/material";
import React, { useRef, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
const db = getFirestore();
const AddCourse = () => {
  const [loading, setLoading] = useState(false);
  const weekDays = [
    {
      value: "TTS",
      label: "TTS",
    },
    {
      value: "MWF",
      label: "MWF",
    },
  ];
  const navigate = useNavigate();
  const validationSchema = Yup.object().shape({
    teacherName: Yup.string()
      .min(3, "This Name Should be Longer")
      .required("Required *"),
    courseName: Yup.string()
      .min(5, "This is Too Short For Course Name")
      .required("Course Name is Required* "),
    weekDays: Yup.string().required("Select Week Days is Required* "),
  });
  const initialValues = {
    weekDays: "",
    courseName: "",
    teacherName: "",
  };
  const handleAddCourseForm = async (value, props) => {
    console.log(props);
    setLoading(true);
    value["created_at"] = new Date();
    try {
      const docRef = await addDoc(collection(db, "courses"), value);
      navigate("/admin/allcourse");
      setLoading(false);
      console.log("Document written with ID: ", docRef.id);
      props.resetForm();
    } catch (e) {
      setLoading(false);
      console.error("Error adding document: ", e);
    }
  };
  return (
    <div>
      <Box>
        <div class="container">
          <div class="row">
            <div class="offset-md-2 col-md-8 offset-md-2 formBody">
              <h1 class="my-5" align="center">
                Add Course <span className="up">(LMS)</span>
              </h1>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleAddCourseForm}
              >
                {(props) => (
                  <Form>
                    <div class="row">
                      <div class="col-md-6">
                        <div class="my-3">
                          <Field
                            as={TextField}
                            id="outlined-basic"
                            fullWidth
                            label="Teacher Name"
                            variant="outlined"
                            name="teacherName"
                            error={
                              props.errors.teacherName &&
                              props.touched.teacherName
                            }
                            helperText={
                              props.errors.teacherName &&
                              props.touched.teacherName ? (
                                <ErrorMessage name="teacherName" />
                              ) : null
                            }
                          />
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div className="my-3">
                          <Field
                            as={TextField}
                            id="outlined-select-currency"
                            select
                            label="Select"
                            defaultValue="EUR"
                            fullWidth
                            name="weekDays"
                            error={
                              props.errors.weekDays && props.touched.weekDays
                            }
                            helperText={
                              props.errors.weekDays &&
                              props.touched.weekDays ? (
                                <ErrorMessage name="weekDays" />
                              ) : null
                            }
                          >
                            {weekDays.map((option) => (
                              <MenuItem key={option.value} value={option.label}>
                                {option.label}
                              </MenuItem>
                            ))}
                          </Field>
                        </div>
                      </div>
                    </div>
                    <div class="my-3">
                      <Field
                        as={TextField}
                        id="outlined-basic"
                        label="Course Name"
                        fullWidth
                        type="text"
                        variant="outlined"
                        name="courseName"
                        error={
                          props.errors.courseName && props.touched.courseName
                        }
                        helperText={
                          props.errors.courseName &&
                          props.touched.courseName ? (
                            <ErrorMessage name="courseName" />
                          ) : null
                        }
                      />
                    </div>
                    <button
                      type="submit"
                      className="btn  text-light mb-3 col-md-12 signUpBtn"
                      disabled={loading} 
                    >
                      {loading ? ( 
                        <CircularProgress size={24} color="inherit" />
                      ) : (
                        "Submit"
                      )}{" "}
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </Box>
    </div>
  );
};

export default AddCourse;
