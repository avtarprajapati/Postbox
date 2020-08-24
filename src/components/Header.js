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
      <div className="container-fluid p-0 bg-light shadow-sm">
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light">
            <Link
              className="h3 mb-0 mt-1 text-dark text-decoration-none logo"
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
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/explore">
                    Explore
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/upload">
                    Upload
                  </Link>
                </li>

                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdownMenuLink"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    {currentUser.name}
                    <img
                      src={currentUser.imgurl}
                      alt="profile-pic"
                      className="bg-grad-1 rounded-pill mb-1 p-1 ml-2 mr-1"
                      style={{ width: "20px", height: "20px" }}
                    />
                  </a>
                  <div
                    className="dropdown-menu dropdown-menu-right shadow-sm border-0"
                    aria-labelledby="navbarDropdownMenuLink"
                  >
                    <li className="dropdown-item">
                      <Link className="nav-link" to="/profile">
                        <i className="fa fa-user-circle mr-2"></i>Profile
                      </Link>
                    </li>
                    <li className="dropdown-item">
                      <Link className="nav-link" to="/" onClick={this.onLogOut}>
                        <i className="fa fa-power-off text-danger mr-2"></i>
                        Logout
                      </Link>
                    </li>
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
