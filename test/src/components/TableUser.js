import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { fetchAllUser } from "../service/UserService";
import ReactPaginate from "react-paginate";
import ModalAddUser from "./ModalAddUser";
import ModalEditUser from "./ModalEditUser";
import ModalDelete from "./ModalDelete";
import _ from "lodash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { debounce } from "lodash";
import { CSVLink } from "react-csv";
import Papa from "papaparse";
import { toast } from "react-toastify";
function TableUser() {
  const [show, setShow] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [listUser, setListUser] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [dataUser, setDataUser] = useState({});
  const [sortBy, setSortBy] = useState("asc");
  const [sortField, setSortField] = useState("id");
  const [exportData, setExportData] = useState([]);

  useEffect(() => {
    getListUser(1);
  }, []);
  const getListUser = async (page) => {
    let res = await fetchAllUser(page);
    if (res && res.data) {
      setTotalPage(res.total_pages);
      setListUser(res.data);
    }
  };
  const handlePageClick = (e) => {
    getListUser(+e.selected + 1);
  };
  const handleUpdateTable = (user) => {
    setListUser([user, ...listUser]);
  };
  const handleUpdateTableAfterEdit = (user) => {
    let index = listUser.findIndex((item) => item.id === user.id);
    let cloneListUser = [...listUser];
    cloneListUser[index].first_name = user.name;
    setListUser(cloneListUser);
  };
  const handleUpdateTableAfterDelete = (user) => {
    let cloneListUser = [...listUser];
    cloneListUser = cloneListUser.filter((item) => item.id !== user.id);
    setListUser(cloneListUser);
  };
  const handleSort = (sortBy, sortField) => {
    let cloneListUser = [...listUser];
    cloneListUser = _.orderBy(cloneListUser, [sortField], [sortBy]);
    setListUser(cloneListUser);
    setSortBy(sortBy);
    setSortField(sortField);
  };
  const handleSearch = debounce((e) => {
    let term = e.target.value;
    if (term) {
      let cloneListUser = [...listUser];
      cloneListUser = cloneListUser.filter((item) => item.email.includes(term));
      setListUser(cloneListUser);
    } else {
      getListUser(1);
    }
  }, 300);
  const getUsersExport = (event, done) => {
    let result = [];
    result.push(["Id", "First Name", "Last Name", "Email"]);
    if (listUser && listUser.length > 0) {
      listUser.map((item, index) => {
        let arr = [];
        arr[0] = item.id;
        arr[1] = item.first_name;
        arr[2] = item.last_name;
        arr[3] = item.email;
        result.push(arr);
      });
      setExportData(result);
      done();
    }
  };
  const handleImportFile = (event) => {
    if (event.target && event.target.files && event.target.files[0]) {
      let file = event.target.files[0];
      if (file.type !== "text/csv") {
        toast.error("Only accept CSV file ...");
        return;
      }
    }
    Papa.parse(event.target.files[0], {
      header: true,
      //   complete: (results) => {
      //     let rawCSV =  results.data;
      //     if(rawCSV.length>0) {
      //       if(rawCSV[0] && rawCSV[0].length===4) {
      //         if(rawCSV[0][0] !== "ID" || rawCSV[0][1] !== "First Name"  || rawCSV[0][2]  !== "Last Name" || rawCSV[0][3] !== "Email") {
      //           toast.error("Wrong format header CSV file");
      //         } else   {
      //           let result = [];
      //           rawCSV.map((item,  index) => {
      //             if(index>0 && item.length===4){
      //               let obj = {};
      //               obj.ID = item[0];
      //               obj.first_name  = item[1];
      //               obj.last_name = item[2];
      //               obj.email = item[3];
      //                 result.push(obj);
      //             }
      //             setListUser(  result);
      //           })
      //         }
      //       }else  {
      //           toast.error("Wrong format CSV file");
      //       }
      //     } else {
      //       toast.error("Not found data on CSV file");
      //     }
      //   },
      complete: function (results) {
        console.log("Finished:", results.data);

        // Set  state Table but file must have correct header
        setListUser(results.data);
      },
    });
  };

  return (
    <>
      <div className="my-3 justify-content-between d-sm-flex">
        <span>
          <h3>
            <b>List Users:</b>
          </h3>
        </span>
        <div className="btn-group mt-sm-2 mt-2">
          <input
            type="file"
            id="import"
            hidden
            onChange={(event) => handleImportFile(event)}
          />
          <label htmlFor="import" className="btn btn-info mx-1  rounded">
            <FontAwesomeIcon
              icon="fa-solid fa-file-import"
              style={{ marginRight: "10px" }}
            />
            Import File
          </label>

          <CSVLink
            data={exportData}
            filename={"users.csv"}
            className="btn btn-primary mx-1  rounded"
            asyncOnClick={true}
            onClick={getUsersExport}
          >
            <FontAwesomeIcon
              icon="fa-solid fa-file-arrow-down"
              style={{ marginRight: "10px" }}
            />
            Export file
          </CSVLink>
          <button
            className="btn btn-success mx-1 rounded"
            onClick={() => setShow(true)}
          >
            <FontAwesomeIcon
              icon="fa-solid fa-user-plus"
              style={{ marginRight: "10px" }}
            />
            Add New User
          </button>
        </div>
      </div>
      <div className="mb-3 col-12 col-sm-4">
        <input
          type="text"
          class="form-control"
          aria-label="Text input with dropdown button"
          placeholder="Search user by email"
          onChange={(e) => handleSearch(e)}
        />
      </div>
      <div className="table-responsive">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>
                <div className="d-flex justify-content-between">
                  <span>ID</span>
                  <span
                    className="sort-icon"
                    onClick={() =>
                      handleSort(sortBy === "asc" ? "desc" : "asc", "id")
                    }
                  >
                    {sortBy === "asc" && sortField === "id" ? (
                      <FontAwesomeIcon icon="fa-solid fa-arrow-down-wide-short" />
                    ) : (
                      <FontAwesomeIcon icon="fa-solid fa-arrow-up-wide-short" />
                    )}
                  </span>
                </div>
              </th>
              <th>
                <div className="d-flex justify-content-between">
                  <span>First Name</span>
                  <span
                    className="sort-icon"
                    onClick={() =>
                      handleSort(
                        sortBy === "asc" ? "desc" : "asc",
                        "first_name"
                      )
                    }
                  >
                    {sortBy === "asc" && sortField === "first_name" ? (
                      <FontAwesomeIcon icon="fa-solid fa-arrow-down-wide-short" />
                    ) : (
                      <FontAwesomeIcon icon="fa-solid fa-arrow-up-wide-short" />
                    )}
                  </span>
                </div>
              </th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {listUser &&
              listUser.length > 0 &&
              listUser.map((item, index) => {
                return (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.first_name}</td>
                    <td>{item.last_name}</td>
                    <td>{item.email}</td>
                    <td>
                      <button
                        style={{ width: 100 }}
                        className="btn btn-warning mx-3 my-3"
                        onClick={() => {
                          setShowEditModal(true);
                          setDataUser(item);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        style={{ width: 100 }}
                        className="btn btn-danger mx-3 my-3"
                        onClick={() => {
                          setShowDeleteModal(true);
                          setDataUser(item);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      </div>
      <ReactPaginate
        className="pagination justify-content-center "
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={totalPage}
        previousLabel="< previous"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        renderOnZeroPageCount={null}
      />
      <ModalAddUser
        show={show}
        setShow={setShow}
        handleUpdateTable={handleUpdateTable}
      />
      <ModalEditUser
        show={showEditModal}
        setShow={setShowEditModal}
        dataUser={dataUser}
        handleUpdateTableAfterEdit={handleUpdateTableAfterEdit}
      />
      <ModalDelete
        show={showDeleteModal}
        setShow={setShowDeleteModal}
        dataUser={dataUser}
        handleUpdateTableAfterDelete={handleUpdateTableAfterDelete}
      />
    </>
  );
}

export default TableUser;
