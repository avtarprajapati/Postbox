import React, { Component } from "react";
import Header from "../components/Header";
import FileUpload from "../components/FileUpload";

export class Upload extends Component {
  render() {
    return (
      <div>
        <Header />
        <FileUpload />
      </div>
    );
  }
}

export default Upload;
