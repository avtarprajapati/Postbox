import React, { Component } from "react";
import Loading from "./Loading";
import { connect } from "react-redux";
import { allUser, editPost } from "../actions";
import history from "../routes/history";

import LazyLoad from "react-lazyload";

export class Card extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false
    };
  }

  componentDidMount() {
    this.props.allUser();
  }

  funToggleComment = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  viewProfile = (id) => {
    const currentUser = JSON.parse(window.localStorage.getItem("currentUser"));
    if (id === currentUser.userId) return history.push("/profile");
    history.push(`/profile-view/${id}`);
  };

  onLike = (post) => {
    const currentUser = JSON.parse(window.localStorage.getItem("currentUser"));
    let likedby = [];
    if (post.likedby.includes(currentUser.userId)) {
      likedby = post.likedby.filter((id) => id !== currentUser.userId);
    } else {
      likedby = [...post.likedby, currentUser.userId];
    }
    this.props.editPost({ ...post, likedby });
  };

  render() {
    const { post, userDetail } = this.props;
    if (!post && !userDetail) return <Loading />;

    const postdate = new Date(post.createdAt);

    const currentUser = JSON.parse(window.localStorage.getItem("currentUser"));
    const isLike = post.likedby.includes(currentUser.userId);

    return (
      <div className="postCard card mb-3 py-1 border-0 d-inline-block w-100">
        <LazyLoad height={200}>
          <div className="px-2 my-1">
            <img
              src={userDetail.imgurl}
              alt="profile-pic"
              className="bg-grad-1 rounded-pill mb-1 p-1"
              height="40"
              width="40"
            />
            <button
              className="btn btn-link text-decoration-none text-dark"
              onClick={() => this.viewProfile(userDetail._id)}
            >
              {post.username}
            </button>
          </div>
          <img
            src={post.imgurl}
            alt={post.title}
            className="post-img rounded"
            onClick={(e) => {
              // TODO:- One Click to open Modal show pic & comments details
              // if (e.detail === 1) console.log("once click");
              if (e.detail === 2) this.onLike(post);
            }}
          />
          <div className="px-2">
            <div className="mt-2">
              <button
                className="btn btn-link text-decoration-none text-dark p-0 mr-3"
                onClick={() => this.onLike(post)}
              >
                <img
                  src={require(`../assets/${
                    isLike ? "heart-filled" : "heart"
                  }.png`)}
                  alt="profile-pic"
                />
              </button>
              <button
                className="btn btn-link text-decoration-none text-dark p-0"
                onClick={this.funToggleComment}
              >
                <img src={require("../assets/comment.png")} alt="profile-pic" />
              </button>
              <a
                className="text-decoration-none text-dark float-right"
                href={post.imgurl}
                download
              >
                <img
                  src={require("../assets/bookmark.png")}
                  alt="profile-pic"
                />
              </a>
            </div>
            <div className="mt-2 small font-weight-bold">
              {post.likedby.length} Likes
            </div>
            <div className="mt-2">
              <span className="font-weight-bold mr-2">{post.username}</span>
              {post.title}
            </div>
            {this.state.isOpen ? (
              <div className="my-3 row border rounded">
                <div className="col-9 px-0">
                  <input
                    type="text"
                    className="form-control border-0"
                    placeholder="Write a Comment"
                  />
                </div>
                <div className="col-3 pl-1 pr-0">
                  <button className="btn btn-light w-100">Post</button>
                </div>
              </div>
            ) : null}

            <div className="mt-1 mb-3 text-muted ultra-small">
              {postdate.toDateString()}
            </div>
          </div>
        </LazyLoad>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  const { user_id } = ownProps.post;
  return {
    userDetail: state.users[user_id]
  };
}

export default connect(mapStateToProps, { allUser, editPost })(Card);
