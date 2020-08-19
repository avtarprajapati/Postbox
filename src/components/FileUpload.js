import React, { Component } from "react";
import ProgressBar from "./ProgressBar";

export class FileUpload extends Component {
  state = { file: null, url: "", error: "" };

  handleChange = (e) => {
    const selectedFile = e.target.files[0];

    const types = ["image/jpeg", "image/jpg", "image/png"];

    if (selectedFile && types.includes(selectedFile.type)) {
      this.props.title(selectedFile.name);
      this.setState({ file: selectedFile, error: "" });
    } else {
      this.setState({
        file: null,
        error: "Please select an image file (jpp,png)"
      });
    }
  };

  clearFile = () => {
    this.setState({ file: null });
  };

  render() {
    console.log(this.state.file);
    const { file, error } = this.state;
    return (
      <div className="container mt-5">
        <form className="upload-form">
          <label>
            <input type="file" onChange={this.handleChange} />
            <span>+</span>
          </label>
          <div className="output">
            {error && <div className="text-danger">{error}</div>}
            {file && <div>{file.name}</div>}
            {file && (
              <ProgressBar
                file={file}
                clearFile={this.clearFile}
                upload={this.props.upload}
              />
            )}
          </div>
        </form>
      </div>
    );
  }
}

export default FileUpload;
