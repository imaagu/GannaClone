import React, { Component } from "react";
import music from "../../services/songApi";
import { Link } from "react-router-dom";
import NavBar from "./../navBar";
import auth from "../../services/authServices";
import swal from "sweetalert";
class ShowSongs extends Component {
  state = {
    songs: [],
    sel: "",
    opt: [
      { name: "Most Searched", val: "search_count" },
      { name: "Most Liked", val: "like_count" },
      { name: "Most Played", val: "play_count" },
    ],
  };

  async componentDidMount() {
    let songs = await music.getSongs();
    this.setState({ songs });
  }

  onDownload = (song) => {
    var link = document.createElement("a");
    link.href = song.song;
    link.style = "visibility:hidden";
    link.download = song.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  onDownloadAll = async () => {
    try {
      let data = await auth.convertAllToCSV();

      var link = document.createElement("a");
      link.href = data.uri;
      link.style = "visibility:hidden";
      link.download = data.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (ex) {
      swal("Error !!! .... Do it Again");
    }
  };

  render() {
    let { songs } = this.state;

    return (
      <div className="container-fluid">
        <NavBar />
        <div
          style={{
            background: "linear-gradient(to bottom , #62a5b5 ,  #315c66)",
            color: "white",
          }}
        >
          {songs.length > 0 ? (
            <div className="m-1">
              <br />
              <hr />
              <div className="row">
                <div className="col-10 text-center" style={{ fontSize: 30 }}>
                  Songs
                </div>
                <div className="col-2">
                  <i
                    style={{ cursor: "pointer" }}
                    onClick={() => this.onDownloadAll()}
                    className="fas fa-cloud-download-alt"
                  ></i>
                </div>
              </div>
              <hr />
              <div className="row text-center" style={{ fontWeight: "bold" }}>
                <div className="col-2">Sno.</div>
                <div className="col-6">Name</div>
                <div className="col-2"></div>
                <div className="col-2"></div>
              </div>
              {songs.map((song, index) => (
                <div className="row text-center" key={index}>
                  <div className="col-2">{index + 1}</div>
                  <div className="col-6">{song.name}</div>
                  <div className="col-2">
                    <i
                      style={{ cursor: "pointer" }}
                      onClick={() => this.onDownload(song)}
                      className="fas fa-cloud-download-alt"
                    ></i>
                  </div>
                  <Link to={"/edit/" + song.name} className="col-2">
                    <i
                      style={{ cursor: "pointer" }}
                      className="fas fa-edit text-light"
                    ></i>
                  </Link>
                </div>
              ))}
            </div>
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

export default ShowSongs;
