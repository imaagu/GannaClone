import React, { Component } from "react";
import "../css/home.css";
import { Link } from "react-router-dom";
class ShowList extends Component {
  state = {};
  render() {
    let { l, array, slider, handleSlider, index } = this.props;

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
              onClick={() => handleSlider(-1, index)}
              style={{ fontSize: 18, cursor: "pointer" }}
              className="fas fa-chevron-left"
            ></i>
          )}
        </div>
        <div className="col-9">
          <div className="row">
            {array.map((m, index) => (
              <div key={index} className="col-3 p-1">
                <Link
                  to={"/playlist/" + m.track + "/" + m.name}
                  className="row"
                >
                  <div className="col-12  mb-1 text-center">
                    <img
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
                    {m.name.length < 8 ? m.name : m.name.substring(0, 8) + ".."}
                  </div>
                  <div
                    className="col-lg-12 col-md-12 col-sm-12 d-none d-sm-block   text-center "
                    style={{ color: "black" }}
                  >
                    {m.name.length < 8 ? m.name : m.name.substring(0, 8) + ".."}
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
          {l < 5 || !(slider < l - 4) ? (
            <i
              style={{ fontSize: 18 }}
              className="text-muted fas fa-chevron-right"
            ></i>
          ) : (
            <i
              onClick={() => handleSlider(1, index)}
              style={{ fontSize: 18, cursor: "pointer" }}
              className="fas fa-chevron-right"
            ></i>
          )}
        </div>
      </div>
    );
  }
}

export default ShowList;
