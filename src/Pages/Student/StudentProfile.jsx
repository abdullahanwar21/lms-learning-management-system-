import React, { useEffect, useState } from "react";
// import { getData } from "../../Config/Firebase/firebasemethods";
import { Box } from "@mui/material";
import Loader from "../../Components/Loader/Loader";
import { Col, Container, Row } from "react-bootstrap";
import CreateIcon from "@mui/icons-material/Create";
import { auth, db } from "../../Config/Firebase/config";
import { collection, getDocs, query, where } from "firebase/firestore";
const StudentProfile = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const userData = async () => {
    const dataArr = [];
    const q = query(
      collection(db, "users"),
      where("uid", "==", auth.currentUser.uid)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      dataArr.push(doc.data());
    });
    setLoading(false);
    setData(dataArr);
  };
  useEffect(() => {
    userData();
  }, []);

  return (
    <>
      <Container className="mt-5">
        <Row>
          <Col md={{ offset: 2, span: 8, offset: 2 }}>
            {loading ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "80vh",
                }}
              >
                <Loader />
              </Box>
            ) : (
              data.map((value) => (
                <div className="profile_card_wrap" key={value.uid}>
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
                        <CreateIcon sx={{ margin: "0px 5px 0px 30px" }} />
                      </p>
                      <p>
                        DOB : <span>{value.dateOfBirth}</span>
                        <CreateIcon sx={{ margin: "0px 5px 0px 30px" }} />
                      </p>
                      <p>
                        Email : <span>{value.email}</span>
                        <CreateIcon sx={{ margin: "0px 5px 0px 3px" }} />
                      </p>
                      <p>
                        Course :<span> {value.course}</span>
                        <CreateIcon sx={{ margin: "0px 5px 0px 30px" }} />
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

export default StudentProfile;
