import React, { useState } from "react";
import {useNavigate} from 'react-router-dom'
import ReCAPTCHA from "react-google-recaptcha";
import HttpServices from "../Services/HttpServices";
import "../Styles/Registration.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Registration() {
  const navigate=useNavigate();
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [company, setComapny] = useState("");
  const [comapnyIndustry, setCompanyIndustry] = useState("");
  const [email, setEmail] = useState("");

  const message = "Prove that you are not Robot!";

  const notify = () => {
    toast.error(
      <div>
        <FontAwesomeIcon icon="fa-solid fa-shield-exclamation" />
        {message}
      </div>
    );
  };

  const handleFirstnameChange = (e) => {
    setfirstName(e.target.value);
  };
  const handleLastnameChange = (e) => {
    setlastName(e.target.value);
  };
  const handleCompanynameChange = (e) => {
    setComapny(e.target.value);
  };

  const handleComapnyindustryChange = (e) => {
    setCompanyIndustry(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const postObject = {
    company: {
      name: company,
      industry: comapnyIndustry,
    },
    user: {
      firstName: firstName,
      lastName: lastName,
      email: email,
    },
  };

  const handlePostRequest = async (e) => {
    e.preventDefault();
    if (
      firstName === "" ||
      lastName === "" ||
      company === "" ||
      comapnyIndustry === "" ||
      email === ""
    ) {
      notify();
    } else {
      try {
        const response = await HttpServices.post("register", postObject);
        console.log(response);
        console.log("post");
      } catch (err) {
        console.log(err);
      }
    }
  };
  console.log(postObject);

  return (
    <>
      {" "}
      <ToastContainer />
      <div className="container col-sm-6 col-sm-offset-3">
        <div className="card">
          <form
            className="Registration-form"
            onSubmit={(e) => handlePostRequest(e)}
          >
            <h1>Create account</h1>
            <hr />
            <div className="form-row">
              <div className="form-group col-md-6 input-group-lg">
                <label className="label">First Name</label>
                <input
                  type="text"
                  className="form-control input-lg"
                  name="firstname"
                  placeholder="firstname"
                  value={firstName}
                  onChange={(e) => handleFirstnameChange(e)}
                />
              </div>
              <div className="form-group col-md-6 input-group-lg">
                <label className="label">last Name</label>
                <input
                  type="text"
                  className="form-control input-lg"
                  name="lastname"
                  placeholder="lastname"
                  value={lastName}
                  onChange={(e) => handleLastnameChange(e)}
                />
              </div>
              <div className="form-group col-md-12 input-group-lg">
                <label className="label">Company Name</label>
                <input
                  type="text"
                  className="form-control input-lg"
                  name="comapnyname"
                  placeholder="company name"
                  value={company}
                  onChange={(e) => handleCompanynameChange(e)}
                />
              </div>
              <div className="form-group col-md-12 input-group-lg">
                <label className="label">Company Industry</label>
                <select
                  name="comapnyIndustry"
                  className="form-control"
                  value={comapnyIndustry}
                  onChange={(e) => handleComapnyindustryChange(e)}
                >
                   <option defaultValue="Select Industry">
                    Select Industry
                  </option>
                  <option value="software">
                    Software,App Development
                  </option>
                  <option value="health">Health</option>
                  <option value="startup">Tech Startup</option>
                  <option value="educationAndTraining">
                    Education and Training
                  </option>
                  <option value="realEstate">Real Estate</option>
                  <option value="creativeAgency">
                    Creative Agency(Web,Advertising,Video)
                  </option>
                  <option value="financialCreditServices">
                    Financial or Credit Services
                  </option>
                  <option value="news">
                    News,Media and Publication
                  </option>
                  <option value="consulting">Consulting</option>
                  <option value="manifacturing">Manifacturing</option>
                  <option value="construction">Construction</option>
                </select>
              </div>
              <div className="form-group col-md-12 input-group-lg">
                <label className="label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  placeholder="email"
                  value={email}
                  onChange={(e) => handleEmailChange(e)}
                />
              </div>
            </div>
            <div className="recaptcha input-group-lg">
              <ReCAPTCHA sitekey="6LdH_DMeAAAAAFWRLmZIDHUdBrhUjyN2s5CzHbrx" />
            </div>
            <button type="submit" className="btn btn-primary btn-lg">
              Sign up
            </button>
          </form>
        </div>
      </div>
      <div className="text-muted">
        <span className="footer">
          Already have an account? <a onClick={()=>navigate("/login")}>Login</a>
        </span>
      </div>
    </>
  );
}
export default Registration;
