import React, { Component } from "react";
import {Link} from 'react-router-dom';

export class Title extends Component {
  render() {
    return (
      <div className="container-fluid p-0 bg-light shadow-sm">
        <div className="container">
        <div className="pos-f-t">
          <nav className="navbar navbar-light">
            <Link to="/" className="navbar-brand">PostBox</Link>
            <button className="btn btn-light" data-toggle="modal" data-target="#exampleModal">
              <i className="fa fa-bars"></i>
            </button>
          </nav>


          <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-sm modal-dialog-centered" role="document">
              <div className="modal-content"> 
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalCenterTitle"><i className="fa fa-user-circle"></i> Avtar</h5>
                <button type="button" className="btn btn-light btn-sm" data-dismiss="modal" aria-label="Close">
                  <i className="fa fa-times text-danger"></i>
                </button>
              </div> 
                <div className="modal-body p-2">
                  <Link to="/" className="btn btn-light btn-lg w-100 mb-2" data-dismiss="modal">Profile</Link>
                  <Link to="/" className="btn btn-light btn-lg w-100 mb-2" data-dismiss="modal">Posts</Link>
                  <Link to="/" className="btn btn-light btn-lg w-100 mb-2" data-dismiss="modal">Discover</Link>
                  <Link to="/" className="btn btn-light btn-lg text-danger w-100" data-dismiss="modal">Logout</Link>
                </div>
              </div>
            </div>
          </div>
         
        </div>
        </div>
      </div>
    );
  }
}

export default Title;
