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
    if (!currentUser) return <Loading />;

    return (
      <div className="container-fluid py-0 px-0 bg-light shadow-sm">
        <div className="container px-0">
          <nav className="navbar navbar-expand-lg navbar-light py-1 px-2">
            <Link
              className="h3 mb-0 text-dark text-decoration-none logo"
              to="/"
            >
              <span className="text-danger">Post</span>box
            </Link>
            <button
              className="btn btn-link navbar-toggler border-0 px-1"
              type="button"
              data-toggle="collapse"
              data-target="#navbarNav"
            >
              <img
                src={currentUser.imgurl}
                alt="profile-pic"
                className="rounded-pill bg-grad-1 p-1"
                height="40"
                width="40"
              />
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link
                    className="btn btn-link text-decoration-none text-dark pl-1 pr-3"
                    to="/"
                  >
                    <img
                      src={require("../assets/home.png")}
                      alt="nav-pic"
                      className="rounded-pill"
                      height="40"
                      width="40"
                    />
                    <span className="autohide"> Home</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="btn btn-link text-decoration-none text-dark pl-1 pr-3"
                    to="/explore"
                  >
                    <img
                      src={require("../assets/compass.png")}
                      alt="nav-pic"
                      className="rounded-pill"
                      height="40"
                      width="40"
                    />
                    <span className="autohide"> Explore</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="btn btn-link text-decoration-none text-dark pl-1 pr-3"
                    to="/upload"
                  >
                    <img
                      src={require("../assets/plus.png")}
                      alt="nav-pic"
                      className="rounded-pill"
                      height="40"
                      width="40"
                    />
                    <span className="autohide"> Upload</span>
                  </Link>
                </li>

                <li className="nav-item dropdown">
                  <button
                    className="btn btn-link text-decoration-none text-dark pl-1"
                    id="navbarDropdownMenuLink"
                    data-toggle="dropdown"
                  >
                    <img
                      src={require("../assets/user.png")}
                      alt="nav-pic"
                      className="rounded-pill"
                      height="40"
                      width="40"
                    />
                    <span className="autohide">
                      {currentUser.name}
                      <i className="fa fa-caret-down ml-2"></i>
                    </span>
                  </button>

                  <div
                    className="dropdown-menu dropdown-menu-right shadow-sm border-0"
                    aria-labelledby="navbarDropdownMenuLink"
                  >
                    <ul className="list-group list-group-flush">
                      <li className="dropdown-item px-2 disabled">
                        <div className="h5 mb-0">
                          <img
                            src={currentUser.imgurl}
                            alt="profile-pic"
                            className="rounded-pill bg-grad-1 p-1 mr-2"
                            height="40"
                            width="40"
                          />
                          {currentUser.name}
                        </div>
                      </li>
                      <div className="dropdown-divider"></div>
                      <li className="dropdown-item p-1">
                        <Link className="nav-link" to="/profile">
                          <i className="fa fa-id-card-o mr-2"></i>Profile
                        </Link>
                      </li>
                      <li className="dropdown-item p-1">
                        <Link
                          className="nav-link"
                          to="/"
                          onClick={this.onLogOut}
                        >
                          <i className="fa fa-power-off text-danger mr-2"></i>
                          Logout
                        </Link>
                      </li>
                    </ul>
                  </div>
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
    currentUser: state.users[currentUser.userId],
  };
}

export default connect(mapStateToProps, { allUser })(Title);
