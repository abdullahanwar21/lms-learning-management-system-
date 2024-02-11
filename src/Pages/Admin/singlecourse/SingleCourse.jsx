import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { db } from '../../../Config/Firebase/config';
import { Col, Container, Row } from 'react-bootstrap';
import WestIcon from "@mui/icons-material/West";
import { Avatar, Box } from '@mui/material';
import "./singleCourse.css"
import Loader from '../../../Components/Loader/Loader';

const SingleCourse = ({id}) => {
  const params = useParams()
  const navigate = useNavigate()
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // const navigate = useNavigate()
  const getDataAll = async () => {
    const stuData = [];
    try {
      const q = query(collection(db, "users"), where("course", "==", params.id));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        stuData.push({ ...doc.data() });
      });
      setData(stuData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      // alert("Error fetching data:", error)
    }
  };

  getDataAll();
  function capitalizeWords(str) {
    const words = str.split(' ');
    const capitalizedWords = words.map(word => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    });
    return capitalizedWords.join(' ');
  }
  return (
    <>
    <Container className='mt-3'>
      <Row>
      <h1><WestIcon onClick={() => navigate("/admin/allcourse")} sx={{cursor : 'pointer', margin : "0px 5px"}}/> Course</h1>
      <Col md={{ offset: 1, span: 10, offset: 1 }} sm={12}>
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
    <div className="card my-3">
      <div className="card-header">
        <p></p>
        <span className="title">{params.id}</span>
      </div>
      {data.length <= 0 ?(
        <>
        <h6 className='p-5 fs-4 '>No Students Avail This Course Yet</h6>
        </>
      ) : (data.map((value) => (
        <div className="card-author studentCard" key={value.uid}>
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center w-5">
              <Avatar
                alt="User Pic"
                src={value.image}
                sx={{ width: 50, height: 50, margin: "0px 19px" }}
              />
              <h5>
                {capitalizeWords(value.firstName)}{capitalizeWords(value.lastName)}
              </h5>
            </div>
          </div>
        </div>)
      ))}
    </div>
  )}
</Col>

      </Row>
    </Container>
    </>
  )
}

export default SingleCourse
