import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLoginThunk } from "../../Redux/slices/userLoginSlice";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [err, setErr] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loginStatus, errorMessage, errorOccured } = useSelector(
    (state) => state.userLogin
  );

  function handleFormSubmit(data) {
    dispatch(userLoginThunk(data));
  }

  useEffect(() => {
    if (loginStatus) {
      navigate("/");
      setErr("");
    }
  }, [loginStatus]);

  return (
    <div>
      <section className="bg-image">
        <div className="mask d-flex align-items-center h-100 gradient-custom-3">
          <div className="container h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                <div className="card my-5" style={{ borderRadius: "15px" }}>
                  <div className="card-body p-5">
                    <h2 className="text-uppercase text-center mb-5">Login</h2>

                    <form onSubmit={handleSubmit(handleFormSubmit)}>
                      <div data-mdb-input-init className="form-outline mb-4">
                        <input
                          type="text"
                          id="username"
                          className="form-control form-control-lg"
                          placeholder="Username"
                          {...register("username", {
                            required: "Username is required",
                          })}
                        />
                      </div>

                      <div data-mdb-input-init className="form-outline mb-4">
                        <input
                          type="password"
                          id="password"
                          className="form-control form-control-lg"
                          placeholder="password"
                          {...register("password", {
                            required: "Password is required",
                          })}
                        />
                      </div>

                      {errors.username !== undefined && (
                        <p className="lead fs-5 text-danger">
                          {errors.username.message}
                        </p>
                      )}
                      {errors.password !== undefined && (
                        <p className="lead fs-5 text-danger">
                          {errors.password.message}
                        </p>
                      )}
                      {errors.email !== undefined && (
                        <p className="lead fs-5 text-danger">
                          {errors.email.message}
                        </p>
                      )}
                      {err !== "" && (
                        <p className="lead fs-5 text-danger">{err}</p>
                      )}
                      {errorOccured && (
                        <p className="lead fs-5 text-danger">{errorMessage}</p>
                      )}
                      <div className="d-flex justify-content-center">
                        <button
                          type="submit"
                          data-mdb-button-init
                          data-mdb-ripple-init
                          className="btn btn-success btn-block btn-lg gradient-custom-4 text-body"
                        >
                          Login
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Login;
