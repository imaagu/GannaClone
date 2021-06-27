import React, { Component } from "react";
import NavBar from "./navBar";
import music from "../services/songApi";
import { Link } from "react-router-dom";
import Like from "./like";
import adv from "../images/adv.jpg";
import auth from "../services/authServices";
import "../css/home.css";
import swal from "sweetalert";
import SongBar from "./songbar";

class SongDetails extends Component {
  state = {
    item: {},
    songplay: false,
    show: 0,
  };
  async componentDidMount() {
    let { track, name } = this.props.match.params;
    let data = await music.getSongs();
    let item = data.filter((n) => n.track === track && n.name === name);
    this.setState({ item: item[0] });
  }

  getSongDuration = (sec) => {
    let min = (sec / 60).toFixed(1);
    return min;
  };

  handleAddPlay = async (item) => {
    let user = await auth.getCurrentUser();
    if (user !== null) {
      console.log(item);

      swal({
        text: 'Enter the list name. eg: "My Playlist".',
        content: "input",
        button: {
          text: "Add!",
          closeModal: false,
        },
      }).then(async (name) => {
        if (!name && name === "") swal("Invalid List Name");
        else {
          try {
            await auth.addintoPlaylist(
              user.email,
              name,
              item.track,
              item.name,
              item.img,
              item.song,
              item.director,
              item.studio,
              item.year,
              item.likes,
              item.duration
            );
            swal({
              title: name.toUpperCase(),
              text: "Added Successfully",
            });
            window.location = "/home";
          } catch (ex) {
            swal("Already present in the " + name.toUpperCase());
          }
        }
      });
    } else {
      swal("Login Is required");
    }
  };

  handleBtnShow = (val) => {
    this.setState({ show: val });
  };

  handledLike = async () => {
    var data = { ...this.state.item };
    data.liked = !data.liked;
    try {
      let item = data;
      this.setState({ item: data });
      await music.likeSong(item.name, item.liked);
    } catch (ex) {}
  };

  //Use to play music
  playAudio = async () => {
    try {
      const audioEl = document.getElementsByClassName("audio-element")[0];
      this.setState({ songplay: true });
      await music.playCount(this.state.item.name);
      audioEl.play();
    } catch (ex) {}
  };

  //Use to stop music
  pauseAudio = async () => {
    try {
      const audioEl = document.getElementsByClassName("audio-element")[0];
      this.setState({ songplay: false });

      await audioEl.pause();
    } catch (ex) {}
  };

  handleAddQueue = async (item) => {
    try {
      await auth.addintoQueue(
        item.track,
        item.name,
        item.img,
        item.song,
        item.director,
        item.studio,
        item.year,
        item.likes,
        item.duration
      );

      swal("Added to Queue Successfully");
    } catch (ex) {
      swal("Already present in the list");
    }
  };

