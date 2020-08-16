import React, { Component } from "react";
import { reduxForm } from "redux-form";
import { Link } from "react-router-dom";

export class Login extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          
          <div className="col-md-4 pt-3 mx-auto text-center">
          
            <div className="bg-light shadow-sm p-2 rounded-lg mt-5">
            <div className="display-4 my-3">Post<span className="text-danger">BOX</span></div>
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
                  <button type="button" className="btn btn-danger rounded-pill w-50 mb-2">
                    Log In
                  </button>
                  <hr className="my-3" />
                  <Link to="/" className="btn btn-light text-secondary btn-sm w-100 mb-2 float-right text-decoration-none">Forgot password?</Link>
                  <button type="button" className="btn btn-sm w-100 btn-light text-secondary">
                    Dont have an account ? register here
                  </button>
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
