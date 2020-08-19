import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import history from "../routes/history";

export class Title extends Component {
  onLogOut = () => {
    window.localStorage.removeItem("token");
    console.log("go to login");
    history.push("/");
  };
  render() {
    console.log(this.props.currentUser);
    const { currentUser } = this.props;
    if (!currentUser)
      return (
        <div className="text-center pt-5">
          <div className="h2">Loading <i className="fa fa-spinner fa-spin"></i> </div>
        </div>
      );

    return (
      <div className="container-fluid p-0 bg-light shadow-sm">
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="#">Navbar</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/">Home</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/">Upload</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/">Profile</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/">Logout</Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log(state.users);
  const currentUser = JSON.parse(window.localStorage.getItem("currentUser"));

  return {
    currentUser: state.users[currentUser.userId],
  };
}

export default connect(mapStateToProps)(Title);
