import React, { Component } from "react";
import swal from "sweetalert";
import { Link } from "react-router-dom";
/**
 * Custom CSS
 */
import "../css/home.css";
import "../css/navbar.css";

/**
 * components
 */
import NavBar from "./navBar";
import ShowList from "./showList";
import Queue from "./queue";
import ProgressBar from "./progressBar";
import SongBar from "./songbar";
import ShowBList from "./showBList";

/**
 * API Serices
 */
import auth from "../services/authServices";
import music from "../services/songApi";

/**
 * Image
 */
import adv from "../images/adv.jpg";

class Home extends Component {
  state = {
    search: "",
    data: [],
    datalist: [],
    playlist: [],
    musicData: [],
    showtr: false,
    topPickSlide: 0,
    topCartSlide: 0,
    trendingSlide: 0,
    likesongSlide: 0,
    selSong: 0,
    datalistData: [],
    songplay: false,
    queue: [],
  };

  async componentDidMount() {
    let playlist = [];
    let queue = [];
    let user = await auth.getCurrentUser();

    if (user !== null) {
      playlist = await auth.getPlaylist(user.email);
      for (var i = 0; i < playlist.length; i++) {
        playlist[i].slide = 0;
      }
    } else {
      playlist = [];
    }

    let data = await music.getSongs();
    let datalist = await music.getSongList();
    queue = await auth.getqueue();
    queue = queue.length > 0 ? queue : [];
    console.log(data);
    this.setState({
      data,
      musicData: data,
      datalist: datalist,
      datalistData: datalist,
      playlist: playlist,
      queue,
    });
  }

