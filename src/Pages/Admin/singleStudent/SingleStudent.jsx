import React, { useState } from "react";
import "./singleStudent.css";
import { Container, Row, Col } from "react-bootstrap";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../Config/Firebase/config";
import { useNavigate, useParams } from "react-router-dom";
import { Box } from "@mui/material";
import WestIcon from "@mui/icons-material/West";
import Loader from "../../../Components/Loader/Loader";


const SingleStudent = ({ id }) => {
  const params = useParams();
  const navigate = useNavigate()
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);


//   getting the specific data from firebase 
  const getDataAll = async () => {
    const stuData = [];
    try {
      const q = query(collection(db, "users"), where("uid", "==", params.id));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        stuData.push({ ...doc.data() });
      });
      setData(stuData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Error fetching data:", error)
    }
  };

  getDataAll();
  return (
    <>
      <Container>
        <Row>
          <Col md={{ offset: 3, span: 6, offset: 3 }}>
            {loading ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height : "80vh"
                }}
              >
                <Loader />
              </Box>
            ) : (
              data.map((value) => (
                <div className="profile_card_wrap" key={value.uid}>
                  <h2 onClick={() => navigate("/admin/allstudents")}><WestIcon  sx={{cursor : "pointer"}}/></h2>
                  <img src={value.image} />
                  <div className="profile_text">
                    <div className="profile_social">
                      <h4 className="my-2">Profile Info</h4>
                    </div>
                    <div className="profile_sub_text">
                      <p>
                        Name :{" "}
                        <span>
                          {" "}
                          {value.firstName} {value.lastName}{" "}
                        </span>
                      </p>
                      <p>
                        DOB : <span>{value.dateOfBirth}</span>
                      </p>
                      <p>
                        Email : <span>{value.email}</span>
                      </p>
                      <p>
                        Course :<span> {value.course}</span>
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default SingleStudent;
