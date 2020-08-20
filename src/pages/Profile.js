import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Header from "../components/Header";
import { allUser, selectPosts } from "../actions";

export class Profile extends Component {
  componentDidMount() {
    this.props.allUser();
    this.props.selectPosts();
  }
  render() {
    let { currentUser, currentUserPost } = this.props;
    // console.log(currentUser);

    if (!currentUser) return "Please wait while fetching your details";

    return (
      <>
        <Header />
        <div className="container mt-5">
          <div className="row bg-light">
            <div className="col-3 col-sm-5">
              <img
                src={currentUser.imgurl}
                alt={`${currentUser.name}`}
                style={{ width: "10rem", height: "10rem", borderRadius: "50%" }}
              />
            </div>
            <div className="col-9 col-sm-7">
              <h4 className="mt-5">{currentUser.name}</h4>
              <Link
                to="/edit-profile"
                className="text-secondary w-100"
                style={{ textDecoration: "none" }}
              >
                Edit Profile
              </Link>
            </div>
            <div className="row mx-auto" style={{ marginTop: "-2rem" }}>
              <div className="col-4">
                <span className="font-weight-bold mr-1">
                  {currentUserPost.length}
                </span>
                Posts
              </div>
              <div className="col-4">
                <span className="font-weight-bold mr-1">
                  {currentUser.following.length}
                </span>
                Follower
              </div>
              <div className="col-4">
                <span className="font-weight-bold mr-1">
                  {currentUser.following.length}
                </span>
                Following
              </div>
            </div>
          </div>
          <hr className="bg-grad-2" style={{ height: "1px" }} />
          <div className="row">
            {currentUserPost.map((post) => (
              <div
                className="col-sm m-2"
                key={post._id}
                style={{ width: "20px", height: "20px" }}
              >
                <img src={post.imgurl} alt={post.title} className="w-100" />
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }
}

function mapStateToProps(state) {
  const currentUser = JSON.parse(window.localStorage.getItem("currentUser"));

  //currentUserPost
  const currentUserPost = Object.entries(state.posts)
    .filter(([key, value]) => value.user_id === currentUser.userId)
    .map((post) => post[1]);

  return {
    currentUser: state.users[currentUser.userId],
    currentUserPost
  };
}

export default connect(mapStateToProps, { allUser, selectPosts })(Profile);
