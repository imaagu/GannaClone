import React, { Component } from "react";
import NavBar from "./../navBar";
class NoAccess extends Component {
  state = {};
  render() {
    return (
      <div className="container-fluid">
        <NavBar />
        <div
          style={{
            background: "linear-gradient(to bottom , #62a5b5 ,  #315c66)",
            color: "white",
          }}
        >
          <h1 className="text-center m-3">You Can't Access this Page</h1>
        </div>{" "}
      </div>
    );
  }
}

export default NoAccess;
