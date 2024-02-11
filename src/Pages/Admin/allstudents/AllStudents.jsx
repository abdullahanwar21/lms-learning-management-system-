import {
  Avatar,
  Box,
  CircularProgress,
  IconButton,
  LinearProgress,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Container, Row, Col } from "react-bootstrap";
import "./allstudent.css";
import React, { useEffect, useState } from "react";
import { getAllData } from "../../../Config/Firebase/firebasemethods";
import Loader from "../../../Components/Loader/Loader";
import { useNavigate } from "react-router-dom";

const AllStudents = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleColClick = (uid) => {
    navigate(`student/${uid}`);
  };

  // get all the data from fire base
  useEffect(() => {
    getAllData("users")
      .then((res) => {
        setData(res);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  function capitalizeWords(str) {
    const words = str.split(' ');
    const capitalizedWords = words.map(word => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    });
    return capitalizedWords.join(' ');
  }
  return (
    <>
      <Container className="mt-3">
        <Row>
          <h1 className="mb-5 fw-bold">All Students</h1>
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
            data
              .filter((value) => value.userType !== "admin")
              .map((value, ind) => (
                <Col
                  xs={12}
                  md={{ offset: 1, span: 10, offset: 1 }}
                  className="studentInfo"
                  key={ind}
                  onClick={() => handleColClick(value.uid)}
                >
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center">
                      <Avatar
                        alt="Remy Sharp"
                        src={value.image}
                        sx={{ width: 50, height: 50, margin: "0px 19px" }}
                      />
                      <h4>
                        {capitalizeWords(value.firstName)} &nbsp;
                        {capitalizeWords(value.lastName)}
                      </h4>
                    </div>
                    <IconButton aria-label="delete" color="white">
                      <DeleteIcon />
                    </IconButton>
                  </div>
                </Col>
              ))
          )}
        </Row>
      </Container>
    </>
  );
};

export default AllStudents;
