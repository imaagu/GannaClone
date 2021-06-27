import React, { Component } from "react";
import "../css/home.css";
import { Link } from "react-router-dom";
class ShowBList extends Component {
  state = {};
  render() {
    let { l, array, slider, handleSlider } = this.props;

    return (
      <div className="row">
        <div
          className="col-1 text-left"
          style={{
            margin: "auto",
            width: "50%",
          }}
        >
          {l < 5 || slider === 0 ? (
            <i
              style={{ fontSize: 18 }}
              className="text-muted fas fa-chevron-left"
            ></i>
          ) : (
            <i
              onClick={() => handleSlider(-1)}
              style={{ fontSize: 18, cursor: "pointer" }}
              className="fas fa-chevron-left"
            ></i>
          )}
        </div>
        <div className="col-9">
          <div className="row">
            {array.map((m, index) => (
              <div key={index} className="col-3 p-1">
                <Link to={"/list/" + m.track} className="row">
                  <div className="col-12  mb-1 text-center">
                    <img
                      id="listimg"
                      src={m.img}
                      alt="img"
                      className="img-fluid"
                      style={{ borderRadius: 20, maxHeight: 150 }}
                    />
                  </div>

                  <div
                    className="col-12  d-block d-sm-none text-center "
                    style={{ color: "black", fontSize: "3vw" }}
                  >
                    {m.track.length < 8
                      ? m.track
                      : m.track.substring(0, 8) + ".."}
                  </div>
                  <div
                    className="col-lg-12 col-md-12 col-sm-12 d-none d-sm-block   text-center "
                    style={{ color: "black" }}
                  >
                    {m.track.length < 8
                      ? m.track
                      : m.track.substring(0, 8) + ".."}
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>

        <div
          className="col-1 text-right"
          style={{ margin: "auto", width: "50%" }}
        >
          {l < 5 || slider === array.length - 1 ? (
            <i
              style={{ fontSize: 18 }}
              className="text-muted fas fa-chevron-right"
            ></i>
          ) : (
            <i
              onClick={() => handleSlider(1)}
              style={{ fontSize: 18, cursor: "pointer" }}
              className="fas fa-chevron-right"
            ></i>
          )}
        </div>
      </div>
    );
  }
}

export default ShowBList;
