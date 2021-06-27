import React, { Component } from "react";
import music from "../../services/songApi";
import NavBar from "./../navBar";
import { Link } from "react-router-dom";
class Report extends Component {
  state = {
    songs: [],
    sel: "",
  };

  async componentDidMount() {
    let { type } = this.props.match.params;
    let songs = await music.getSongs();
    this.setState({ songs, sel: type });
  }

  handleChange = (e) => {
    let sel = this.state.sel;
    sel = e.currentTarget.value;
    this.setState({ sel });
  };

  comparelike(n1, n2) {
    let t1 = n1.like_count;
    let t2 = n2.like_count;
    if (t1 > t2) return -1;
    if (t1 === t2) return 0;
    if (t1 < t2) return 1;
  }

  comparesearch(n1, n2) {
    let t1 = n1.search_count;
    let t2 = n2.search_count;
    if (t1 > t2) return -1;
    if (t1 === t2) return 0;
    if (t1 < t2) return 1;
  }

  compareplay(n1, n2) {
    let t1 = n1.play_count;
    let t2 = n2.play_count;
    if (t1 > t2) return -1;
    if (t1 === t2) return 0;
    if (t1 < t2) return 1;
  }

  getSonglist = (songs, sel) => {
    console.log(sel);
    let list = [];
    if (sel === "") return songs;
    switch (sel) {
      case "like_count":
        list = songs.sort(this.comparelike);
        return list;
        break;
      case "search_count":
        list = songs.sort(this.comparesearch);
        return list;
        break;
      case "play_count":
        list = songs.sort(this.compareplay);
        return list;
        break;
    }
    return songs;
  };

  render() {
    let { songs, sel } = this.state;
    let list = this.getSonglist(songs, sel);

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
              <hr />
              <div className="row">
                <div
                  className="col-1 text-center"
                  style={{
                    fontSize: 20,
                    margin: "auto",
                    width: "50%",
                    cursor: "pointer",
                  }}
                >
                  <Link to="/dashboard">
                    <i className="fas fa-chevron-left text-light"></i>
                  </Link>
                </div>
                <div className="col-10 text-center" style={{ fontSize: 30 }}>
                  {sel === "play_count"
                    ? "Most Played"
                    : sel === "like_count"
                    ? "Most Liked"
                    : "Most Search"}{" "}
                  Songs
                </div>
              </div>
              <br />
              <hr />
              <div className="row text-center" style={{ fontWeight: "bold" }}>
                <div className="col-2">Sno.</div>
                <div className="col-6">Name</div>
                <div className="col-4">
                  {sel === "play_count"
                    ? "Most Played"
                    : sel === "like_count"
                    ? "Most Liked"
                    : "Most Search"}
                </div>
              </div>
              {list.map((song, index) => (
                <div className="row text-center" key={index}>
                  <div className="col-2">{index + 1}</div>
                  <div className="col-6">{song.name}</div>
                  <div className="col-4">{song[sel]} times</div>
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

export default Report;