  //To change the selected song
  handdleCurrentMusic = (val) => {
    let { selSong, musicData } = this.state;

    if (val > 0) {
      if (selSong < musicData.length - 1) {
        selSong = selSong + val;

        try {
          const audioEl = document.getElementsByClassName("audio-element")[0];
          this.setState({ songplay: false, selSong });

          audioEl.load();
        } catch (ex) {}

        return;
      }
    } else {
      if (selSong > 0) {
        selSong = selSong + val;

        try {
          const audioEl = document.getElementsByClassName("audio-element")[0];
          this.setState({ songplay: false, selSong });

          audioEl.load();
        } catch (ex) {}

        return;
      }
    }
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

  handleAddQueue = async (item) => {
    try {
      let queue = [];

      queue = await auth.addintoQueue(
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
      this.setState({ queue: queue });
      window.location = "/home";
    } catch (ex) {
      swal("Already present in the Queue");
    }
  };

  //To handle Top pic slider
  handletopPickSlide = (val) => {
    let showOpInd = this.state.topPickSlide;
    if (val > 0 && showOpInd < 5) {
      showOpInd = showOpInd + val;
      this.setState({ topPickSlide: showOpInd });
    }
    if (val < 0 && showOpInd > 0) {
      showOpInd = showOpInd + val;
      this.setState({ topPickSlide: showOpInd });
    }
  };

  /**
   * Handle Top Charts Slider
   */
  handleLikeSlide = (val) => {
    let likesongs = this.state.musicData.filter((n) => n.liked === true);
    let showOpInd = this.state.likesongSlide;
    if (val > 0 && showOpInd < likesongs.length - 4) {
      showOpInd = showOpInd + val;
      this.setState({ likesongSlide: showOpInd });
    }
    if (val < 0 && showOpInd > 0) {
      showOpInd = showOpInd + val;
      this.setState({ likesongSlide: showOpInd });
    }
  };

  //To handle Top pic slider
  handletopPickSlide = (val) => {
    let toppick = this.state.musicData.filter((n) => n.top_picks === true);
    console.log(toppick);
    let showOpInd = this.state.topPickSlide;
    if (val > 0 && showOpInd < toppick.length - 4) {
      showOpInd = showOpInd + val;
      this.setState({ topPickSlide: showOpInd });
    }
    if (val < 0 && showOpInd > 0) {
      showOpInd = showOpInd + val;
      this.setState({ topPickSlide: showOpInd });
    }
  };

  /**
   * Handle User PLaylist Slider
   */
  handleplaylistSlide = (val, index) => {
    let playlist = [...this.state.playlist];

    if (val > 0 && playlist[index].slide < playlist[index].songs.length - 4) {
      playlist[index].slide = playlist[index].slide + val;
      this.setState({ playlist });
    }
    if (val < 0 && playlist[index].slide > 0) {
      playlist[index].slide = playlist[index].slide + val;
      this.setState({ playlist });
    }
  };

  /**
   * Handle Top Charts Slider
   */
  handletopCartSlide = (val) => {
    let topCart = this.state.musicData.filter((n) => n.top_carts === true);

    let showOpInd = this.state.topCartSlide;
    if (val > 0 && showOpInd < topCart.length - 4) {
      showOpInd = showOpInd + val;
      this.setState({ topCartSlide: showOpInd });
    }
    if (val < 0 && showOpInd > 0) {
      showOpInd = showOpInd + val;
      this.setState({ topCartSlide: showOpInd });
    }
  };

  /**
   * Handle Trending Slider
   */
  handletrendingSlide = (val) => {
    let trending = this.state.musicData.filter((n) => n.trending === true);

    let showOpInd = this.state.trendingSlide;
    if (val > 0 && showOpInd < trending.length - 4) {
      showOpInd = showOpInd + val;

      this.setState({ trendingSlide: showOpInd });
    }
    if (val < 0 && showOpInd > 0) {
      showOpInd = showOpInd + val;
      this.setState({ trendingSlide: showOpInd });
    }
  };

  /**
   * Handle Search Value
   */
  handleChange = (e) => {
    let { currentTarget: input } = e;
    this.setState({ search: input.value });
  };

  /**
   * Handle Search Reasult
   */
  handleSearch = async () => {
    let { search, data: musicData, datalistData } = this.state;
    let playlistData = [];
    let user = await auth.getCurrentUser();
    if (user !== null) {
      playlistData = await auth.getPlaylist(user.email);
      for (var i = 0; i < playlistData.length; i++) {
        playlistData[i].slide = 0;
      }
    } else {
      playlistData = [];
    }
    musicData = musicData.filter(
      (n) =>
        n.track.toLowerCase().substring(0, search.length) ===
          search.toLowerCase() ||
        n.name.toLowerCase().substring(0, search.length) ===
          search.toLowerCase()
    );
    let dlist = datalistData.filter(
      (n) =>
        n.track.toLowerCase().substring(0, search.length) ===
        search.toLowerCase()
    );

    for (var j = 0; j < playlistData.length; j++) {
      let songs = playlistData[j].songs.filter(
        (n) =>
          n.track.toLowerCase().substring(0, search.length) ===
            search.toLowerCase() ||
          n.name.toLowerCase().substring(0, search.length) ===
            search.toLowerCase()
      );
      playlistData[j].songs = songs;
    }

    await music.searchCount(search);
    this.setState({
      musicData: musicData,
      playlist: playlistData,
      datalist: dlist,
    });
  };

  //Use to play music
  playAudio = async () => {
    try {
      const audioEl = document.getElementsByClassName("audio-element")[0];
      this.setState({ songplay: true });

      audioEl.play();
      await music.playCount(this.state.musicData[this.state.selSong].name);
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

  handledLike = async (index) => {
    let likesongs = [];
    var data = [...this.state.musicData];
    data[index] = { ...data[index] };
    data[index].liked = !data[index].liked;

    try {
      let item = data[index];
      this.setState({ musicData: data });
      likesongs = await music.likeSong(item.name, item.liked);
    } catch (ex) {}
  };

  render() {
    let {
      musicData: music,
      topPickSlide,
      datalist,
      trendingSlide,
      topCartSlide,
      likesongSlide,
      queue,
      selSong,
      songplay,
      playlist,
    } = this.state;
    let user = auth.getCurrentUser();

    let topPick = music.filter((n) => n.top_picks === true);
    let topCharts = music.filter((n) => n.top_carts === true);
    let trending = music.filter((n) => n.trending === true);
    let likesongs = music.filter((n) => n.liked === true);

    let topPickslice = topPick.slice(topPickSlide, topPickSlide + 4);
    let topChartsslice = topCharts.slice(topCartSlide, topCartSlide + 4);
    let trendingslice = trending.slice(trendingSlide, trendingSlide + 4);
    let likeslice = likesongs.slice(likesongSlide, likesongSlide + 4);

    return (
      <div className="container-fluid  ">
        <NavBar sel={this.props.location.pathname} />
        {this.state.data.length !== 0 ? (
          <div
            className="row "
            style={{ backgroundColor: "gray", height: "100%" }}
          >
            <div className="col-lg-10 col-12 ">
              <div className="">
                <div
                  className="row mt-1 pb-3"
                  style={{ backgroundColor: "white", fontSize: 12 }}
                >
                  <div className="col-xl-7 col-lg-7 col-12">
                    <input
                      type="text"
                      value={this.state.search}
                      id="search"
                      name="search"
                      className="ui-autocomplete-input search_container_input"
                      placeholder="Search for Songs, Artists, Playlists and More"
                      onChange={this.handleChange}
                    />
                    <button
                      onClick={() => this.handleSearch()}
                      className="search_container_btn"
                    >
                      <i className="fas fa-search"></i>
                      &nbsp; Search
                    </button>
                  </div>
                  <div className="col-xl-2 col-lg-2 d-none d-lg-block">
                    <div className="row">
                      <div className="col p-3">
                        <div className="dropdown">
                          <div className="dropbtn">
                            <div
                              onClick={() => {
                                this.setState({ showtr: !this.state.showtr });
                              }}
                              className={
                                this.state.showtr === true
                                  ? "seltrendingCirlce"
                                  : " trendingCirlce"
                              }
                            >
                              trending 20
                            </div>
                          </div>
                          {this.state.showtr === true ? (
                            <div className="dropdown-content">
                              <div className="row text-center">
                                <div className="col-2"></div>
                                <div className="col-8 text-center">
                                  <Link
                                    to="/playlist/Love Aaj kal/Shayad"
                                    className="trendingCirlce"
                                    style={{
                                      fontSize: 10,
                                      margin: 3,
                                      color: "#e72c30",
                                    }}
                                  >
                                    Shayad
                                  </Link>
                                </div>
                              </div>

                              <div className="row">
                                <div className="col-0"></div>
                                <div className="col-8">
                                  <Link
                                    to="/list/Kabir Singh"
                                    className="trendingCirlce"
                                    style={{
                                      fontSize: 10,
                                      margin: 1,
                                      color: "#e72c30",
                                    }}
                                  >
                                    Kabir Singh
                                  </Link>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-2"></div>
                                <div className="col-8">
                                  <Link
                                    to="/playlist/Dil Bechara/Afreeda"
                                    className="trendingCirlce"
                                    style={{
                                      fontSize: 10,
                                      margin: 1,
                                      color: "#e72c30",
                                    }}
                                  >
                                    Afreeda
                                  </Link>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-0"></div>
                                <div className="col-8">
                                  <Link
                                    to="/playlist/Album/Ek Tarfa"
                                    className="trendingCirlce"
                                    style={{
                                      fontSize: 10,
                                      margin: 1,
                                      color: "#e72c30",
                                    }}
                                  >
                                    Ek Tarfa
                                  </Link>
                                </div>
                              </div>
                              <div className="row m-1"></div>
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3 d-none d-lg-block pt-4 ">
                    <div className="row">
                      <div className="col">
                        Download App &nbsp; &nbsp; &nbsp; &nbsp;
                        <i
                          style={{ fontSize: 30, cursor: "pointer" }}
                          className="fab fa-android"
                        ></i>
                        &nbsp; &nbsp; &nbsp; &nbsp;
                        <i
                          style={{ fontSize: 30, cursor: "pointer" }}
                          className="fab fa-apple"
                        ></i>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row" style={{ backgroundColor: "#e3e2dc" }}>
                  <div className="col-lg-1 d-none d-lg-block">
                    <Queue queue={queue} />
                  </div>
                  <div className="col-lg-11 col-12">
                    {user ? (
                      <React.Fragment>
                        {playlist.map((list, index) => (
                          <React.Fragment key={index}>
                            {list.songs.length > 0 ? (
                              <div className="row ">
                                {" "}
                                <div className="col-12 listHeading ">
                                  {list.name}
                                </div>
                                <div className="col-12">
                                  <ShowList
                                    l={list.songs.length}
                                    array={list.songs.slice(
                                      list.slide,
                                      list.slide + 4
                                    )}
                                    index={index}
                                    slider={list.slide}
                                    handleSlider={this.handleplaylistSlide}
                                  />
                                </div>
                                <div className="col-12 ">
                                  <div className="row">
                                    <div className="col m-2">
                                      <hr />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              ""
                            )}
                          </React.Fragment>
                        ))}
                      </React.Fragment>
                    ) : (
                      ""
                    )}
                    <div className="row">
                      <div className="col-12 listHeading ">TOP PICKS</div>
                      <div className="col-12">
                        <ShowList
                          l={topPick.length}
                          array={topPickslice}
                          slider={topPickSlide}
                          handleSlider={this.handletopPickSlide}
                        />
                      </div>
                      <div className="col-12 ">
                        <div className="row">
                          <div className="col m-2">
                            <hr />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12 listHeading ">
                        Bollywood Masala
                      </div>
                      <div className="col-12">
                        <ShowBList
                          l={datalist.length}
                          array={datalist}
                          slider={0}
                          handleSlider={() => {}}
                        />
                      </div>
                      <div className="col-12 ">
                        <div className="row">
                          <div className="col m-2">
                            <hr />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12 listHeading ">TRENDING SONGS</div>
                      <div className="col-12">
                        <ShowList
                          l={trending.length}
                          array={trendingslice}
                          slider={trendingSlide}
                          handleSlider={this.handletrendingSlide}
                        />
                      </div>
                      <div className="col-12 ">
                        <div className="row">
                          <div className="col m-2">
                            <hr />
                          </div>
                        </div>
                      </div>
                    </div>
                    {likesongs.length > 0 ? (
                      <div className="row">
                        <div className="col-12 listHeading ">LIKED SONGS</div>
                        <div className="col-12">
                          <ShowList
                            l={likesongs.length}
                            array={likeslice}
                            slider={likesongSlide}
                            handleSlider={this.handleLikeSlide}
                          />
                        </div>
                        <div className="col-12 ">
                          <div className="row">
                            <div className="col m-2">
                              <hr />
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                    <div className="row">
                      <div className="col-12 listHeading ">Top Charts</div>
                      <div className="col-12">
                        <ShowList
                          l={topCharts.length}
                          array={topChartsslice}
                          slider={topCartSlide}
                          handleSlider={this.handletopCartSlide}
                        />
                      </div>
                      <div className="col-12 ">
                        <div className="row">
                          <div className="col m-2">
                            <hr />
                          </div>
                        </div>
                      </div>
                    </div>
                    <br />
                    <br />
                    <br />
                    <br />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-2 mt-1 d-none d-lg-block text-right">
              <img src={adv} className="img-fluid" alt="adv" />
            </div>
          </div>
        ) : (
          <ProgressBar />
        )}

        {music[selSong] !== undefined ? (
          <SongBar
            song={music[selSong]}
            onLike={this.handledLike}
            addPlaylist={this.handleAddPlay}
            addQueue={this.handleAddQueue}
            onCurrentM={this.handdleCurrentMusic}
            onPlay={this.playAudio}
            onPause={this.pauseAudio}
            selIndex={selSong}
            checkSongPLay={songplay}
          />
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default Home;
