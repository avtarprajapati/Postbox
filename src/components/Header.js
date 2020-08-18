import React, { Component } from "react";
import {Link} from 'react-router-dom';

export class Title extends Component {
  render() {
    const imgurl = "https://avatars.dicebear.com/api/bottts/7895.svg"
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
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content"> 
                <div className="modal-body p-0">
                  <div className="text-center p-2 row rounded">
                    <div className="col-md-8 m-0">
                      <img src={imgurl} className="w-50 bg-grad-2 p-1 rounded-pill my-4" alt="menu" />
                      <div className="h3 mt-0 mb-4">Username <i className="fa fa-check-circle text-primary"></i></div>
                      {/* <hr className="my-3 bg-grad-2 pt-1 rounded"/> */}
                    </div>
                    <div className="col-md-4 m-0">
                      <Link to="/" className="btn btn-light btn-lg w-100 mb-2" data-dismiss="modal">Profile</Link>
                      <Link to="/" className="btn btn-light btn-lg w-100 mb-2" data-dismiss="modal">Posts</Link>
                      <Link to="/" className="btn btn-light btn-lg w-100 mb-2" data-dismiss="modal">Discover</Link>
                      <Link to="/" className="btn btn-light btn-lg text-danger w-100 mb-2" data-dismiss="modal">Logout</Link>
                      <button className="btn btn-light" data-dismiss="modal">
                            <i className="fa fa-times"></i>
                      </button>
                    </div>
                  </div>
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
