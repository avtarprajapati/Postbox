import React, { Component } from "react";
import { reduxForm } from "redux-form";
import { Link } from "react-router-dom";

export class Login extends Component {
  render() {
    return (
      <div className="container-fluid bg-grad-1 min-height">
        <div className="row">
          <div className="col-md-5 pt-3 mx-auto text-center">
            <div className="bg-light shadow-sm p-2 rounded-lg mt-5">
              <div className="display-4 mt-4 logo">
                Postbox
              </div>
              <form className="p-3">
                <input
                  type="text"
                  className="form-control rounded-pill my-4"
                  placeholder="Email ID"
                  aria-label="Enter Email"
                />
                <input
                  type="password"
                  className="form-control rounded-pill my-4"
                  placeholder="Password"
                  aria-label="Enter Password"
                />
                <div className="mt-4">
                  <button
                    type="button"
                    className="btn bg-grad-1 border-0 text-light rounded-pill w-50 mb-2"
                  >
                    Log In
                  </button>
                  <hr className="my-3" />
                  <Link
                    to="/"
                    className="btn btn-link text-secondary btn-sm w-100 mb-2 text-decoration-none"
                  >
                    Forgot password?
                  </Link>
                  <Link
                    to="/register"
                    className="btn btn-link btn-sm w-100 text-secondary text-decoration-none"
                  >
                    Dont have an account ? register here
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default reduxForm({
  form: "Login",
})(Login);
