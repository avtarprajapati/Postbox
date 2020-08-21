import React, { Component } from "react";
import { connect } from "react-redux";
import Header from "../components/Header";
import { allUser, editUser, selectPosts } from "../actions";
import Loading from "../components/Loading";
import fireStorage from "../firebase/config";

export class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      _id: "",
      name: "",
      email: "",
      dob: "",
      imgurl: "",
      password: "",
      file: null,
      following: [],
      followers: []
    };
  }

  componentDidMount() {
    this.props.allUser();
    this.props.selectPosts();
  }

  setEdit = (user) => {
    this.setState({ ...user });
  };

  funChangeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onUpdateUser = () => {
    const { file } = this.state;

    if (file) {
      const newImage = fireStorage.child(file.name);
      newImage.put(file).then(async (snap) => {
        const url = await newImage.getDownloadURL();
        this.setState({ imgurl: url });
      });
    }
  };

  componentDidUpdate(prevProps, prevState) {
    const {
      _id,
      name,
      email,
      dob,
      imgurl,
      password,
      following,
      followers
    } = this.state;

    if (
      prevState.name !== name ||
      prevState.email !== email ||
      prevState.dob !== dob ||
      prevState.imgurl !== imgurl ||
      prevState.password !== password
    ) {
      this.props.editUser({
        _id,
        name,
        email,
        dob,
        imgurl,
        password,
        following,
        followers
      });
    }
  }

  render() {
    let { currentUser, currentUserPost, users } = this.props;

    if (!currentUser) return <Loading />;

    console.log(users);
    let followersList = [];
    followersList = currentUser.followers.map(
      (followerId) => users[followerId]
    );
    console.log(followersList);

    return (
      <React.Fragment>
        <Header />
        <div className="container py-5">
          <div className="row">
            <div className="col-md-3 pb-3 text-center">
              <img
                src={currentUser.imgurl}
                // alt={`${currentUser.name}`}
                className="profile-pic bg-grad-1 rounded-pill p-1"
                alt="profile-pic"
              />
            </div>
            <div className="col-md-9 profile-title p-4">
              <div className="display-4">{currentUser.name}</div>
              <button
                data-toggle="modal"
                data-target="#editModal"
                className="btn btn-link btn-sm text-secondary text-decoration-none mb-4"
                onClick={() => {
                  this.setEdit(currentUser);
                }}
              >
                Edit Profile
              </button>
            </div>
            <div className="col-md-12 py-3">
              <div className="btn-group w-100">
                <button className="btn btn-light btn-sm">
                  <span className="font-weight-bold mr-1">
                    {currentUserPost.length}
                  </span>
                  Posts
                </button>
                <button
                  className="btn btn-light btn-sm"
                  data-toggle="modal"
                  data-target="#followersModal"
                >
                  <span className="font-weight-bold mr-1">
                    {currentUser.followers.length}
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

        {/* modals */}

        <div className="modal fade" id="editModal" tabIndex="-1" role="dialog">
          <div className="modal-dialog modal-dialog-scrollable" role="document">
            <div className="modal-content">
              <div className="modal-body">
                <h5 className="mb-4">Hey {this.state.name} !</h5>
                <div className="text-center my-3">
                  <img
                    src={this.state.imgurl}
                    className="w-50 bg-grad-1 rounded-pill p-1"
                    alt="profile-pic"
                  />
                </div>
                <input
                  type="text"
                  className="form-control my-3"
                  name="name"
                  value={this.state.name}
                  onChange={this.funChangeHandler}
                  placeholder="Name"
                />
                <input
                  type="text"
                  className="form-control my-3"
                  name="email"
                  value={this.state.email}
                  onChange={this.funChangeHandler}
                  placeholder="Email"
                />
                <input
                  type="date"
                  className="form-control my-3"
                  name="dob"
                  value={this.state.dob}
                  onChange={this.funChangeHandler}
                  placeholder="DOB"
                />
                <input
                  type="file"
                  className="form-control p-1 my-3"
                  name="imgurl"
                  // value={this.state.file}
                  onChange={(e) => this.setState({ file: e.target.files[0] })}
                  placeholder="Img"
                />
                <input
                  type="password"
                  className="form-control my-3"
                  name="password"
                  value={this.state.password}
                  onChange={this.funChangeHandler}
                  placeholder="Password"
                />
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={this.onUpdateUser}
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>

        <div
          className="modal fade"
          id="followersModal"
          tabIndex="-1"
          role="dialog"
        >
          <div className="modal-dialog modal-dialog-scrollable" role="document">
            <div className="modal-content">
              <div className="modal-body">
                <h5 className="mb-4 text-center">Followers</h5>
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  &times;
                </button>
                <hr />
                {/* Follower List of user */}
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  const currentUser = JSON.parse(window.localStorage.getItem("currentUser"));

  //currentUserPost
  const currentUserPost = Object.entries(state.posts)
    .filter(([key, value]) => value.user_id === currentUser.userId)
    .map((post) => post[1])
    .reverse();

  return {
    currentUser: state.users[currentUser.userId],
    currentUserPost,
    users: state.users
  };
}

export default connect(mapStateToProps, { allUser, editUser, selectPosts })(
  Profile
);
