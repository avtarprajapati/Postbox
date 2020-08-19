import React, { Component } from "react";
import Header from "../components/Header";

export class Profile extends Component {
  render() {
    return (
      <>
        <Header />
        <div className="container mt-5">
          <h2 className="display-5">Profile</h2>
        </div>
      </>
    );
  }
}

export default Profile;
