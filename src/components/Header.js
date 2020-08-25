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
          <nav className="navbar navbar-expand-lg navbar-light p-1">
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
                  <i className="fa fa-home fa-fw fa-2x text-dark"></i> Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/explore">
                  <i className="fa fa-compass fa-fw fa-2x text-dark"></i> Explore
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/upload">
                  <i className="fa fa-plus-circle fa-fw fa-2x text-dark"></i> Upload
                  </Link>
                </li>

                <li className="nav-item dropdown">
                <button className="btn btn-light btn-lg pt-1 pl-1 pr-2 pb-0 rounded-pill dropdown-toggle" id="navbarDropdownMenuLink" data-toggle="dropdown">
                <img
                      src={currentUser.imgurl}
                      alt="profile-pic"
                      className="rounded-pill bg-grad-1 p-1 mb-1 mr-2"
                      style={{ width: "40px", height: "40px" }}
                />
                {currentUser.name}
                </button>
                
                  <div
                    className="dropdown-menu dropdown-menu-right shadow-sm border-0"
                    aria-labelledby="navbarDropdownMenuLink"
                  ><ul className="list-group list-group-flush">
                    <li className="dropdown-item p-2 disabled text-center">
                    <img
                      src={currentUser.imgurl}
                      alt="profile-pic"
                      height="80"
                      width="80"
                      className="bg-grad-1 rounded-pill p-1 mb-3 mr-1"
                    /><br/>
                    {currentUser.name}
                    </li>

                    <div className="dropdown-divider"></div>

                    <li className="dropdown-item px-1">
                      <Link className="nav-link" to="/profile">
                        <i className="fa fa-user-circle mr-2"></i>Profile
                      </Link>
                    </li>
                    <li className="dropdown-item px-1">
                      <Link className="nav-link" to="/" onClick={this.onLogOut}>
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
