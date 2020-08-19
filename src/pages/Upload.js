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
      </div>
    );
  }
}

export default connect(null, { createPost })(Upload);
