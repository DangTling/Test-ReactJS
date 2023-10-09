import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import { toast } from "react-toastify";
import { deleteUser } from "../service/UserService";

function ModalDelete(props) {
  const { show, setShow, dataUser, handleUpdateTableAfterDelete } = props;

  const handleClose = () => {
    setShow(false);
  };
  const handleDelete = async () => {
    let res = await deleteUser(dataUser.id);
    if (res && res.statusCode) {
      handleUpdateTableAfterDelete(dataUser);
      toast.success("Delete Successfully");
    } else {
      toast.error("Something went wrong");
    }
    handleClose(true);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Modals</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="body">
          Are you sure you want delete this user whose email is{" "}
          <b>{dataUser.email}</b> ?
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleDelete}>
          Confirm Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalDelete;
