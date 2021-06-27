import React, { Component } from "react";
import NavBar from "./../navBar";
import auth from "../../services/authServices";
import { Link } from "react-router-dom";
class ManageUser extends Component {
  state = {
    users: [],
  };

  async componentDidMount() {
    let users = await auth.getUsers();
    console.log(users);
    this.setState({ users });
  }
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
          <br />
          <div className="row text-center ">
            <div
              className="col"
              style={{ fontSize: 25, fontWeight: "500", paddingBottom: 4 }}
            >
              Users
            </div>
          </div>
          <br />
          <br />
          {this.state.users.length > 0 ? (
            <React.Fragment>
              <div className="row text-center" style={{ fontWeight: "500" }}>
                <div className="col-4">Name</div>
                <div className="col-4">Email</div>
                <div className="col-4">Mobile</div>
              </div>

              <br />
              {this.state.users.map((user, index) => (
                <div
                  key={index}
                  className="row text-center"
                  style={{ fontSize: 14 }}
                >
                  <div className="col-4">{user.name}</div>
                  <div className="col-4">{user.email}</div>
                  <div className="col-4">{user.mobile}</div>
                </div>
              ))}
            </React.Fragment>
          ) : (
            ""
          )}

          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
        </div>
      </div>
    );
  }
}

export default ManageUser;
