import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";

function Card2({ variant, number, Header, desiredRoute, titleIcons }) {
  const navigate = useNavigate();

  const handleShowMoreClick = () => {
    navigate(desiredRoute);
  };
  return (
    <>
      <Card
        bg={variant.toLowerCase()}
        key={variant}
        text={variant.toLowerCase() === "light" ? "dark" : "white"}
        style={{
          border: "#ff8600 1px solid",
          boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
          backdropFilter: " blur( 7px )",
          webkitBackdropFilter: "blur( 7px )",
          borderRadius: " 10px",
        }}
        className="my-2"
      >
        <Card.Header
          style={{
            borderBottom: "#ff8600 1px solid",
            backgroundColor: "transparent",
          }}
        >
          {Header}
        </Card.Header>
        <Card.Body>
          <Card.Title>
            {titleIcons}
            <h1
              className="text-center fw-bold"
              style={{ fontSize: "4rem", color: "#fb8500" }}
            >
              {number}
            </h1>{" "}
          </Card.Title>
          <Card.Footer
            onClick={handleShowMoreClick}
            style={{ cursor: "pointer" }}
          >
            Show More
          </Card.Footer>
        </Card.Body>
      </Card>
    </>
  );
}

export default Card2;
