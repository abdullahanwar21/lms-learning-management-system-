import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import SingleStudent from "../Pages/Admin/singleStudent/SingleStudent";
import { useParams } from "react-router-dom";

function CustomModal({show , close , id}) {
    const params = useParams()
    console.log(params.id)
    const [modalOpen, setModalOpen] = useState(show);

  //   console.log(show)

  // useEffect(() => {
  //   setModalOpen(show);
  // }, [show]);

  return (
    <>
      <Modal
        size="md"
        show={show}
        onHide={() => setModalOpen(close)}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
        className="mt-5"
      >
        <Modal.Header
          closeButton
          style={{ borderBottom: "none" }}
        >
        </Modal.Header>
        <Modal.Body>
          {/* <SingleStudent userId={params.id} /> */}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default CustomModal;
