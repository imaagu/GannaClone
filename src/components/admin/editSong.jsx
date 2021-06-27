import React, { Component } from "react";
import NavBar from "./../navBar";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import music from "../../services/songApi";
class EditSong extends Component {
  state = {
    item: null,
  };

  async componentDidMount() {
    let { name } = this.props.match.params;
    let songs = await music.getSongs();
    let item = songs.find((n) => n.name === name);
    this.setState({ item });
  }

  render() {
    let { item } = this.state;
    return (
      <React.Fragment>
        {item ? (
          <Formik
            initialValues={{
              track: item.track,
              name: item.name,
              img: item.img,
              song: item.song,
              director: item.director,
              studio: item.studio,
              year: item.year,
              likes: item.likes,
              duration: item.duration,
              top_carts: item.top_carts,
              top_picks: item.top_picks,
              trending: item.trending,
              liked: item.liked,
            }}
            validationSchema={Yup.object().shape({
              track: Yup.string().required("Track name is required"),
              name: Yup.string().required("Song name is required"),
              img: Yup.string().required("Image link is required"),
              song: Yup.string().required("Song link is required"),
              director: Yup.string().required("Director name is required"),
              studio: Yup.string().required("Studio link is required"),
              year: Yup.string().required("release year is required"),
              likes: Yup.string().required("No. of likes is required"),
              duration: Yup.string().required("duration is required"),
            })}
            onSubmit={async (fields) => {
              try {
                await music.editSong(
                  item.name,
                  fields.track,
                  fields.name,
                  fields.img,
                  fields.song,
                  fields.director,
                  fields.studio,
                  fields.year,
                  fields.likes,
                  fields.duration,
                  fields.top_carts,
                  fields.top_picks,
                  fields.trending,
                  fields.liked
                );

                alert("Edit Song Successfully");
                window.location = "/home";
              } catch (ex) {
                alert("Something went wrong");
                window.location = "/dashboard";
              }
            }}
            render={({ errors, status, touched }) => (
              <div className="container-fluid">
                <NavBar />
                <div
                  className="row text-center"
                  style={{
                    background:
                      "linear-gradient(to bottom , #62a5b5 ,  #315c66)",
                    color: "white",
                  }}
                >
                  <div className="col-12 text-center">
                    <br />
                    <h4>Edit Song</h4>{" "}
                  </div>
                  <div className="col-1"></div>
                  <div className="col-10">
                    <Form>
                      <div className="form-group text-left">
                        <label htmlFor="track"> Track Name</label>

                        <Field
                          name="track"
                          type="text"
                          placeholder="Track name"
                          className={
                            "form-control login-form-box-field" +
                            (errors.track && touched.track ? " is-invalid" : "")
                          }
                        />
                        <ErrorMessage
                          name="track"
                          component="div"
                          className="invalid-feedback"
                        />
                      </div>
                      <div className="form-group text-left">
                        <label htmlFor="name">Name</label>

                        <Field
                          name="name"
                          type="text"
                          placeholder="Enter Song Name"
                          className={
                            "form-control login-form-box-field" +
                            (errors.name && touched.name ? " is-invalid" : "")
                          }
                        />
                        <ErrorMessage
                          name="name"
                          component="div"
                          className="invalid-feedback"
                        />
                      </div>
                      <div className="form-group text-left">
                        <label htmlFor="img"> Image Link</label>

                        <Field
                          name="img"
                          type="text"
                          placeholder="Image Link"
                          className={
                            "form-control login-form-box-field" +
                            (errors.img && touched.img ? " is-invalid" : "")
                          }
                        />
                        <ErrorMessage
                          name="img"
                          component="div"
                          className="invalid-feedback"
                        />
                      </div>
                      <div className="form-group text-left">
                        <label htmlFor="song"> Song Link</label>

                        <Field
                          name="song"
                          type="text"
                          placeholder="Song Link"
                          className={
                            "form-control login-form-box-field" +
                            (errors.song && touched.song ? " is-invalid" : "")
                          }
                        />
                        <ErrorMessage
                          name="song"
                          component="div"
                          className="invalid-feedback"
                        />
                      </div>
                      <div className="form-group text-left">
                        <label htmlFor="director"> Director Name</label>

                        <Field
                          name="director"
                          type="text"
                          placeholder="Director Name"
                          className={
                            "form-control login-form-box-field" +
                            (errors.director && touched.director
                              ? " is-invalid"
                              : "")
                          }
                        />
                        <ErrorMessage
                          name="director"
                          component="div"
                          className="invalid-feedback"
                        />
                      </div>
                      <div className="form-group text-left">
                        <label htmlFor="studio">Studio Name</label>

                        <Field
                          name="studio"
                          type="text"
                          placeholder="Studio Name"
                          className={
                            "form-control login-form-box-field" +
                            (errors.studio && touched.studio
                              ? " is-invalid"
                              : "")
                          }
                        />
                        <ErrorMessage
                          name="studio"
                          component="div"
                          className="invalid-feedback"
                        />
                      </div>
                      <div className="form-group text-left">
                        <label htmlFor="year">Release Year</label>

                        <Field
                          name="year"
                          type="number"
                          placeholder="Release year"
                          className={
                            "form-control login-form-box-field" +
                            (errors.year && touched.year ? " is-invalid" : "")
                          }
                        />
                        <ErrorMessage
                          name="year"
                          component="div"
                          className="invalid-feedback"
                        />
                      </div>
                      <div className="form-group text-left">
                        <label htmlFor="likes">Likes</label>

                        <Field
                          name="likes"
                          type="number"
                          placeholder="No. of Likes"
                          className={
                            "form-control login-form-box-field" +
                            (errors.likes && touched.likes ? " is-invalid" : "")
                          }
                        />
                        <ErrorMessage
                          name="likes"
                          component="div"
                          className="invalid-feedback"
                        />
                      </div>
                      <div className="form-group text-left">
                        <label htmlFor="duration">Duration(sec)</label>

                        <Field
                          name="duration"
                          type="number"
                          placeholder="duration of song (in sec)"
                          className={
                            "form-control login-form-box-field" +
                            (errors.duration && touched.duration
                              ? " is-invalid"
                              : "")
                          }
                        />
                        <ErrorMessage
                          name="duration"
                          component="div"
                          className="invalid-feedback"
                        />
                      </div>
                      <div className="form-group form-inline  text-left">
                        <label htmlFor="top_carts">
                          {" "}
                          <Field
                            name="top_carts"
                            type="checkbox"
                            placeholder=""
                            className={
                              "form-control  " +
                              (errors.top_carts && touched.top_carts
                                ? " is-invalid"
                                : "")
                            }
                          />
                          <b> &nbsp;Top Cart</b>
                        </label>
                      </div>
                      <div className="form-group form-inline  text-left">
                        <label htmlFor="top_picks">
                          {" "}
                          <Field
                            name="top_picks"
                            type="checkbox"
                            placeholder=""
                            className={
                              "form-control  " +
                              (errors.top_picks && touched.top_picks
                                ? " is-invalid"
                                : "")
                            }
                          />
                          <b> &nbsp;Top Pick</b>
                        </label>
                      </div>
                      <div className="form-group form-inline  text-left">
                        <label htmlFor=" trending">
                          {" "}
                          <Field
                            name=" trending"
                            type="checkbox"
                            placeholder=""
                            className={
                              "form-control  " +
                              (errors.trending && touched.trending
                                ? " is-invalid"
                                : "")
                            }
                          />
                          <b> &nbsp;Trending</b>
                        </label>
                      </div>
                      <button
                        type="submit"
                        className="btn btn-full btn-danger mt25 btn-sm mr-2"
                        style={{ display: "inline-block", width: "100%" }}
                      >
                        Edit
                      </button>
                    </Form>
                  </div>
                  <div className="col-1"></div>
                </div>
              </div>
            )}
          />
        ) : (
          ""
        )}
      </React.Fragment>
    );
  }
}

export default EditSong;
