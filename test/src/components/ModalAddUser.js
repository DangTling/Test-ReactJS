import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import { toast } from "react-toastify";
import { postCreateUser } from "../service/UserService";

function ModalAddUser(props) {
  const { show, setShow, handleUpdateTable } = props;
  const [name, setName] = useState("");
  const [job, setJob] = useState("");

  const handleClose = () => {
    setShow(false);
  };
  const handleSaveUser = async () => {
    let res = await postCreateUser(name, job);
    setShow(false);
    // console.log(res);
    if (res && res.id) {
      setName("");
      setJob("");
      toast.success("Add new user successfully");
      handleUpdateTable({ id: res.id, first_name: name });
    } else {
      toast.error("Have some error ...");
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Fill the Form to add new user</Modal.Title>
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
            />
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSaveUser}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalAddUser;
