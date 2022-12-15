import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SearchBox from "./SearchBox";
import HttpServices from "../../Services/HttpServices";
import StorageService from "../../Services/StorageServices";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddDeal from "../AddDeal/AddDeal";

let userId;
function Navbar() {
  const [newPassword, setNewPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setuserName] = useState("");

  const navigate = useNavigate();

  const [companies, setCompanies] = useState();
  const [user, setUser] = useState();
  const [password, setPassword] = useState();

  const [actineLink, setActiveLink] = useState("deal");

  useEffect(() => {
    let userInfo = StorageService.get("userInfo");
    setuserName(userInfo.firstName);
  }, []);

  const handleSwitchCompany = async () => {
    let userInfo = StorageService.get("userInfo");
    userId = userInfo ? userInfo._id : "";
    let response = await HttpServices.get(`secure/user/${userId}`);
    setCompanies(response.docs.companies);
    setUser(response);
  };

  //-------------------------------change password-------------------------
  const submitChangePassword = async (e) => {
    let response = await HttpServices.get(`secure/user/${userId}`);
    if (oldPassword === "" || newPassword === "" || confirmPassword === "") {
      toast.warn("Required all fields", { theme: "colored" });
    } else if (newPassword !== confirmPassword) {
      toast.warn("new password should match to confirm password", { theme: "colored" });
    } else if (oldPassword !== response.docs.password) {
      toast.warn("invalid old password", { theme: "colored" });
    } else {
      let changPasswordData = {
        ...response.docs,
        oldPassword: oldPassword,
        newPassword: newPassword,
        confirmPassword: confirmPassword,
        password: newPassword,
      };
      setPassword({
        ...response.docs,
        oldPassword: oldPassword,
        newPassword: newPassword,
        confirmPassword: confirmPassword,
        password: newPassword,
      });
      let changePassword = await HttpServices.put(
        `secure/user`,
        userId,
        changPasswordData
      );
      if (changePassword.status == "success") {
        toast.success("password Changed successfully", { theme: "colored" });
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      }
    }
  };

  const handleChangePasswordCancel = () => {
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };
  function handleOldPassword(e) {
    setOldPassword(e.target.value);
  }
  function handleNewPassword(e) {
    setNewPassword(e.target.value);
  }

  function handleConfirmPassword(e) {
    setConfirmPassword(e.target.value);
  }

  //----------------------------------switch sweetalert----------------------------------
  function handleSwitch(e) {
    const swalWithBootstrapButtons = Swal.mixin({
      customclass: {
        confirmButton: "btn btn-danger",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: true,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You are going to switch!!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, switch it!",
        cancelButtonText: "No,cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
        }
      });
  }

  function handleDefaultCompany() {
    toast.success("user updated succesfully", { theme: "colored" });
  }

  //--------------------------------Logout user-----------------------------
  const logOut = () => {
    toast.success("LogOut Success...");
    StorageService.clear();
    setTimeout(navigate("/login"), 3000);
  };

  function handleActive(e) {
    setActiveLink(e.target.innerText);
  }

  return (
    <div>
      {/*---------------------------------------- navElements------------------------- */}
      <nav
        className="navbar navbar-expand-lg navbar-dark "
        style={{ backgroundColor: "#00008B" }}
      >
        <div className="container-fluid">
          <a
            className="navbar-brand text-white "
            href="#/deals"
            onClick={(e) => handleActive(e)}
          >
            SalesCRM
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
              <li
                style={{
                  backgroundColor:
                    actineLink === "Deals" || actineLink === "SalesCRM"
                      ? "#483D8B"
                      : "",
                }}
                className="nav-item mr-1 "
              >
                <a
                  className="nav-link active text-white"
                  aria-current="page"
                  href="#/deals"
                  onClick={(e) => handleActive(e)}
                >
                  <i className="bi bi-currency-dollar"></i>Deals
                </a>
              </li>
              <li
                style={{
                  backgroundColor: actineLink === "Activities" ? "#483D8B" : "",
                }}
                className="nav-item mr-1 "
              >
                <a
                  className="nav-link text-white"
                  href="#/Activities"
                  onClick={(e) => handleActive(e)}
                >
                  <i className="bi bi-clock"></i>Activities
                </a>
              </li>
              <li
                style={{
                  backgroundColor: actineLink === "People" ? "#483D8B" : "",
                }}
                className="nav-item mr-1 "
              >
                <a
                  className="nav-link text-white"
                  href="#/People"
                  onClick={(e) => handleActive(e)}
                >
                  <i className="bi bi-person-fill"></i>People
                </a>
              </li>
              <li
                style={{
                  backgroundColor:
                    actineLink === "Organization" ? "#483D8B" : "",
                }}
                className="nav-item mr-1 "
              >
                <a
                  className="nav-link text-white"
                  value="Organization"
                  href="#/Organization"
                  onClick={(e) => handleActive(e)}
                >
                  <i className="bi bi-building"></i>Organization
                </a>
              </li>
              <li className="nav-item mt-1 ml-3">
                <SearchBox />
              </li>
            </ul>
            <ul className="navbar-nav ml-auto">
              <li className="nav-item ">
                <a
                  className="nav-link text-white"
                  href="#/dashboard"
                  onClick={(e) => handleActive(e)}
                >
                  <i className="bi bi-bell"></i>
                </a>
              </li>

              <li className="nav-item dropdown me-auto ">
                <a
                  className="nav-link text-white"
                  id="navbarDropdown"
                  onClick={() => handleSwitchCompany()}
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  hello,{username}
                </a>
                <ul
                  className="dropdown-menu dropdown-menu-right bg-white"
                  aria-labelledby="navbarDropdown"
                >
                  <li>
                    <a
                      className="dropdown-item"
                      data-bs-toggle="modal"
                      data-bs-target="#staticBackdrop"
                    >
                      Switch Company
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item">
                      Settings
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                    >
                      Change Password
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item" onClick={logOut}>
                      Logout
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {/*--------------------------- switch company modal------------------------------------ */}
      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div
            className="modal-content "
            style={{

              align: "center",
              marginTop: "5rem",
            }}
          >
            <div className="modal-header" style={{ border: "none" }}>
              <h5 className="modal-title text-primary" id="staticBackdropLabel">
                My companies
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col" style={{ textAlign: "left" }}>
                      Company
                    </th>
                    <th scope="col" style={{ textAlign: "left" }}>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {companies
                    ? companies.map((option, index) => (
                      <tr key={index}><td style={{ textAlign: "left" }}>{option.name}<i className="bi bi-check-lg text-success"></i></td>
                        <td style={{ textAlign: "left" }}>
                          <button
                            className="btn bg-transparent btn-link " type="button" onClick={() => handleDefaultCompany()}><i className="bi bi-check2-square text-primary"></i>
                          </button>
                          <button
                            className="btn bg-transparent btn-link"
                            type="button"
                            onClick={(e) => handleSwitch(e)}
                          >
                            <i className="bi bi-shuffle ml-2 text-primary"></i>
                          </button>
                        </td>
                      </tr>
                    )) : <tr></tr>}
                </tbody>
              </table>
            </div>
            <div
              className="modal-footer text-start ms-2 mb-2"
              style={{ border: "none" }}
            >
              <div className="text-start ms-2 mb-2">
                <a
                  className="text-start ms-2 mb-2"
                  type="button"
                  data-bs-dismiss="modal"
                >
                  Close
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*-------------------------------------- changePassword Modal----------------------------------- */}
      <div
        className="modal fade modal-md"
        data-backdrop="static"
        data-keyboard="false"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-md">
          <div className="modal-content h-25">
            <div className="modal-header" style={{ border: "none" }}>
              <h5 className="modal-title text-primary" id="exampleModalLabel">
                Change Password
              </h5>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label
                  htmlFor="exampleInputPassword1"
                  className="form-label fw-norma"
                >
                  Enter Old Password
                </label>
                <input
                  onChange={(e) => handleOldPassword(e)}
                  type="password"
                  value={oldPassword}
                  className="form-control"
                  id="exampleInputPassword1"
                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor="exampleInputPassword1"
                  className="form-label fw-norma"
                >
                  New Password
                </label>
                <input
                  onChange={(e) => handleNewPassword(e)}
                  type="password"
                  value={newPassword}
                  className="form-control"
                  id="exampleInputPassword2"
                />
              </div>
              <div className="mb-3">
                <label
                  style={{ textAlign: "left" }}
                  htmlFor="inputPassword6"
                  className="col-form-label fw-norma"
                >
                  Password
                </label>
                <input
                  onChange={(e) => handleConfirmPassword(e)}
                  type="password"
                  value={confirmPassword}
                  className="form-control"
                  id="exampleInputPassword3"
                />
              </div>
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss={
                  newPassword !== "" &&
                    oldPassword !== "" &&
                    confirmPassword !== "" &&
                    newPassword === confirmPassword &&
                    oldPassword === user.docs.password
                    ? "modal"
                    : ""
                }
                onClick={(e) => submitChangePassword(e)}
              >
                Save
              </button>
              <button
                type="cancel"
                className="btn bg-tranparent btn-link ml-1"
                data-bs-dismiss="modal"
                onClick={() => handleChangePasswordCancel()}
                href=""
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer autoClose={2000} />
      <AddDeal/>
    </div>
  );
}

export default Navbar;