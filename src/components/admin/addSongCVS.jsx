import React, { Component } from "react";
import NavBar from "./../navBar";
import music from "../../services/songApi";

class AddSongCSV extends Component {
  state = {
    data: { value: "", path: "" },
  };

  handleChange = (e) => {
    let data = this.state.data;
    if (e.currentTarget.id === "value") {
      data.value = e.currentTarget.files[0].name;
      this.setState({ data });
    } else {
      data.path = e.currentTarget.value;
      this.setState({ data });
    }
  };

  handleSubmit = async () => {
    let { data: file } = this.state;
    if (
      file.value.substring(file.value.length - 4, file.value.length) === ".csv"
    ) {
      try {
        console.log(file);
        let f = file.path + "\\" + file.value;
        await music.addSongUsingCSV(f);
        alert("Added Successfully");
        window.location = "/home";
      } catch (ex) {
        alert("Please Try Again");
        window.location = "/addsongsCVS";
      }
    } else {
      alert("Please Choose Correct CSV File !!!");
    }
  };

  render() {
    return (
      <div className="">
        <NavBar />
        <div
          className="row text-center"
          style={{
            background: "linear-gradient(to bottom , #62a5b5 ,  #315c66)",
            color: "white",
          }}
        >
          <div className="col-12 text-center">
            <br />
            <h4>Upload Song File</h4> <br />
            <div className="row">
              <div className="col-6 ">
                <label htmlFor="myfile">
                  Select a song File: &nbsp;&nbsp;{" "}
                </label>
              </div>
              <div className="col-6 text-left">
                <input
                  onChange={this.handleChange}
                  type="file"
                  id="value"
                  name="value"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-6 ">
                <label htmlFor="myfile">Select Path: &nbsp;&nbsp; </label>
              </div>
              <div className="col-6 text-left">
                <input
                  onChange={this.handleChange}
                  type="text"
                  id="path"
                  name="path"
                  value={this.state.data.path}
                />
              </div>
            </div>
            <div className="row">
              <div className="col m-1 text-center">
                <button
                  onClick={() => this.handleSubmit()}
                  className="btn btn-warning m-1"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AddSongCSV;
