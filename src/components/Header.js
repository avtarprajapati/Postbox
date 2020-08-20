import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import history from "../routes/history";
import { allUser } from "../actions/index";
import Loading from "./Loading";

export class Title extends Component {
  componentDidMount() {
    this.props.allUser();
  }
  onLogOut = () => {
    window.localStorage.removeItem("token");
    history.push("/");
  };
  render() {
    const { currentUser } = this.props;
    if (!currentUser)
      return (<Loading/>);

    return (
      <div className="container-fluid p-0 bg-light shadow-sm">
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link
              className="h2 mb-0 mt-2 text-dark text-decoration-none logo"
              to="/"
            >
              Postbox
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarNav"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/upload">
                    Upload
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/profile">
                    Profile
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/" onClick={this.onLogOut}>
                    Logout
                  </Link>
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
  const currentUser = JSON.parse(window.localStorage.getItem("currentUser"));
  return {
    currentUser: state.users[currentUser.userId]
  };
}

export default connect(mapStateToProps, { allUser })(Title);
