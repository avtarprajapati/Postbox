import React, { Component } from "react";
import { reduxForm } from "redux-form";
import { Link } from "react-router-dom";

export class Login extends Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="row container">
          <div className="col">
            <div className="info">
              <h1 className="info__heading">Postbox</h1>
              <p>
                Postbox is social networking website to upload any of your pic
                get like or follow your friend easily.
              </p>
            </div>
          </div>
          <div className="col">
            <form className="form shadow p-3 bg-white rounded">
              <input
                type="text"
                className="form-control p-3"
                placeholder="Enter Email"
                aria-label="Enter Email"
              />
              <input
                type="password"
                className="form-control p-3"
                placeholder="Enter Password"
                aria-label="Enter Password"
              />
              <button type="button" className="btn btn-primary">
                Log In
              </button>
              <Link to="/">Forgotten password?</Link>
              <hr />
              <button type="button" className="btn btn-secondary">
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default reduxForm({
  form: "Login",
})(Login);
