import { useState, useCallback } from "react";
import { useRouter } from "next/router";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import Button from "components/Button";
import Link from "next/link";
import CustomSpinnerIcon from "config/CustomSpinner";
import { Alert, Spin } from "antd";
import { colors } from "./styles";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import ErrorMsg from "./ErrorMsg";
import PageLoader from "components/PageLoader/PageLoader";
import SignUpSuccessModal from "./SignUpSuccessModal";
import axios from "axios";
export default function CreateAccount() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);
  const [modal, setModal] = useState(false);





  // formik

  const initialValues = {
    firstName: "",
    lastName: "",
    userName: "",
    password: "",
    confirmPassword: "",
    email: "",
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required("*Please provide your first name"),
    lastName: Yup.string().required("*Please provide your last name"),
    userName: Yup.string()
      .required("*Please provide your user name")
      .matches(
        /^[A-Za-z][A-Za-z0-9_]{0,11}$/,
        "User name must start with a letter, and can only contain up to 12 characters including letters, numbers, and underscores"
      ),
    password: Yup.string()
      .required("*password is required!")
      .min(8, "*Password must be at least 8 characters!")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{8,}$/,
        "Password must contain lower and uppercase alphabets and special characters!"
      ),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("*Please confirm your password"),
    email: Yup.string()
      .email("Invalid email address!")
      .required("*Email is required!"),
  });


  const handleCreateAccount = useCallback(
    (formik) => {
      setLoading(true);
      if (formik?.values) {
        axios.post('http://localhost:8000/signup', formik?.values)
          .then(res => {
            if (res.data.insertId > 0) {
              setModal(true);
            }
          })
          .then(err => console.log(err))
      }
    },
    [router]
  );
  return modal ? (
    <SignUpSuccessModal />
  ) : (
    <PageLoader loading={pageLoading}>
      <div className="w-full">
        <h1 className="text-2xl font-semibold mb-5 ">Create your Account</h1>
        {error.error && (
          <Alert
            className="mb-5"
            message={error.errMessage}
            type="error"
            showIcon
          />
        )}
        <div className="flex flex-col gap-2 ">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
          >
            {(formik) => (
              <Form>
                <div>
                  <Field
                    placeholder="First Name"
                    className={`${colors["primary"]} mb-3
              px-6 py-3`}
                    type="text"
                    id="firstName"
                    name="firstName"
                  />
                  <ErrorMessage
                    name="firstName"
                    render={(msg) => <ErrorMsg>{msg}</ErrorMsg>}
                  />
                </div>
                <div>
                  <Field
                    placeholder="Last Name"
                    className={`${colors["primary"]} mb-3
              px-6 py-3`}
                    type="text"
                    id="lastName"
                    name="lastName"
                  />
                  <ErrorMessage
                    name="lastName"
                    render={(msg) => <ErrorMsg>{msg}</ErrorMsg>}
                  />
                </div>
                <div>
                  <Field
                    placeholder="User Name"
                    className={`${colors["primary"]} mb-3
              px-6 py-3`}
                    type="text"
                    id="userName"
                    name="userName"
                  />
                  <ErrorMessage
                    name="userName"
                    render={(msg) => <ErrorMsg>{msg}</ErrorMsg>}
                  />
                </div>

                <div>
                  <Field
                    placeholder="Email"
                    className={`${colors["primary"]} mb-3
              px-6 py-3`}
                    type="email"
                    id="email"
                    name="email"
                  />
                  <ErrorMessage
                    name="email"
                    render={(msg) => <ErrorMsg>{msg}</ErrorMsg>}
                  />
                </div>
                <div>
                  <div className="relative">
                    <Field
                      placeholder="Password"
                      className={`${colors["primary"]} mb-3 px-6 py-3 ${showPassword ? "pr-12" : ""
                        }`}
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                    />
                    <div
                      className="absolute inset-y-0 right-0 flex items-center pb-2 pr-3 cursor-pointer"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeInvisibleOutlined className="text-[20px] " />
                      ) : (
                        <EyeOutlined className=" text-[20px] " />
                      )}
                    </div>
                  </div>

                  <ErrorMessage
                    name="password"
                    render={(msg) => <ErrorMsg>{msg}</ErrorMsg>}
                    component="div"
                  />
                </div>
                {/* confirm password */}
                <div>
                  <div className="relative">
                    <Field
                      placeholder="Confirm Password"
                      className={`${colors["primary"]} mb-3 px-6 py-3 ${showConfirmPassword ? "pr-12" : ""
                        }`}
                      type={showConfirmPassword ? "text" : "password"}
                      id="confirmPassword"
                      name="confirmPassword"
                    />
                    <div
                      className="absolute inset-y-0 right-0 flex items-center pb-2 pr-3 cursor-pointer"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? (
                        <EyeInvisibleOutlined className="text-[20px] " />
                      ) : (
                        <EyeOutlined className=" text-[20px] " />
                      )}
                    </div>
                  </div>

                  <ErrorMessage
                    name="confirmPassword"
                    render={(msg) => <ErrorMsg>{msg}</ErrorMsg>}
                    component="div"
                  />
                </div>

                <Button
                  additionalClasses="w-full mt-3"
                  color="primary"
                  disabled={
                    !formik.values.email ||
                    !formik.values.firstName ||
                    !formik.values.lastName ||
                    !formik.values.userName ||
                    !formik.values.password ||
                    formik.errors.email ||
                    formik.errors.userName ||
                    formik.errors.password ||
                    formik.errors.confirmPassword ||
                    formik.isSubmitting
                  }
                  onClick={() => handleCreateAccount(formik)}
                >
                  <span className="flex gap-5 self-center">
                    Sign Up
                    {loading && <Spin indicator={<CustomSpinnerIcon />} />}
                  </span>
                </Button>
              </Form>
            )}
          </Formik>
        </div>

        <p className="mt-6 text-sm text-slate-500">
          Already have an account?
          <Link href="/auth/sign-in">
            <a
              onClick={() => setPageLoading(true)}
              className="ml-1 mr-2 text-shurqBlue underline"
            >
              Login.
            </a>
          </Link>
        </p>
        <p className="mt-1 text-sm text-slate-500">
          Forgot your password?
          <Link href="/auth/reset-password">
            <a
              onClick={() => setPageLoading(true)}
              className="ml-1 mr-2 text-shurqBlue underline"
            >
              Reset Password.
            </a>
          </Link>
        </p>
      </div>
    </PageLoader>
  );
}
