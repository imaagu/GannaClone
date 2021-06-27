import React, { Component } from "react";

import NavBar from "./../navBar";
import fb from "../../images/fb.svg";
import goog from "../../images/google.png";
import email from "../../images/email.png";
import { Link } from "react-router-dom";
import auth from "../../services/authServices";

import SignForm from "./signupForm";
class Signup extends Component {
  state = { data: [] };

  handleSubmit = async (value) => {
    try {
      //console.log(value);
      let res = await auth.register(
        value.dob,
        value.age,
        value.email,
        value.name,
        value.mobile,
        value.password
      );
      //console.log(value);
      if (res) {
        window.location = "/login";
      } else {
        alert("Some Error Occur, please try again");
        window.location = "signup";
      }
    } catch (ex) {
      alert("Some Error Occur, please try again");
      window.location = "/signup";
    }
  };

  render() {
    return (
      <div>
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
              INDIA'S NO. 1 MUSIC APP
            </div>
          </div>
          <div className="row text-center">
            <div
              className="col"
              style={{
                fontSize: 13,
                color: "#cce1e6",
                fontWeight: "500",
                paddingBottom: 4,
              }}
            >
              Over 30 million songs to suit every mood and occasion
            </div>
          </div>
          <br />
          <div className="row text-center">
            <div
              className="col-12"
              style={{
                fontSize: 12,
                color: "#cce1e6",
                fontWeight: "500",
                paddingBottom: 4,
              }}
            >
              <div className="row ">
                <div className="col-4">
                  <div className="row">
                    <div className="col-12">
                      <i
                        style={{
                          fontSize: 30,
                          paddingBottom: 1,
                          color: "#e72c30",
                        }}
                        className="far fa-play-circle"
                      ></i>
                    </div>
                    <div
                      style={{ color: "white" }}
                      className="col-12 text-center"
                    >
                      Create your <br /> own playlists
                    </div>
                  </div>
                </div>
                <div className="col-4">
                  <div className="row">
                    <div className="col-12 ">
                      <i
                        style={{
                          fontSize: 30,
                          paddingBottom: 1,
                          color: "#e72c30",
                        }}
                        className="fas fa-share"
                      ></i>
                    </div>
                    <div style={{ color: "white" }} className="col-12">
                      Share music with
                      <br />
                      family and friends
                    </div>
                  </div>
                </div>
                <div className="col-4">
                  <div className="row">
                    <div className="col-12 ">
                      <i
                        style={{
                          fontSize: 30,
                          paddingBottom: 1,
                          color: "#e72c30",
                        }}
                        className="fas fa-heart"
                      ></i>
                    </div>
                    <div style={{ color: "white" }} className="col-12">
                      Save your
                      <br />
                      favourites
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row m-3">
            <div className="col border-bottom" style={{ color: "white" }}></div>
          </div>
          <SignForm onSubmit={this.handleSubmit} />
          <div className="row m-3">
            <div className="col border-bottom" style={{ color: "white" }}></div>
          </div>

          <div className="row" style={{ color: "#cce1e6", fontSize: 16 }}>
            <div className="col text-center">
              Have Account. &nbsp;
              <Link to="/login" style={{ fontWeight: "500", fontSize: 25 }}>
                Login
              </Link>
            </div>
          </div>
          <br />

          <div className="row">
            <div
              style={{ color: "#cce1e6", fontSize: 16 }}
              className="col text-center"
            >
              or continue with
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col text-center">
              <div className="row">
                <div className="col-4" style={{ cursor: "pointer" }}>
                  <div className="row">
                    <div className="col-12">
                      <img alt="" src={fb} style={{ height: 40 }} />
                    </div>
                    <div
                      className="col-12"
                      style={{
                        color: "#cce1e6",
                        fontSize: 16,
                        fontWeight: "500",
                      }}
                    >
                      Facebook
                    </div>
                  </div>
                </div>
                <div className="col-4" style={{ cursor: "pointer" }}>
                  <div className="row">
                    <div className="col-12">
                      <img alt="" src={goog} style={{ height: 40 }} />
                    </div>
                    <div
                      className="col-12"
                      style={{
                        color: "#cce1e6",
                        fontSize: 16,
                        fontWeight: "500",
                      }}
                    >
                      Google
                    </div>
                  </div>
                </div>
                <div className="col-4" style={{ cursor: "pointer" }}>
                  <div className="row">
                    <div className="col-12">
                      <img alt="" src={email} style={{ height: 40 }} />
                    </div>
                    <div
                      className="col-12"
                      style={{
                        color: "#cce1e6",
                        fontSize: 16,
                        fontWeight: "500",
                      }}
                    >
                      Email
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <br />
        </div>
      </div>
    );
  }
}

export default Signup;
