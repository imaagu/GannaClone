import React, { Component } from "react";
import NavBar from "./../navBar";
import auth from "../../services/authServices";
import swal from "sweetalert";

class UserList extends Component {
  state = {
    list: [],
    name: "",
    email: "",
  };

  async componentDidMount() {
    let { email } = this.props.match.params;
    let users = await auth.getUsers();
    let user = users.find((n) => n.email === email);
    console.log(user.list);
    this.setState({ list: user.list, name: user.name, email: user.email });
  }

  onDownload = async (name, user) => {
    try {
      let data = await auth.convertToCSV(name, user);

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
              {this.state.name.toUpperCase()}'s List
            </div>
          </div>
          <br />
          <div className="">
            {this.state.list.map((l, index) => (
              <div className="row" key={index}>
                {l.songs.length > 0 ? (
                  <div className="col">
                    <div className="row ml-1 mr-1">
                      <div className="col-12">
                        <hr />
                      </div>
                      <div className="col-10 " style={{ fontWeight: "500" }}>
                        Playlist: {l.name.toUpperCase()}
                      </div>
                      <div className="col-1">
                        <i
                          style={{ cursor: "pointer" }}
                          onClick={() =>
                            this.onDownload(l.name, this.state.email)
                          }
                          className="fas fa-cloud-download-alt"
                        ></i>
                      </div>
                      <div
                        className="col-12 text-center"
                        style={{ fontWeight: "500" }}
                      >
                        songs
                      </div>
                      <div
                        className="col-12 text-center"
                        style={{ fontSize: 14 }}
                      >
                        <br />
                        <div
                          className="row text-center "
                          style={{ fontWeight: "500" }}
                        >
                          <div className="col-4">Track</div>
                          <div className="col-4">Name</div>
                          <div className="col-4">Likes</div>
                        </div>
                        {l.songs.map((song, index) => (
                          <div className="row text-center" key={index}>
                            <div className="col-4">{song.track}</div>
                            <div className="col-4">{song.name}</div>
                            <div className="col-4">{song.likes}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
            ))}
          </div>
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

export default UserList;
