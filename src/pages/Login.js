import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { verifyUser } from "../actions";

export class Login extends Component {
  state = {
    email: "",
    password: ""
  };
  onFormLogin = (e) => {
    e.preventDefault();
    this.props.verifyUser(this.state);
  };
  render() {
    return (
      <div className="container-fluid bg-grad-1 min-height">
        <div className="row">
          <div className="col-md-5 pt-3 mx-auto text-center">
            <div className="bg-light shadow-sm p-2 rounded-lg mt-5">
              <div className="h1 mt-4 logo"><span className="text-danger">Post</span>box</div>
              <form className="p-3">
                <input
                  type="text"
                  className="form-control rounded-pill my-4"
                  placeholder="Email ID"
                  aria-label="Enter Email"
                  value={this.state.email}
                  onChange={(e) => this.setState({ email: e.target.value })}
                />
                <input
                  type="password"
                  className="form-control rounded-pill my-4"
                  placeholder="Password"
                  aria-label="Enter Password"
                  value={this.state.password}
                  onChange={(e) => this.setState({ password: e.target.value })}
                />
                <div className="mt-4">
                  <button
                    type="sumbit"
                    className="btn bg-grad-1 border-0 text-light rounded-pill w-50 mb-2"
                    onClick={(e) => this.onFormLogin(e)}
                  >
                    Log In
                  </button>
                  <hr className="my-3" />
                  <Link
                    to="/register"
                    className="btn btn-link btn-sm text-secondary text-decoration-none"
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

export default connect(null, { verifyUser })(Login);
