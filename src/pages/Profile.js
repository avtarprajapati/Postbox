import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Header from "../components/Header";
import { allUser, selectPosts } from "../actions";
import Loading from "../components/Loading";

export class Profile extends Component {
  componentDidMount() {
    this.props.allUser();
    this.props.selectPosts();
  }
  render() {
    let { currentUser, currentUserPost } = this.props;
    // console.log(currentUser);

    if (!currentUser) return <Loading />;

    return (
      <>
        <Header />
        <div className="container py-5">
          <div className="row">
            <div className="col-md-3 pb-3 text-center">
              <img
                src={currentUser.imgurl}
                alt={`${currentUser.name}`}
                className="profile-pic bg-grad-1 rounded-pill p-1"
                alt="profile-pic"
              />
            </div>
            <div className="col-md-9 p-4">
              <div className="display-4">{currentUser.name}</div>
              <Link
                to="/edit-profile"
                className="text-secondary small w-100 mb-4"
                style={{ textDecoration: "none" }}
              >
                Edit Profile
              </Link>
            </div>
            <div className="col-md-12 py-3">
              <div className="btn-group w-100">
                <button className="btn btn-light btn-sm">
                  <span className="font-weight-bold mr-1">
                    {currentUserPost.length}
                  </span>
                  Posts
                </button>
                <button className="btn btn-light btn-sm">
                  <span className="font-weight-bold mr-1">
                    {currentUser.following.length}
                  </span>
                  Follower
                </button>
                <button className="btn btn-light btn-sm">
                  <span className="font-weight-bold mr-1">
                    {currentUser.following.length}
                  </span>
                  Following
                </button>
              </div>
            </div>
          </div>

          
          <div className="row">
            {currentUserPost.map((post) => (
              <div className="col-4 m-0 p-1" key={post._id}>
                <img
                  src={post.imgurl}
                  alt={post.title}
                  className="w-100 rounded"
                />
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
    currentUserPost,
  };
}

export default connect(mapStateToProps, { allUser, selectPosts })(Profile);
