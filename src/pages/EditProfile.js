import React, { Component } from "react";
import Header from "../components/Header";

export class EditProfile extends Component {
  render() {
    return (
      <>
        <Header />
        <div className="container mt-5">
          <h2 className="display-5">EditProfile</h2>
        </div>
      </>
    );
  }
}

export default EditProfile;
