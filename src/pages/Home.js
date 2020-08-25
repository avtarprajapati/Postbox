import React, { Component } from "react";
import { connect } from "react-redux";
import Header from "../components/Header";
import { allUser, selectPosts } from "../actions";
import Loading from "../components/Loading";
import Footer from "../components/Footer";
import ImageCard from "../components/ImageCard";

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
        <div className="container-fluid px-0">
          <div className="container py-5 px-0 min-height">
          
          <div className="row m-0 p-0">
            
          <div className="col-md-8 pb-4 p-0 m-0">
          <div className="mb-5 text-secondary text-center">Recent Posts</div>
            {followingListInfo.map((post) => (
              <ImageCard post={post} key={post._id} />
            ))}
          </div>
          </div>
        </div>
        </div>
        <Footer />
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
