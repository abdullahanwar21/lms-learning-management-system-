import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  FormControl,
  MenuItem,
  FormHelperText,
  Alert,
  CircularProgress,
} from "@mui/material";
import React, { useRef, useState } from "react";
import { Formik, Form, ErrorMessage, Field } from "formik";
import "./AdmissionForm.css";
import * as Yup from "yup";
import {
  addImageToStorage,
  getAllData,
  signUpUser,
} from "../../Config/Firebase/firebasemethods";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../../Components/Loader/Loader";
const AdmissionForm = () => {
  const [error, setIsError] = useState("");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const [loading, setLoading] = useState(false);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  //  Validation Schema
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    image: "",
    dateOfBirth: "",
    course: "",
  };
  const image = useRef();
  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(3, "This Is Too Short For First Name")
      .required("First Name is Required*"),
    lastName: Yup.string()
      .min(3, "This Is Too Short For Last Name")
      .required("Last Name is Required*"),
    email: Yup.string()
      .email("Email Must be Valid Email")
      .required("Email is Required*"),
    course: Yup.string().required("Select Course"),
    dateOfBirth: Yup.date()
      .required("Date of birth is Required*")
      .max(new Date(), "Date of birth cannot be in the future")
      .min(
        new Date(new Date().setFullYear(new Date().getFullYear() - 100)),
        "Please enter a valid date of birth"
      ),
    image: Yup.mixed().required("Image is Required*"),
    password: Yup.string()
      .required("Password is Required*")
      .min(8, "Password must be at least 8 characters long"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm Password is Required*"),
  });

  //  Getting All courses From FireBase
  const courses = [];
  getAllData("courses")
    .then((res) => {
      courses.push(...res);
    })
    .catch((error) => {
      setLoading(false);
      console.log(error);
    });

  // ADMISSION FORM ADD TO FIREBASE
  const handleAdmissionForm = async (value, props) => {
    setLoading(true);
    const fileName = image.current.files[0];
    const { confirmPassword, ...formValues } = value;

    const imageUrl = await addImageToStorage({
      file: fileName,
      email: formValues.email,
    });

    formValues.image = imageUrl;
    formValues["userType"] = "student";
    signUpUser({
      ...formValues,
    })
      .then((res) => {
        if (res) {
          navigate("/student");
          // setLoading(true);
          return;
        }
        setIsError(error);
      })
      .catch((errors) => {
        setIsError(errors);
        console.log(error);
      });
    // props.resetForm();
  };

  return (
    <>
      <Box className="main">
        <div class="container">
          <div class="row">
            <div class="offset-md-2 col-md-8 offset-md-2 formBody">
              <h1 class="my-5" align="center">
                Registration Form Of <span className="up">(LMS)</span>
              </h1>
              {error && (
                <Alert variant="filled" severity="error" className="my-3">
                  {error}
                </Alert>
              )}
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleAdmissionForm}
              >
                {(props) => (
                  <Form>
                    <div class="row">
                      <div class="col-md-6">
                        <div class="mb-3">
                          <Field
                            as={TextField}
                            id="outlined-basic"
                            fullWidth
                            label="First Name"
                            variant="outlined"
                            name="firstName"
                            error={
                              props.errors.firstName && props.touched.firstName
                            }
                            helperText={
                              props.errors.firstName &&
                              props.touched.firstName ? (
                                <ErrorMessage name="firstName" />
                              ) : null
                            }
                          />
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="mb-3">
                          <Field
                            as={TextField}
                            id="outlined-basic"
                            fullWidth
                            name="lastName"
                            error={
                              props.errors.lastName && props.touched.lastName
                            }
                            helperText={
                              props.errors.lastName &&
                              props.touched.lastName ? (
                                <ErrorMessage name="lastName" />
                              ) : null
                            }
                            label="Last Name"
                            variant="outlined"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="mb-3">
                      <div>
                        <Field
                          as={TextField}
                          id="outlined-select-currency"
                          select
                          label="Select"
                          defaultValue="SelectCourse"
                          name="course"
                          fullWidth
                          error={props.errors.course && props.touched.course}
                          helperText={
                            props.errors.course && props.touched.course ? (
                              <ErrorMessage name="course" />
                            ) : null
                          }
                        >
                          {courses.length > 0 ? (
                            courses.map((course, index) => (
                              <MenuItem key={index} value={course.courseName}>
                                {course.courseName}
                              </MenuItem>
                            ))
                          ) : (
                            <MenuItem disabled></MenuItem>
                          )}
                        </Field>
                      </div>
                    </div>
                    <div class="mb-3">
                      <Field
                        as={TextField}
                        id="outlined-basic"
                        fullWidth
                        type="date"
                        name="dateOfBirth"
                        error={
                          props.errors.dateOfBirth && props.touched.dateOfBirth
                        }
                        helperText={
                          props.errors.dateOfBirth &&
                          props.touched.dateOfBirth ? (
                            <ErrorMessage name="dateOfBirth" />
                          ) : (
                            "Enter Date Of Birth"
                          )
                        }
                        variant="outlined"
                      />
                    </div>
                    <div class="mb-3">
                      <Field
                        as={TextField}
                        id="outlined-basic"
                        fullWidth
                        label="Email"
                        type="email"
                        name="email"
                        variant="outlined"
                        error={props.errors.email && props.touched.email}
                        helperText={
                          props.errors.email && props.touched.email ? (
                            <ErrorMessage name="email" />
                          ) : null
                        }
                      />
                    </div>
                    <div class="mb-3">
                      <Field
                        as={TextField}
                        id="outlined-basic"
                        fullWidth
                        type="file"
                        name="image"
                        inputRef={image}
                        variant="outlined"
                        // error={props.errors.image && props.touched.image}
                        // helperText={
                        //   props.errors.image && props.touched.image ? (
                        //     <ErrorMessage name="image" />
                        //   ) : null
                        // }
                      />
                    </div>
                    <div class="mb-3">
                      <FormControl fullWidth variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">
                          Password
                        </InputLabel>
                        <Field
                          as={OutlinedInput}
                          id="outlined-adornment-password"
                          fullWidth
                          name="password"
                          error={
                            props.errors.password && props.touched.password
                          }
                          type={showPassword ? "text" : "password"}
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                              >
                                {showPassword ? (
                                  <VisibilityOff />
                                ) : (
                                  <Visibility />
                                )}
                              </IconButton>
                            </InputAdornment>
                          }
                          label="Password"
                        />
                        <FormHelperText sx={{ color: "red" }}>
                          {props.errors.password && props.touched.password ? (
                            <ErrorMessage name="password" />
                          ) : null}
                        </FormHelperText>
                      </FormControl>
                    </div>
                    <div class="mb-3">
                      <FormControl fullWidth variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">
                          Confirm Password
                        </InputLabel>
                        <Field
                          as={OutlinedInput}
                          name="confirmPassword"
                          error={
                            props.errors.confirmPassword &&
                            props.touched.confirmPassword
                          }
                          id="outlined-adornment-password"
                          fullWidth
                          type={showPassword ? "text" : "password"}
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                              >
                                {showPassword ? (
                                  <VisibilityOff />
                                ) : (
                                  <Visibility />
                                )}
                              </IconButton>
                            </InputAdornment>
                          }
                          label="Confirm Password"
                        />
                        <FormHelperText sx={{ color: "red" }}>
                          {props.errors.confirmPassword &&
                          props.touched.confirmPassword ? (
                            <ErrorMessage name="confirmPassword" />
                          ) : null}
                        </FormHelperText>
                      </FormControl>
                    </div>
                    <button
                      type="submit"
                      className="btn  text-light mb-3 col-md-12 signUpBtn"
                      // disabled={loading}
                    >
                      {loading ? (
                        <CircularProgress size={24} color="inherit" />
                      ) : (
                        "Submit"
                      )}{" "}
                    </button>
                    <span className="my-4 mx-2 text-decoration-none ml-2">
                      Have An Account ?<Link to="/login">Log in</Link>
                    </span>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </Box>
    </>
  );
};

export default AdmissionForm;
