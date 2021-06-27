import React, { Component } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
class SignupForm extends Component {
  state = {};
  render() {
    return (
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
          mobile: "",
          age: "",
          dob: "",
        }}
        validationSchema={Yup.object().shape({
          name: Yup.string().required("Name is required"),
          dob: Yup.string().required("D.O.B is required"),
          age: Yup.number()
            .min(13, "User must be 12+")
            .required("Age is required"),
          email: Yup.string()
            .email("Email must be like ex@gmail.com")
            .required("Email is required"),
          password: Yup.string()
            .min(6, "Password must be at least 6 characters")
            .required("Password is required"),
          mobile: Yup.string()
            .min(10, "Mobile number  must be of 10 digits")
            .max(10, "Mobile number  must be of 10 digits")
            .required("Mobile number is required"),
        })}
        onSubmit={async (fields) => {
          this.props.onSubmit(fields);
        }}
        render={({ errors, status, touched }) => (
          <div className="row text-center">
            <div className="col-1"></div>
            <div className="col-10">
              <Form>
                <div className="form-group text-left">
                  <label htmlFor="name"> Name</label>

                  <Field
                    name="name"
                    type="text"
                    placeholder="User name"
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
                  <label htmlFor="email"> EMAIL ID</label>

                  <Field
                    name="email"
                    type="text"
                    placeholder="Email ID"
                    className={
                      "form-control login-form-box-field" +
                      (errors.email && touched.email ? " is-invalid" : "")
                    }
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>

                <div className="form-group text-left">
                  <label htmlFor="mobile">Mobile Number</label>

                  <Field
                    name="mobile"
                    type="number"
                    placeholder="Enter Mobile number"
                    className={
                      "form-control login-form-box-field" +
                      (errors.mobile && touched.mobile ? " is-invalid" : "")
                    }
                  />
                  <ErrorMessage
                    name="mobile"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>
                <div className="row">
                  <div className="col-12 col-lg-6">
                    <div className="form-group text-left">
                      <label htmlFor="age">Age</label>

                      <Field
                        name="age"
                        type="text"
                        placeholder="Enter Age"
                        className={
                          "form-control login-form-box-field" +
                          (errors.mobile && touched.mobile ? " is-invalid" : "")
                        }
                      />
                      <ErrorMessage
                        name="age"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>
                  </div>{" "}
                  <div className="col-12 col-lg-6">
                    <div className="form-group text-left">
                      <label htmlFor="age">Date of Birth</label>

                      <Field
                        name="dob"
                        type="date"
                        placeholder="Enter dob"
                        className={
                          "form-control login-form-box-field" +
                          (errors.dob && touched.dob ? " is-invalid" : "")
                        }
                      />
                      <ErrorMessage
                        name="dob"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>
                  </div>
                </div>
                <div className="form-group text-left">
                  <label htmlFor="email"> Password</label>

                  <Field
                    name="password"
                    type="text"
                    placeholder="Enter Password"
                    className={
                      "form-control login-form-box-field" +
                      (errors.password && touched.password ? " is-invalid" : "")
                    }
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-full btn-danger mt25 btn-sm mr-2"
                  style={{ display: "inline-block", width: "100%" }}
                >
                  Add Details{" "}
                </button>
              </Form>
            </div>
            <div className="col-1"></div>
          </div>
        )}
      />
    );
  }
}

export default SignupForm;
