import React, { Component } from "react";
import { connect } from "react-redux";
import Header from "../components/Header";
import { allUser, editUser, selectPosts } from "../actions";
import Loading from "../components/Loading";
import fireStorage from "../firebase/config";
import UserListModal from "../components/UserListModal";

export class ProfileView extends Component {
  componentDidMount() {
    this.props.allUser();
  }

  updateFollow = (otherUserId) => {
    const { currentUser, users } = this.props;

    let otherUser = users[otherUserId];

    let followingUser = currentUser.following.includes(otherUserId);

    if (followingUser) {
      this.props.editUser({
        ...currentUser,
        following: currentUser.following.filter((id) => id !== otherUserId)
      });
      this.props.editUser({
        ...otherUser,
        followers: otherUser.followers.filter((id) => id !== currentUser._id)
      });
    } else {
      this.props.editUser({
        ...currentUser,
        following: [...currentUser.following, otherUserId]
      });
      this.props.editUser({
        ...otherUser,
        followers: [...otherUser.followers, currentUser._id]
      });
    }
  };

  render() {
    let { currentUser, currentUserPost, users } = this.props;

    if (!currentUser) return <Loading />;

    let followersList = [];
    let followingList = [];
    followersList = currentUser.followers.map(
      (followerId) => users[followerId]
    );
    followingList = currentUser.following.map(
      (followingId) => users[followingId]
    );

    return (
      <React.Fragment>
        <Header />
        <div className="container py-5">
          <div className="row">
            <div className="col-md-3 pb-3 text-center">
              <img
                src={currentUser.imgurl}
                className="profile-pic bg-grad-1 rounded-pill p-1"
                alt="profile-pic"
              />
            </div>
            <div className="col-md-9 profile-title p-4">
              <div className="display-4">{currentUser.name}</div>
              <button className="btn btn-primary">Follow</button>
            </div>
            <div className="col-md-12 py-3">
              <div className="btn-group w-100">
                <button className="btn btn-light btn-sm">
                  <span className="font-weight-bold mr-1">
                    {/* {currentUserPost.length} */}
                  </span>
                  Posts
                </button>
                <button
                  className="btn btn-light btn-sm"
                  data-toggle="modal"
                  data-target="#followersModal"
                  onClick={() => {
                    // this.setEdit(currentUser);
                  }}
                >
                  <span className="font-weight-bold mr-1">
                    {/* {currentUser.followers.length} */}
                  </span>
                  Follower
                </button>
                <button
                  className="btn btn-light btn-sm"
                  data-toggle="modal"
                  data-target="#followingModal"
                  onClick={() => {
                    // this.setEdit(currentUser);
                  }}
                >
                  <span className="font-weight-bold mr-1">
                    {/* {currentUser.following.length} */}
                  </span>
                  Following
                </button>
              </div>
            </div>
          </div>

          <div className="postHolder">
            {currentUserPost.map((post) => (
              <div className="postCard" key={post._id}>
                <img
                  src={post.imgurl}
                  alt={post.title}
                  className="rounded post-img shadow-sm"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Followers list Modal */}
        <UserListModal
          type="followers"
          followersList={followersList}
          followingList={followingList}
          addRemoveId={this.updateFollow}
        />
        {/* Following list Modal */}
        <UserListModal
          type="following"
          followersList={followersList}
          followingList={followingList}
          addRemoveId={this.updateFollow}
        />
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  //   const currentUser = JSON.parse(window.localStorage.getItem("currentUser"));
  //   //currentUserPost
  //   const currentUserPost = Object.entries(state.posts)
  //     .filter(([key, value]) => value.user_id === currentUser.userId)
  //     .map((post) => post[1])
  //     .reverse();
  //   return {
  //     currentUser: state.users[currentUser.userId],
  //     currentUserPost,
  //     users: state.users
  //   };
}

export default connect(mapStateToProps, { allUser, editUser, selectPosts })(
  ProfileView
);
