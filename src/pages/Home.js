import React, { Component } from "react";
import { connect } from "react-redux";
import Header from "../components/Header";
import { allUser, selectPosts } from "../actions";
import Loading from "../components/Loading";
import Footer from "../components/Footer";

export class Home extends Component {
  componentDidMount() {
    this.props.allUser();
    this.props.selectPosts();
  }
  render() {
    const { followingListInfo } = this.props;
    if (!followingListInfo) return <Loading />;

    return (
      <React.Fragment>
        <Header />
        <div className="container py-5 min-height">
          <div className="h4 mb-5 text-secondary text-center">Recent Posts</div>
          <div className="postHolder pb-4">
            {followingListInfo.map((post) => (
              <div className="postCard card border-0" key={post._id}>

                <div className="card-title px-2 small my-1">
                  <i className="fa fa-user-circle"></i> {post.username}
                </div>
                <img
                  src={post.imgurl}
                  alt={post.title}
                  className="post-img rounded"
                />
                <div className="card-title px-2 my-1">
                  <i className="fa fa-heart-o fa-fw mr-2"></i>
                  <i className="fa fa-comment-o fa-fw mr-2"></i>
                  <i className="fa fa-share fa-fw mr-2"></i>
                </div>
              </div>
            ))}
          </div>
        </div>
        <Footer/>
      </React.Fragment>
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
