import React, { useEffect, useState } from "react";
import "./allcourse.css";
import { Container, Row, Col } from "react-bootstrap";
import { getAllData } from "../../../Config/Firebase/firebasemethods";
import { Box } from "@mui/material";
import Loader from "../../../Components/Loader/Loader";
import { useNavigate, useParams } from "react-router-dom";


const AllCourses = () => {
  const params = useParams();
  const navigate = useNavigate()
  const [courseData, setCourseData] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    getAllData("courses")
      .then((res) => {
        setCourseData(res);
        setLoading(false); 
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [courseData]);


  const handleClick = (courseName) => {
    // alert(courseName)
    navigate(`course/${courseName}`)
  }


  function capitalizeWords(str) {
    const words = str.split(' ');
    const capitalizedWords = words.map(word => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    });
    return capitalizedWords.join(' ');
  }

  function formatDateFromTimestamp(timestamp) {
    const date = new Date(
      timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000
    ); // Convert seconds to milliseconds and add nanoseconds
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = date.toLocaleDateString("en-US", options);
    return formattedDate;
  }
  return (
    <>
      <Container className="mt-3">
        <Row>
          <h1 className="mb-5 fw-bold">
            All Courses
          </h1>
            {loading ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Loader />
              </Box>
            ) : (
              courseData.map((value) => (
                <>
          <Col md={{ offset: 1, span: 10, offset: 1 }} sm={6}>
                <div className="card my-3" key={value.documentId} onClick={() => handleClick(value.courseName)} >
                  <div className="card-header">
                    <p>{formatDateFromTimestamp(value.created_at)}</p>
                    <span className="title">{value.courseName}</span>
                  </div>
                  <div className="card-author">
                    <a className="author-avatar" href="#">
                      <span></span>
                    </a>
                    <svg className="half-circle" viewBox="0 0 106 57">
                      <path d="M102 4c0 27.1-21.9 49-49 49S4 31.1 4 4"></path>
                    </svg>
                    <div className="author-name">
                      <div className="author-name-prefix">Teacher</div>
                      Sir {capitalizeWords(value.teacherName)}
                    </div>
                  </div>
                  {value.weekDays === "TTS" ? (
                    <div className="tags">
                      <span>thursday</span>
                      <span>tuesDay</span>
                      <span>saturday</span>
                    </div>
                  ) : (
                    <div className="tags">
                      <span>Monday</span>
                      <span>Wednesday</span>
                      <span>Friday</span>
                    </div>
                  )}
                </div>
          </Col>
                </>
              ))
            )}
        </Row>
      </Container>
    </>
  );
};

export default AllCourses;
