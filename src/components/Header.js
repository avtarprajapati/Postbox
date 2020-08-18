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
    if (!currentUser) return "please wait";
    const imgurl = "https://avatars.dicebear.com/api/bottts/7895.svg";
    return (
      <div className="container-fluid p-0 bg-light shadow-sm">
        <div className="container">
          <div className="pos-f-t">
            <nav className="navbar navbar-light">
              <Link to="/" className="navbar-brand">
                PostBox
              </Link>
              <button
                className="btn btn-light"
                data-toggle="collapse" data-target="#collapseExample"
              >
                <i className="fa fa-bars"></i>
              </button>
            </nav>

            <div class="collapse" id="collapseExample">
              <div className="p-2 row text-center">
                <div className="col-md-3 m-0">
                  <img
                    src={imgurl}
                    className="w-50 bg-grad-2 p-1 rounded-pill shadow my-4"
                    alt="Profile"
                  />
                  <div className="h3 mt-0 mb-4">
                    {/* {currentUser.name} */}User
                    <i className="fa fa-check-circle text-primary ml-1"></i>
                  </div>
                  {/* <hr className="my-3 bg-grad-2 pt-1 rounded" /> */}
                </div>
                <div className="col-md-6"></div>
                <div className="col-md-3 m-0">
                  <Link
                    to="/profile"
                    className="btn btn-light w-100 mb-2"                  
                  >
                    Profile
                  </Link>
                  <Link
                    to="/upload"
                    className="btn btn-light w-100 mb-2"
                  >
                    Upload
                  </Link>
                  <Link
                    to="/explore"
                    className="btn btn-light w-100 mb-2"                    
                  >
                    Explore
                  </Link>
                  <button
                    className="btn btn-light text-danger w-100 mb-2"               
                    onClick={this.onLogOut}
                  >
                    Logout
                  </button>
                  <button className="btn btn-light" data-toggle="collapse" data-target="#collapseExample">
                    <i className="fa fa-times"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
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
