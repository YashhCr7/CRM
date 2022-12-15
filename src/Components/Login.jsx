import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../Images/Logo.jpeg";
import HttpServices from "../Services/HttpServices";
import StorageServices from "../Services/StorageServices";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function Login() {
  const history = useNavigate();
  const url = "/login";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState("");

  const [countEmail, setCountEmail] = useState(1);
  const [countPass, setCountPass] = useState(1);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const intialValues = {
    firstName: "",
    lastName: "",
    email: "",
  };

  const emailHandler = (e) => {
    let e_mail = e.target.value;
    if (email != "") {
      setCountEmail(2);
    } else {
      setCountEmail(3);
    }
    setEmail(e_mail);
  };

  const passwordHandler = (e) => {
    let pass = e.target.value;
    if (pass != "") {
      setCountPass(2);
    } else {
      setCountPass(3);
    }
    setPassword(pass);
  };

  const loginHandler = async () => {
    let er = "";
    let su = "";
    let credientials = { email: email, password: password };
    if (credientials.email != "" && credientials.password != "") {
      let resp = await HttpServices.post(url, credientials)
        .then((res) => setSuccess((su = res.data)))
        .catch((error) => setErr((er = error.response.data.message)));
    }
    // console.log(su);
    if (er) {
      toast.warn(er, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
        theme: "colored",
      });
    } else if (su.status === "success") {
      toast.success("LogIn Success...")
      // toast.success("Login Successful" ,
      //     { position: toast.POSITION.TOP_RIGHT, autoClose: 3000 , theme: "colored"})
      StorageServices.set("token", su ? su.data.token : "");
      StorageServices.set("userInfo", su ? su.data.user : "");
      history("/");
    }
  };

  const emailError = () => {
    return (
      <div className="text-center pt-1 fs-6 text-danger">
        E-Mail CanNot Be Empty
      </div>
    );
  };

  const passError = () => {
    return (
      <div className="text-center pt-1 fs-6 text-danger">
        Password CanNot Be Empty
      </div>
    );
  };

  return (
    <React.Fragment>
      <form onSubmit={handleSubmit(loginHandler)}>
        <div className="container-fluid w-100 ">
          <div className="row justify-content-center mt-5 ms-5 me-5">
            <div className="col-5 border rounded shadow-lg">
              <img src={logo} className="img-fluid w-50 mt-2 mb-2" />
              <button
                type="button"
                className="btn border rounded shadow-lg w-75"
              >
                <div className="col ms-5">
                  <div className="d-flex ps-5">
                    <span className="text-danger">G+</span> Login With Google
                  </div>
                </div>
              </button>
              <h4 className="text-center mt-4">OR</h4>
              <input
                type={"email"}
                className="w-75 border rounded shadow-lg mt-3"
                defaultValue={intialValues.firstName}
                {...register("firstName", {
                  validate: (value) => value !== "",
                })}
                onChange={(e) => emailHandler(e)}
                style={{ height: "45px" }}
                placeholder="E-mail"
              />
              {email === "" && countEmail === 2 ? emailError() : ""}
              <input
                // value={password}
                className="w-75 border rounded shadow-lg mt-3"
                defaultValue={intialValues.lastName}
                {...register("lastName", {
                  validate: (value) => value !== "",
                })}
                onChange={(e) => passwordHandler(e)}
                style={{ height: "45px" }}
                type={"password"}
                placeholder="Password"
              />
              {password === "" && countPass === 3 ? passError() : ""}

              <button
                type="submit"
                className="login btn-primary w-75 border rounded shadow-lg mt-4 fs-4"
                style={{ height: "45px" }}
              // onClick={() => loginHandler()}
              >
                Login
              </button>
              <div
                className="text-center mt-3 mb-3"
                style={{ cursor: "pointer" }}
              >
                <a
                  className="text center-block text-muted"
                  onClick={() => history("/ForgotPassword")}
                >
                  Forget Password
                </a>
              </div>
            </div>
          </div>
          <div className="row d-flex">
            <div className="col pt-3">
              Don't Have An Account?
              <a className="ms-2" href="#">
                Create a New Account
              </a>{" "}
            </div>
          </div>
          <ToastContainer autoClose={2000} />
        </div>
      </form>
    </React.Fragment>
  );
}

export default Login;
