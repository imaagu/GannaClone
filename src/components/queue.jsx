import React, { Component } from "react";
import "../css/sidenav.css";

class Queue extends Component {
  state = {
    isOpen: false,
    data: this.props.queue,
  };

  handleToggle = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  render() {
    const { isOpen, data } = this.state;

    return (
      <React.Fragment>
        <div
          onClick={() => this.handleToggle()}
          className={isOpen ? "sidenav sidenavOpen" : "sidenav sidenavClose"}
        >
          <h6 className="text-center"> Queue</h6>

          {data.length > 0 ? (
            <React.Fragment>
              <div className="row">
                {data.map((n, index) => (
                  <div className="col-12" key={index}>
                    <div className="row">
                      <div className="col-4">
                        {" "}
                        <img
                          src={n.img}
                          style={{
                            borderRadius: 15,
                            height: 55,
                            width: 55,
                            padding: 1,
                          }}
                          alt=""
                        />
                      </div>
                      {isOpen ? (
                        <div
                          style={{ fontSize: 14, margin: "auto", width: "50%" }}
                          className="col-5"
                        >
                          {n.name}
                        </div>
                      ) : (
                        ""
                      )}
                      {isOpen ? (
                        <div
                          className="col-2"
                          style={{ margin: "auto", width: "50%" }}
                        >
                          <i
                            style={{
                              cursor: "pointer",
                            }}
                            className="fas fa-share"
                          ></i>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </React.Fragment>
          ) : (
            ""
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default Queue;
