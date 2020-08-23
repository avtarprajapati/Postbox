import React, { Component } from "react";
import { connect } from "react-redux";
import Header from "../components/Header";
import { allUser, selectPosts } from "../actions";
import Loading from "../components/Loading";

export class Home extends Component {
  componentDidMount() {
    this.props.allUser();
    this.props.selectPosts();
  }
  render() {
    const { followingListInfo } = this.props;
    if (!followingListInfo) return <Loading />;

    return (
      <>
        <Header />
        <div className="container mt-5">
          <div className="postHolder">
            {followingListInfo.map((post) => (
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
      </>
    );
  }
}

function mapStateToProps(state) {
  let currentUser = JSON.parse(window.localStorage.getItem("currentUser"));

  currentUser = state.users[currentUser.userId];
  if (currentUser && currentUser.following) {
    var followingListInfo = Object.entries(state.posts)
      .filter(
        ([key, value]) =>
          currentUser.following.includes(value.user_id) ||
          value.user_id === currentUser._id
      )
      .map((userPost) => userPost[1])
      .reverse();
  }

  return {
    currentUser,
    followingListInfo
  };
}

export default connect(mapStateToProps, { allUser, selectPosts })(Home);