  render() {
    let { item } = this.state;

    return (
      <div className="container-fluid">
        <NavBar />
        <div style={{ backgroundColor: "#d7e0e0" }}>
          <div className="row">
            <div
              className="col-lg-10 col-12"
              style={{
                backgroundColor: "#f0fafa",
                boxShadow: 1,
              }}
            >
              {item.name !== undefined ? (
                <React.Fragment>
                  <div className="row">
                    <div className="col-12  ">
                      <nav
                        aria-label="breadcrumb"
                        style={{
                          fontSize: 11,
                          color: "black",
                          textDecoration: "underline",
                        }}
                      >
                        <ol
                          className="breadcrumb "
                          style={{ backgroundColor: "#f0fafa" }}
                        >
                          <li className="breadcrumb-item">
                            <Link style={{ color: "black" }} to="/home">
                              Gaana
                            </Link>
                          </li>
                          <li className="breadcrumb-item">
                            <Link style={{ color: "black" }} to="">
                              {this.state.item.track}
                            </Link>
                          </li>
                          <li
                            aria-current="page"
                            className="breadcrumb-item active"
                          >
                            <Link
                              to={"/playlist/" + item.track + "/" + item.name}
                              style={{ color: "black" }}
                            >
                              {this.state.item.name}
                            </Link>
                          </li>
                        </ol>
                      </nav>
                      <hr />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col" style={{ margin: 1 }}>
                      <div className="row">
                        <div className="col-lg-3 col-11  text-center">
                          <img
                            src={item.img}
                            className="img-fluid"
                            style={{ maxHeight: 130, borderRadius: 25 }}
                            alt="img"
                          />
                        </div>
                        <div className="col-1 d-block d-lg-none ">
                          <i id="smallHeart" onClick={() => this.handledLike()}>
                            <Like liked={item.liked} />
                          </i>{" "}
                        </div>
                        <div className="col-lg-6  d-none d-lg-block">
                          <div className="row">
                            <div className="col-12">
                              <div className="row">
                                <div
                                  className="col text-muted"
                                  style={{
                                    fontSize: "120%",
                                    textTransform: "uppercase",
                                    letterSpacing: 1.5,

                                    fontWeight: "normal",
                                  }}
                                >
                                  {item.name}
                                </div>
                              </div>{" "}
                            </div>
                            <div className="col-12">
                              <div className="row">
                                <div className="col" style={{ color: "blue" }}>
                                  {item.track}
                                </div>
                              </div>{" "}
                            </div>
                            <div className="col-12">
                              <div className="row">
                                <div
                                  className="col pb-1"
                                  style={{ color: "blue" }}
                                >
                                  <span className="text-muted">Compose by</span>{" "}
                                  &nbsp;
                                  {item.director}
                                </div>
                              </div>{" "}
                            </div>
                            <div className="col-12">
                              <div className="row">
                                <div className="col">
                                  <br />
                                </div>
                              </div>
                            </div>
                            <div className="col-12 text-center">
                              <div className="row">
                                <div className="col-5">
                                  <div
                                    style={{
                                      border: "1px solid #e72c30",
                                      backgroundColor: "#e72c30",
                                      color: "white",
                                      padding: "6px 15px",
                                      position: "relative",
                                      borderRadius: 25,

                                      lineHeight: 1.2,
                                      letterSpacing: 0.1,

                                      cursor: "pointer",
                                    }}
                                  >
                                    {this.state.songplay ? (
                                      <span onClick={() => this.pauseAudio()}>
                                        <i className="fas fa-pause"></i>
                                        &nbsp; Pause
                                      </span>
                                    ) : (
                                      <span onClick={() => this.playAudio()}>
                                        <i className="fas fa-play"></i>
                                        &nbsp; Play
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>{" "}
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-3 d-none d-lg-block text-muted text-right">
                          <i onClick={() => this.handledLike()}>
                            <Like liked={item.liked} />
                          </i>
                          &nbsp; &nbsp;
                          <i className="fas fa-share-alt"></i>
                          &nbsp; &nbsp;
                          <i className="fas fa-folder-plus"></i>
                          &nbsp; &nbsp;
                          <i className="fas fa-cloud-download-alt"></i>
                        </div>
                        <div className="col-11  d-block text-center d-lg-none">
                          <div className="row">
                            <div className="col-12">
                              <div className="row">
                                <div
                                  className="col text-muted"
                                  style={{
                                    fontSize: "130%",
                                    textTransform: "uppercase",
                                    letterSpacing: 1.0,
                                    fontWeight: "normal",
                                  }}
                                >
                                  {item.name}
                                </div>
                              </div>{" "}
                            </div>
                            <div className="col-12">
                              <div className="row">
                                <div className="col" style={{ color: "blue" }}>
                                  {item.track}
                                </div>
                              </div>{" "}
                            </div>
                            <div className="col-12">
                              <div className="row">
                                <div className="col" style={{ color: "blue" }}>
                                  <span className="text-muted">Compose by</span>{" "}
                                  &nbsp;
                                  {item.director}
                                </div>
                              </div>{" "}
                            </div>

                            <div className="col-12 ">
                              <div className="row text-center">
                                <div className="col-3"></div>
                                <div className="col-6">
                                  <br />
                                  <div
                                    style={{
                                      border: "1px solid #e72c30",
                                      backgroundColor: "#e72c30",
                                      color: "white",
                                      padding: "6px 15px",
                                      position: "relative",
                                      borderRadius: 25,
                                      fontSize: 12,
                                      lineHeight: 1.0,
                                      letterSpacing: 0.1,

                                      cursor: "pointer",
                                    }}
                                  >
                                    {this.state.songplay ? (
                                      <span onClick={() => this.pauseAudio()}>
                                        <i className="fas fa-pause"></i>
                                        &nbsp; Pause
                                      </span>
                                    ) : (
                                      <span onClick={() => this.playAudio()}>
                                        <i className="fas fa-play"></i>
                                        &nbsp; Play
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>{" "}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <br />
                  <div className="row">
                    <div
                      className="col m-1 ml-3"
                      style={{
                        fontWeight: "500",
                        fontSize: 14,
                        cursor: "pointer",
                        textDecoration: "underline",
                      }}
                    >
                      <Link to="">{item.name} Lyrics </Link>
                    </div>
                    <br />
                    <br />
                    <br />
                  </div>
                  <div className="row text-muted">
                    <div id="CurrentsongDetail" className="col">
                      <div className="row">
                        <div className="col-1">#</div>
                        <div className="col-4 ">Title</div>
                        <div className="col-4">Artist</div>
                        <div className="col-1">
                          <i className="fas fa-clock"></i>
                        </div>
                        <div className="col-2 "></div>
                      </div>
                      <div
                        onMouseEnter={() => this.handleBtnShow(1)}
                        onMouseLeave={() => this.handleBtnShow(0)}
                        className="row currentsong border-top border-bottom "
                        style={{ backgroundColor: "#fff" }}
                      >
                        <div
                          className="col-1 pt-3"
                          style={{
                            cursor: "pointer",
                          }}
                        >
                          {this.state.songplay ? (
                            <i
                              onClick={() => this.pauseAudio()}
                              className="fas fa-pause"
                            ></i>
                          ) : (
                            <i
                              onClick={() => this.playAudio()}
                              className="fas fa-play"
                            ></i>
                          )}
                        </div>
                        <div className="col-4  p-3 currentsong">
                          {item.name}
                        </div>
                        <div className="col-4 p-3 ">{item.director}</div>
                        <div className="col-1 p-3">
                          {this.getSongDuration(item.duration)}
                        </div>

                        {this.state.show === 1 ? (
                          <div className="col-1">
                            <div className="dropdown">
                              <div className="dropbtn">
                                <i
                                  style={{ cursor: "pointer" }}
                                  className="fas fa-ellipsis-h pt-3"
                                ></i>
                              </div>
                              <div
                                className="dropdown-content"
                                style={{ cursor: "pointer" }}
                              >
                                <div onClick={() => this.handleAddPlay(item)}>
                                  <a href="#">
                                    <i className="fas fa-folder-plus"></i>
                                    &nbsp; &nbsp; Add to playlist{" "}
                                  </a>
                                </div>
                                <div onClick={() => this.handleAddQueue(item)}>
                                  <a href="#">
                                    <i className="fas fa-headphones-alt"></i>
                                    &nbsp; &nbsp; Add to Queue
                                  </a>
                                </div>
                                <div>
                                  <a href="#">
                                    <i className="far fa-save"></i>
                                    &nbsp; &nbsp; Go to Album
                                  </a>
                                </div>
                                <div>
                                  <a href="#">
                                    <i className="fas fa-share-alt"></i>
                                    &nbsp; &nbsp; Share
                                  </a>
                                </div>
                                <div>
                                  <a href="#">
                                    <i className="fas fa-long-arrow-alt-down"></i>
                                    &nbsp; &nbsp; Download
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="col-1  "></div>
                        )}
                      </div>
                    </div>
                  </div>
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />

                  <br />
                  <br />
                  <SongBar
                    song={item}
                    onLike={this.handledLike}
                    addPlaylist={this.handleAddPlay}
                    addQueue={this.handleAddQueue}
                    onCurrentM={() => {}}
                    onPlay={this.playAudio}
                    onPause={this.pauseAudio}
                    selIndex={1}
                    checkSongPLay={this.state.songplay}
                  />
                </React.Fragment>
              ) : (
                ""
              )}
            </div>
            <div
              className="col-lg-2 mt-1 text-center d-none d-lg-block"
              style={{ backgroundColor: "#d7e0e0" }}
            >
              <img src={adv} className="img-fluid" alt="adv" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SongDetails;
