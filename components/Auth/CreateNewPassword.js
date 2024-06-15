import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
// formik
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Alert, Spin } from "antd";
import { message as AntMessage } from "antd";


import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { ResetPassword } from "redux/slices/auth-slice";
import { colors } from "./styles";
import Button from "components/Button";
import PageLoader from "components/PageLoader/PageLoader";
import CustomSpinnerIcon from "config/CustomSpinner";
import ErrorMsg from "./ErrorMsg";


// import ErrorMsg from "components/Auth/ErrorMsg";
// import CustomSpinnerIcon from "config/CustomSpinner";
// import PageLoader from "components/PageLoader/PageLoader";
// import Button from "components/Button";
// import { colors } from "components/Auth/styles";
// import { ResetPassword } from "../../redux/slices/auth-slice";
  

const CreateNewPassword = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const [pageLoading, setPageLoading] = useState(false);
  
    const [error, setError] = useState({ error: false, errMessage: "" });
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
  
    const { token } = useSelector((state) => state.auth);
    const initialValues = {
      password: "",
      confirmPassword: "",
    };
  
    const validationSchema = Yup.object({
      password: Yup.string()
        .required("password is required!")
        .min(8, "Password must be at least 8 characters!")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{8,}$/,
          "Password must contain lower and uppercase alphabets and special characters!"
        ),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("*Please confirm your password"),
    });
  
    // useEffect(() => {
    //   if (token) {
    //     router.push(`/home`);
    //   }
    // }, [token]);
  
    // const handleNewPassword = useCallback(
    //   (formik) => {
    //     setLoading(true);
    //     const { token: emailToken } = router.query;
    //     // const { email } = jwt.decode(emailToken);
    //     // console.log(email, "jwt decoded from");
    //     dispatch(ResetPassword({ ...formik.values, email: emailToken })).then(
    //       ({ payload }) => {
    //         console.log("from signing page:", payload);
    //         const { status, message } = payload;
    //         if (status == 200) {
    //           setLoading(false);
    //           setPageLoading(true);
    //           AntMessage.success(
    //             "successfully! Your Password has been reset. ",
    //             5,
    //             () => {
    //               router.push(`/auth/sign-in`);
    //             }
    //           );
    //           formik.setSubmitting(false);
    //         } else {
    //           AntMessage.error(
    //             "Could not reset your password right now. please retry after 3 to 4 hours. ",
    //             8,
    //             () => {}
    //           );
  
    //           setLoading(false);
    //           setError({
    //             error: true,
    //             errMessage:
    //               "Could not reset your password right now.Retry after 3 to 4 hours.",
    //           });
    //         }
    //       }
    //     );
    //   },
    //   [dispatch, router]
    // );
  
  return (
    <PageLoader loading={pageLoading}>
    <div className="w-full h-[100vh] flex justify-center items-center">
      <div className="w-[40%]">
        <h1 className="text-2xl font-semibold mb-5">Welcome Back</h1>
        <div className="flex gap-2 flex-col">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
          >
            {(formik) => (
              <Form>
                <div>
                  <div className="relative">
                    <Field
                      placeholder="Password"
                      className={`${colors["primary"]} mb-3 px-6 py-3 ${
                        showPassword ? "pr-12" : ""
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
                <div>
                  <div className="relative">
                    <Field
                      placeholder="Confirm New Password"
                      className={`${colors["primary"]} mb-3 px-6 py-3 ${
                        showPassword ? "pr-12" : ""
                      }`}
                      type={showPassword ? "text" : "password"}
                      id="confirmPassword"
                      name="confirmPassword"
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
                    name="confirmPassword"
                    render={(msg) => <ErrorMsg>{msg}</ErrorMsg>}
                    component="div"
                  />
                </div>
                <Button
                  additionalClasses="w-full mt-3"
                  color="primary"
                  disabled={
                    !formik.values.confirmPassword ||
                    !formik.values.password ||
                    formik.errors.confirmPassword ||
                    formik.errors.password ||
                    formik.isSubmitting
                  }
                  onClick={() => handleNewPassword(formik)}
                >
                  <span className="flex gap-5 self-center">
                    Create Now
                    {loading && <Spin indicator={<CustomSpinnerIcon />} />}
                  </span>
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  </PageLoader>
  )
}

export default CreateNewPassword




