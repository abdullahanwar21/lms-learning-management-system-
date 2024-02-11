import React, { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar";
import AllCourses from "./allcourses/AllCourses";
import AddCourse from "../../Pages/Admin/addcourse/AddCourse";
import { Box } from "@mui/material";
import Card2 from "./Card";
import { Route, Routes } from "react-router-dom";
import SchoolIcon from "@mui/icons-material/School";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import AllStudents from "./allstudents/AllStudents";
import SingleCourse from "./singlecourse/SingleCourse";
import { db } from "../../Config/Firebase/config";
import { collection, getCountFromServer } from "firebase/firestore";
import Loader from "../../Components/Loader/Loader";
import SingleStudent from "./singleStudent/SingleStudent";
const AdminDashBoard = () => {

  // Get Count From Firebase
  const [userCount, setUserCount] = useState(null); 
  const [courseCount, setCourseCount] = useState(null); 
  const getCount = async (collectionName) => {
    const coll = collection(db, collectionName);
    const snapshot = await getCountFromServer(coll);
    return snapshot.data().count;
  };
  
  useEffect(() => {
    getCount("users").then((count) => setUserCount(count));
    getCount("courses").then((count) => setCourseCount(count));
  }, [userCount , courseCount]);

  return (
    <div>
      <Navbar
        screen={
          <Box>
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <div className="container">
                      <div className="row">
                        <div className="col-md-6 col-sm-12">
                          <Card2
                            variant={"Light"}
                            Header={"All Students"}
                            number={
                              userCount !== null ? (
                                userCount - 1
                              ) : (
                                <Box
                                  sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                  }}
                                >
                                  <Loader />
                                </Box>
                              )
                            }
                            desiredRoute="/admin/allstudents"
                            titleIcons={
                              <PeopleAltIcon sx={{ fontSize: "3rem" }} />
                            }
                          />
                        </div>
                        <div className="col-md-6 col-sm-12">
                          <Card2
                            variant={"light"}
                            Header={"All Courses"}
                            desiredRoute="/admin/allcourse"
                            number={
                              courseCount !== null ? (
                                courseCount
                              ) : (
                                <Box
                                sx={{
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}
                              >
                                <Loader />
                              </Box>
                              )
                            }
                            titleIcons={
                              <SchoolIcon sx={{ fontSize: "3rem" }} />
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </>
                }
              />
              <Route path="/addcourse" element={<AddCourse />} />
              <Route path="/allcourse" element={<AllCourses />} />
              <Route path="/allstudents" element={<AllStudents />} />
              <Route path="/allstudents/student/:id" element={<SingleStudent />} />
              <Route path="/allcourse/course/:id" element={<SingleCourse />} />
            </Routes>
          </Box>
        }
      />
    </div>
  );
};

export default AdminDashBoard;
