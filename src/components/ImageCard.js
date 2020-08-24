import React, { Component } from "react";
import Loading from "./Loading";
import { connect } from "react-redux";
import { allUser } from "../actions";

export class Card extends Component {
  componentDidMount() {
    this.props.allUser();
  }

  render() {
    const { post, userDetail } = this.props;
    if (!post && !userDetail) return <Loading />;

    return (
      <div className="postCard card border-0">
        <div className="card-title px-2 small my-1">
          <img
            src={userDetail.imgurl}
            alt="profile-pic"
            style={{ width: "20px", height: "20px" }}
          />
          <span className="bold">{post.username}</span>
        </div>
        <img src={post.imgurl} alt={post.title} className="post-img rounded" />
        <div className="card-title px-2 my-1">
          <i className="fa fa-heart-o fa-fw mr-2"></i>
          <i className="fa fa-comment-o fa-fw mr-2"></i>
          <i className="fa fa-share fa-fw mr-2"></i>
        </div>
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

export default connect(mapStateToProps, { allUser })(Card);
