import React, { Component } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
class LoginForm extends Component {
  state = {};
  render() {
    return (
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email("Email must be like ex@gmail.com")
            .required("Email is required"),
          password: Yup.string()
            .min(6, "Password must be at least 6 characters")
            .required("Password is required"),
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
                  Continue
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

export default LoginForm;
