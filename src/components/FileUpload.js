import React, { Component } from "react";
import useStorage from "../firebase/useStorage";

export class FileUpload extends Component {
  state = { file: null, url: "", error: "" };

  handleChange = (e) => {
    const selectedFile = e.target.files[0];
    const types = ["image/jpeg", "image/jpg", "image/png"];
    if (selectedFile && types.includes(selectedFile.type)) {
      this.setState({ file: selectedFile, error: "" });
    } else {
      this.setState({
        file: null,
        error: "Please select an image file (jpp,png)"
      });
    }
  };
  render() {
    console.log(this.state.file);
    return (
      <div>
        <form>
          <label>
            <input type="file" onChange={this.handleChange} />
            <span>Upload</span>
          </label>
          <div className="output">
            {this.state.file && <div>{this.state.file.name}</div>}
            {this.state.error && <div>{this.state.error}</div>}
          </div>
        </form>
      </div>
    );
  }
}

export default FileUpload;
