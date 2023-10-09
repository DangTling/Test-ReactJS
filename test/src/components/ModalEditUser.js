import axios from "axios";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { putUpdateUser } from "../service/UserService";
import { toast } from "react-toastify";

function ModalEditUser(props) {
  const { show, setShow, dataUser, handleUpdateTableAfterEdit } = props;
  const [name, setName] = useState("");
  const [job, setJob] = useState("");

  const handleClose = () => {
    setShow(false);
  };

  const handleEditUser = async () => {
    let res = await putUpdateUser(name, job, dataUser.id);
    if (res && res.updatedAt) {
      handleUpdateTableAfterEdit({
        id: dataUser.id,
        name: name,
      });
      toast.success("Change Successfully");
    } else {
      toast.error("Something went wrong");
    }
    handleClose(false);
  };

  useEffect(() => {
    setName(dataUser.first_name);
  }, [dataUser]);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Change what you want</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <div class="form-group">
            <label for="exampleInputEmail1">Name</label>
            <input
              type="text"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter name of user"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Job</label>
            <input
              type="text"
              class="form-control"
              id="exampleInputPassword1"
              placeholder="Job of this user"
              onChange={(e) => setJob(e.target.value)}
              value={job}
            />
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleEditUser}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalEditUser;
