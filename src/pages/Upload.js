import React, { Component } from "react";
import { connect } from "react-redux";
import Header from "../components/Header";
import { createPost } from "../actions/index";
import fireStorage from "../firebase/config";

export class Upload extends Component {
  state = { url: "", title: "", file: null };

  componentDidUpdate() {
    const { url, title } = this.state;
    if (url && title) {
      this.props.createPost({ url, title });
      console.log(title, url);
    }
  }

  onUpload = (e) => {
    e.preventDefault();
    console.log(this.state);
    const { file } = this.state;
    if (file) {
      const newImage = fireStorage.child(file.name);
      newImage.put(file).then((snap) => {
        newImage.getDownloadURL().then((url) => this.setState({ url: url }));
      });
    }
  };

  onFileSelect = (e) => {
    this.setState({ file: e.target.files[0] });
    console.log(e.target.files[0]);
  };

  render() {
    return (
      <div>
        <Header />

        <div className="container-fluid mt-5">
          <div className="col-md-5 mx-auto">
            <div className="bg-grad-1 text-light rounded-lg p-3 shadow-sm">
              <div className="h2">Create Post</div>
              <form>
                <input
                  type="text"
                  className="form-control my-3 rounded-pill"
                  placeholder="Title"
                  value={this.state.title}
                  onChange={(e) => this.setState({ title: e.target.value })}
                />
                <input
                  type="file"
                  className="form-control my-3 rounded-pill"
                  placeholder="Image"
                  // value={this.state.file.name}
                  onChange={this.onFileSelect}
                />
                <button
                  className="btn btn-light rounded-pill"
                  onClick={this.onUpload}
                >
                  Upload
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, { createPost })(Upload);
