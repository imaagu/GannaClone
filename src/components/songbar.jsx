import React, { Component } from "react";

import Like from "./like";

/**
 * Custom CSS
 */
import "../css/home.css";
import "../css/navbar.css";

class SongBar extends Component {
  state = {};
  render() {
    let {
      song,
      onLike,
      addPlaylist,
      addQueue,
      selIndex,
      onCurrentM,
      onPlay,
      onPause,
      checkSongPLay,
    } = this.props;
    return (
      <div
        className="fixed-bottom pl-2"
        style={{
          backgroundColor: "#fff ",
          color: "black",
          boxShadow: "0 0 6px 0 rgba(0, 0, 0, 0.36)",
        }}
      >
        <div className="row">
          <div className="col-lg-4 col-12 text-center border-right p-2">
            <div className="row">
              <div className="col-2" style={{ margin: "auto", width: "50%" }}>
                <img
                  alt=""
                  src={song.img}
                  style={{ height: 50, borderRadius: 10 }}
                />
              </div>
              <div className="col-6 text-left">
                <div className="row" id="songtext">
                  <div className="col-12">{song.name}</div>
                  <div className="col-12 text-muted">{song.track}</div>
                </div>
              </div>
              <div
                className="col-4 col-lg-2 "
                style={{ verticalAlign: "middle", top: 10, fontSize: 20 }}
              >
                <i id="smallIconHeart" onClick={() => onLike(selIndex)}>
                  <Like liked={song.liked} />
                </i>
                {checkSongPLay ? (
                  <i
                    id="smallIcon"
                    onClick={() => onPause()}
                    className="fas fa-pause-circle musichover"
                  ></i>
                ) : (
                  <i
                    id="smallIcon"
                    onClick={() => onPlay()}
                    className="fas fa-play-circle musichover"
                  ></i>
                )}
              </div>
              <div
                className="col-lg-2 d-none d-lg-block "
                style={{ verticalAlign: "middle", fontSize: 20 }}
              >
                <div className="dropup">
                  <div className="dropbtn1">
                    {" "}
                    <i className="fas fa-ellipsis-h"></i>
                  </div>
                  <div className="dropup-content1">
                    <div onClick={() => addPlaylist(song)}>
                      <i className="fas fa-folder-plus"></i>
                      &nbsp; &nbsp; Add to playlist
                    </div>
                    <div onClick={() => addQueue(song)}>
                      <i className="fas fa-headphones-alt"></i>
                      &nbsp; &nbsp; Add to Queue
                    </div>
                    <div>
                      <i className="far fa-save"></i>
                      &nbsp; &nbsp; Go to Album
                    </div>
                    <div>
                      <i className="fas fa-share-alt"></i>
                      &nbsp; &nbsp; Share
                    </div>
                    <div>
                      <i className="fas fa-long-arrow-alt-down"></i>
                      &nbsp; &nbsp; Download
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-8 d-none d-lg-block p-2 ">
            <div className="row p-1">
              <div className="col-2 text-muted " style={{ top: 10 }}>
                <span>
                  <i
                    onClick={() => onCurrentM(-1)}
                    style={{ fontSize: 20, cursor: "pointer" }}
                    className="fas fa-step-backward"
                  ></i>
                </span>
                &nbsp; &nbsp;
                <span>
                  {checkSongPLay ? (
                    <i
                      onClick={() => onPause()}
                      className="fas fa-pause-circle musichover"
                    ></i>
                  ) : (
                    <i
                      onClick={() => onPlay()}
                      className="fas fa-play-circle musichover"
                    ></i>
                  )}
                  <audio className="audio-element">
                    <source src={song.song}></source>
                  </audio>
                </span>
                &nbsp; &nbsp;
                <span>
                  <i
                    onClick={() => onCurrentM(1)}
                    style={{ fontSize: 20, cursor: "pointer" }}
                    className="fas fa-step-forward"
                  ></i>
                </span>
              </div>
              <div className="col-2 p-2 border-right text-center text-muted">
                <i
                  style={{
                    fontSize: 20,
                    cursor: "pointer",
                  }}
                  className="fas fa-volume-up"
                ></i>
                &nbsp; &nbsp;
                <i
                  style={{
                    fontSize: 20,
                    cursor: "pointer",
                  }}
                  className="fas fa-random"
                ></i>
                &nbsp; &nbsp;
                <i
                  style={{
                    fontSize: 20,
                    cursor: "pointer",
                  }}
                  className="fas fa-redo"
                ></i>
              </div>

              <div className="col-2 text-center  border-right">
                <div
                  className="NavBarCirlce"
                  style={{ margin: "auto", width: "50%" }}
                >
                  High
                </div>
              </div>
              <div className="col-1 text-muted  pt-2 pb-1 mt-0 ">Autoplay</div>
              <div className="col-2 text-center pt-0 pb-1 mt-0 border-right">
                <div
                  className="NavBarCirlce"
                  style={{ margin: "auto", width: "50%" }}
                >
                  on
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SongBar;
