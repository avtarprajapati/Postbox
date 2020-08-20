import React, { Component } from "react";
import { connect } from "react-redux";
import Header from "../components/Header";
import FileUpload from "../components/FileUpload";
import { createPost } from "../actions/index";

export class Upload extends Component {
  state = { url: "", title: "" };
  onUpload = (url) => {
    console.log(url);
    this.setState({ url });
    // this.props.createPost({ url });
  };
  title = (title) => {
    console.log(title);
    this.setState({ title });
  };
  componentDidUpdate() {
    const { url, title } = this.state;
    if (url && title) {
      this.props.createPost({ url, title });
    }
  }
  render() {
    return (
      <div>
        <Header />
        <FileUpload upload={this.onUpload} title={this.title} />

        <div className="container-fluid">
              <div className="col-md-5 mx-auto">
                  <div className="bg-grad-1 text-light rounded-lg p-3 shadow-sm">
                    <div className="h2">Create</div>
                    <form>
                        <input className="form-control my-3 rounded-pill" placeholder="Title" />
                        <input className="form-control my-3 rounded-pill" placeholder="Image" />
                        <input className="form-control my-3 rounded-pill" placeholder="Title" />
                        <button className="btn btn-light rounded-pill">Upload</button>
                    </form>
                  </div>
              </div>
        </div>
      </div>
    );
  }
}

export default connect(null, { createPost })(Upload);
