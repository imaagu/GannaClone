import React, { Component } from "react";
import { Link } from "react-router-dom";
import NavBar from "./../navBar";
import ShowSongs from "./showSongs";
import "../../css/navbar.css";

class Dashboard extends Component {
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
              Admin Dashboard
            </div>
          </div>
          <br />
          <br />
          <nav class="navbar navbar-expand navbar-light  ">
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul
                class="navbar-nav"
                style={{
                  fontWeight: "500",
                  fontSize: 20,
                }}
              >
                <li class="nav-item ">
                  <Link to="/allsongs" className=" nav-link ">
                    Songs
                  </Link>
                </li>
                <li class="nav-item">
                  <Link to="/users" className="nav-link ">
                    Users
                  </Link>{" "}
                </li>
                <li class="nav-item dropdown">
                  <a
                    class="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Add
                  </a>
                  <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                    <Link to="/addsong" className="dropdown-item">
                      By Form{" "}
                    </Link>
                    <Link to="/addsongCVS" className="dropdown-item">
                      By CVS{" "}
                    </Link>
                  </div>
                </li>
                <li class="nav-item dropdown">
                  <a
                    class="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Report
                  </a>
                  <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                    <Link className="dropdown-item" to="/report/play_count">
                      Most Played Song
                    </Link>
                    <Link className="dropdown-item" to="/report/like_count">
                      Most Liked Song
                    </Link>
                    <Link className="dropdown-item" to="/report/search_count">
                      Most Search Song
                    </Link>
                  </div>
                </li>
              </ul>
            </div>
          </nav>

          <br />
          <br />

          <br />
          <br />
          <br />
          <br />
          <br />
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

export default Dashboard;
