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
          <nav className="navbar navbar-expand-lg navbar-light p-2">
            <Link
              className="h3 mb-0 text-dark text-decoration-none logo"
              to="/"
            >
              <span className="text-danger">Post</span>box
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
                    <i className="fa fa-home fa-fw fa-2x text-dark"></i>
                    <span className="autohide"> Home</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/explore">
                    <i className="fa fa-compass fa-fw fa-2x text-dark"></i>
                    <span className="autohide"> Explore</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/upload">
                    <i className="fa fa-plus-circle fa-fw fa-2x text-dark"></i>
                    <span className="autohide"> Upload</span>
                  </Link>
                </li>

                <li className="nav-item dropdown">
                  <button
                    className="btn bg-grad-1 rounded-pill btn-lg p-1 mb-1 ml-2"
                    id="navbarDropdownMenuLink"
                    data-toggle="dropdown"
                  >
                    <img
                      src={currentUser.imgurl}
                      alt="profile-pic"
                      className="rounded-pill"
                      height="40"
                      width="40"
                    />
                  </button><span className="autohide"><i className="fa fa-caret-down mr-2"></i></span>
                  

                  <div
                    className="dropdown-menu dropdown-menu-right shadow-sm border-0"
                    aria-labelledby="navbarDropdownMenuLink"
                  >
                    <ul className="list-group list-group-flush">
                      <li className="dropdown-item px-2 disabled">
                        <div className="h5 mb-0">
                          <i className="fa fa-user-circle mr-2"></i>
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
