import React, { Component } from "react";
import { Link } from "react-router-dom";
import { createUser } from "../actions";
import { connect } from "react-redux";

export class Register extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    dob: ""
  };

  onFormRegister = (e) => {
    e.preventDefault();
    this.props.createUser(this.state);
  };

  render() {
    return (
      <div className="container-fluid bg-grad-2 min-height">
        <div className="row">
          <div className="col-md-7 pt-3 mx-auto text-center">
            <div className="bg-light shadow-sm p-2 rounded-lg mt-5">
              <div className="display-4 mt-4 logo">Postbox</div>
              <form className="p-3">
                <div className="row m-0 p-0">
                  <div className="col-md-12">
                    <input
                      type="text"
                      className="form-control rounded-pill my-2"
                      placeholder="Full name"
                      value={this.state.name}
                      onChange={(e) => this.setState({ name: e.target.value })}
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      type="text"
                      className="form-control rounded-pill my-2"
                      placeholder="Email ID"
                      value={this.state.email}
                      onChange={(e) => this.setState({ email: e.target.value })}
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      type="date"
                      className="form-control rounded-pill my-2"
                      placeholder="DOB"
                      value={this.state.dob}
                      onChange={(e) => this.setState({ dob: e.target.value })}
                    />
                  </div>
                  <div className="col-md-12">
                    <input
                      type="password"
                      className="form-control rounded-pill my-2"
                      placeholder="Password"
                      value={this.state.password}
                      onChange={(e) =>
                        this.setState({ password: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <button
                    type="submit"
                    className="btn bg-grad-2 border-0 text-light rounded-pill w-50 mb-2"
                    onClick={(e) => this.onFormRegister(e)}
                  >
                    Register
                  </button>
                  <hr className="my-3" />
                  <Link
                    to="/login"
                    className="btn btn-link btn-sm text-secondary text-decoration-none"
                  >
                    Already have an account ? login here
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

export default connect(null, { createUser })(Register);
