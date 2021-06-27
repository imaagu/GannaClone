import React, { Component } from "react";
import GaanaLogo from "../images/gaana.svg";
import { Link } from "react-router-dom";
import auth from "../services/authServices";

import "../css/navbar.css";
class NavBar extends Component {
  render() {
    let user = auth.getCurrentUser();

    return (
      <div className="pb-1 pt-1 ">
        <div className="row">
          <div className="col-3 col-md-3 col-lg-1 mt-2">
            <Link to="/home" style={{ margin: "auto", width: "50%" }}>
              <img
                src={GaanaLogo}
                className="img-fluid"
                alt="logo"
                style={{ minWidth: 50, maxWidth: 70 }}
              />
            </Link>
          </div>
          <div className="col-5 d-none d-lg-block">
            <div className="row">
              <div className="col-2  ">
                <Link
                  style={{ fontSize: "1vw" }}
                  className={
                    this.props.sel === "/home"
                      ? "navBarLinkWithpointer navBarSelect"
                      : "navBarLinkWithpointer"
                  }
                  to="/home"
                >
                  HOME
                </Link>
              </div>
              <div className="col-2">
                <Link className="navBarLink" style={{ fontSize: "1vw" }} to="">
                  BROWSER
                </Link>
              </div>
              <div className="col-2">
                <Link className="navBarLink" style={{ fontSize: "1vw" }} to="">
                  DISCOVER
                </Link>
              </div>
              <div className="col-2  ">
                <Link className="navBarLink" style={{ fontSize: "1vw" }} to="">
                  RADIO
                </Link>
              </div>
              <div className="col-2">
                <Link className="navBarLink" style={{ fontSize: "1vw" }} to="">
                  MY&nbsp;MUSIC
                </Link>
              </div>
              <div className="col-2">
                <Link className="navBarLink" style={{ fontSize: "1vw" }} to="">
                  PODCASTS
                </Link>
              </div>
            </div>
          </div>
          <div className="col-lg-1 d-none d-block-lg"></div>
          <div className="col-lg-2 col-md-3 col-3 text-center mt-0 mb-3">
            <div className=" NavBarCirlce "> GO AD-FREE</div>
          </div>
          <div className="col-lg-2 col-md-3 col-4 text-center mt-0 mb-3">
            <div className=" NavBarCirlce"> GET GAANA PLUS</div>
          </div>
          <div className="col-2 col-lg-2 text-right border-left">
            <div className="row">
              <div className="col-lg-6 d-none d-lg-block">
                <span
                  datatoggle="tooltip"
                  data-placement="bottom"
                  title="Check out Ganna in Black Theme"
                >
                  <i className="fas fa-moon"></i>
                </span>
                &nbsp;
                <span
                  datatoggle="tooltip"
                  data-placement="bottom"
                  title="Language"
                >
                  <i className="fas fa-language"></i>
                </span>
              </div>
              <div className="col-lg-6 col-12  text-center">
                {user === null ? (
                  <Link
                    id="loginLink"
                    to="/login"
                    style={{
                      color: "#e72c30",
                      cursor: "pointer",
                      fontWeight: "500",
                    }}
                  >
                    SignIn
                  </Link>
                ) : (
                  <div className="dropdown">
                    <div className="dropbtn">
                      &nbsp;
                      <i
                        id="onhover"
                        style={{
                          fontSize: 25,
                          color: "lightgrey",
                          margin: "auto",
                          width: "50%",
                        }}
                        className="fa fa-user-circle"
                      ></i>
                    </div>
                    <div className="dropdown-content">
                      <div>
                        <Link to="">
                          <i className="fa fa-user"></i>
                          &nbsp; Profile
                        </Link>
                      </div>
                      {user.role === "admin" ? (
                        <div>
                          <Link to="/dashboard">
                            <i className="fa fa-user"></i>
                            &nbsp; Dashboard
                          </Link>
                        </div>
                      ) : (
                        ""
                      )}

                      <div>
                        <Link to="">
                          &nbsp;
                          <i className="fas fa-language"></i>
                          &nbsp; Languages
                        </Link>
                      </div>
                      <div>
                        <Link to="">
                          &nbsp;
                          <i className="fas fa-cog"></i>
                          &nbsp; Settings
                        </Link>
                      </div>
                      <div>
                        <Link to="/logout">
                          &nbsp;
                          <i className="fas fa-sign-out-alt"></i>
                          &nbsp; Logout
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NavBar;
