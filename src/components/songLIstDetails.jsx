import React, { Component } from "react";
import NavBar from "./navBar";
import music from "../services/songApi";
import Like from "./like";
import adv from "../images/adv.jpg";
import auth from "../services/authServices";
import { Link } from "react-router-dom";
import "../css/home.css";
import swal from "sweetalert";
import SongBar from "./songbar";
class SongListDetails extends Component {
  state = {
    data: null,
    songplay: false,
    show: 0,
    selectedSong: null,
    selIndex: -1,
  };

  async componentDidMount() {
    let { track } = this.props.match.params;
    let data = await music.getSongList();
    let list = data.filter((n) => n.track === track);

    this.setState({
      data: list[0],
      selectedSong: list[0].songs[0],
      selIndex: 0,
    });
  }
  getSongDuration = (sec) => {
    let min = (sec / 60).toFixed(1);
    return min;
  };

  handleAddPlay = async (item) => {
    let user = await auth.getCurrentUser();
    if (user !== null) {
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
    var data = { ...this.state.selectedSong };

    data.liked = !data.liked;

    try {
      let item = data;
      this.setState({ selectedSong: data });
      await music.likeSong(item.name, item.liked);
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

  playAudio = async () => {
    try {
      const audioEl = document.getElementsByClassName("audio-element")[0];
      let data = this.state.data;
      let selIndex = this.state.selIndex;
      data.songs[selIndex].play = true;
      this.setState({ songplay: true, data: data });
      await music.playCount(this.state.data[this.state.selIndex].name);
      audioEl.play();
    } catch (ex) {}
  };

  //To change the selected song
  handdleCurrentMusic = (val) => {
    let selIndex = this.state.selIndex;
    let data = this.state.data;
    for (var i = 0; i < data.songs.length; i++) {
      data.songs[i].play = false;
    }

    if (val > 0) {
      if (selIndex < this.state.data.songs.length - 1) {
        selIndex = selIndex + val;
        this.setState({
          selIndex,
          selectedSong: this.state.data.songs[selIndex],
          data: data,
        });

        try {
          const audioEl = document.getElementsByClassName("audio-element")[0];
          this.setState({ songplay: false });

          audioEl.load();
        } catch (ex) {}

        return;
      }
    } else {
      if (selIndex > 0) {
        selIndex = selIndex + val;
        this.setState({ selIndex });
        try {
          const audioEl = document.getElementsByClassName("audio-element")[0];
          this.setState({
            songplay: false,
            selectedSong: this.state.data.songs[selIndex],
            data: data,
          });

          audioEl.load();
        } catch (ex) {}

        return;
      }
    }
  };

  //Use to stop music
  pauseAudio = async () => {
    try {
      const audioEl = document.getElementsByClassName("audio-element")[0];
      let data = this.state.data;
      let selIndex = this.state.selIndex;
      data.songs[selIndex].play = false;
      this.setState({ songplay: false, data: data });

      await audioEl.pause();
    } catch (ex) {}
  };
  render() {
    let { data, selectedSong, songplay, selIndex } = this.state;

    return (
      <div className="container-fluid">
        <NavBar />{" "}
        <div style={{ backgroundColor: "#d7e0e0" }}>
          <div className="row">
            <div
              className="col-lg-10 col-12"
              style={{
                backgroundColor: "#f0fafa",
                boxShadow: 1,
              }}
            >
              {data ? (
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
                            <Link
                              style={{ color: "black" }}
                              to={"/list/" + data.track}
                            >
                              {data.track}
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
                            src={data.img}
                            className="img-fluid"
                            style={{ maxHeight: 130, borderRadius: 25 }}
                            alt="img"
                          />
                        </div>
                        <div className="col-1 d-block d-lg-none ">
                          <i id="smallHeart" onClick={() => this.handledLike()}>
                            <Like liked={selectedSong.liked} />
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
                                  {selectedSong.name}
                                </div>
                              </div>{" "}
                            </div>
                            <div className="col-12">
                              <div className="row">
                                <div className="col" style={{ color: "blue" }}>
                                  {data.track}
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
                                  {selectedSong.director}
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
                            <Like liked={selectedSong.liked} />
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
                                  {selectedSong.name}
                                </div>
                              </div>{" "}
                            </div>
                            <div className="col-12">
                              <div className="row">
                                <div className="col" style={{ color: "blue" }}>
                                  {data.track}
                                </div>
                              </div>{" "}
                            </div>
                            <div className="col-12">
                              <div className="row">
                                <div className="col" style={{ color: "blue" }}>
                                  <span className="text-muted">Compose by</span>{" "}
                                  &nbsp;
                                  {selectedSong.director}
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
                              </div>
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
                      <Link to="">{data.track} Songs Lyrics </Link>
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
                      {data.songs.map((item, index) => (
                        <div
                          key={index}
                          onMouseEnter={() => this.handleBtnShow(index)}
                          onMouseLeave={() => this.handleBtnShow(-1)}
                          className="row currentsong border-top border-bottom "
                          style={{ backgroundColor: "#fff" }}
                        >
                          <div
                            className="col-1 pt-3"
                            style={{
                              cursor: "pointer",
                            }}
                          >
                            {index === selIndex ? (
                              <React.Fragment>
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
                              </React.Fragment>
                            ) : (
                              ""
                            )}
                          </div>
                          <div className="col-4  p-3 currentsong">
                            {item.name}
                          </div>
                          <div className="col-4 p-3 ">{item.director}</div>
                          <div className="col-1 p-3">
                            {this.getSongDuration(item.duration)}
                          </div>

                          {this.state.show === index ? (
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
                                    <a>
                                      <i className="fas fa-folder-plus"></i>
                                      &nbsp; &nbsp; Add to playlist{" "}
                                    </a>
                                  </div>
                                  <div
                                    onClick={() => this.handleAddQueue(item)}
                                  >
                                    <a>
                                      <i className="fas fa-headphones-alt"></i>
                                      &nbsp; &nbsp; Add to Queue
                                    </a>
                                  </div>
                                  <div>
                                    <a>
                                      <i className="far fa-save"></i>
                                      &nbsp; &nbsp; Go to Album
                                    </a>
                                  </div>
                                  <div>
                                    <a>
                                      <i className="fas fa-share-alt"></i>
                                      &nbsp; &nbsp; Share
                                    </a>
                                  </div>
                                  <div>
                                    <a>
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
                      ))}
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
                    song={selectedSong}
                    onLike={this.handledLike}
                    addPlaylist={this.handleAddPlay}
                    addQueue={this.handleAddQueue}
                    onCurrentM={this.handdleCurrentMusic}
                    onPlay={this.playAudio}
                    onPause={this.pauseAudio}
                    selIndex={selIndex}
                    checkSongPLay={songplay}
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

export default SongListDetails;
