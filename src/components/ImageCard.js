import React, { Component } from "react";
import Loading from "./Loading";
import { connect } from "react-redux";
import { allUser } from "../actions";

import LazyLoad from 'react-lazyload';

export class Card extends Component {
  componentDidMount() {
    this.props.allUser();
  }

  render() {
    const { post, userDetail } = this.props;
    if (!post && !userDetail) return <Loading />;

    const postdate = new Date(post.createdAt);

    return (
      <div className="postCard card mb-3 py-1 border-0">
        <LazyLoad height={200}>
        <div className="px-2 my-1">
          <img
            src={userDetail.imgurl}
            alt="profile-pic"
            className="bg-grad-1 rounded-pill mb-1 p-1 mr-2"
            style={{ width: "40px", height: "40px" }}
          />
          {post.username}
        </div>
        <img src={post.imgurl} alt={post.title} className="post-img rounded"/>
        <div className="px-2">
          <div className="mt-2">
            <i className="fa fa-heart-o fa-fw fa-2x mr-2"></i>
            <i className="fa fa-comment-o fa-fw fa-2x mr-2"></i>
            <a className="text-decoration-none text-dark" href={post.imgurl} download>
              <i className="fa fa-bookmark-o fa-fw fa-2x float-right"></i></a>
          </div>
          <div className="mt-2">
            <span className="font-weight-bold mr-2">{post.username}</span>
            {post.title}
          </div>
          <div className="mt-1 mb-3 text-muted small">
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
    userDetail: state.users[user_id],
  };
}

export default connect(mapStateToProps, { allUser })(Card);
