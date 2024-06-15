import { useState, useCallback } from "react";
import { useRouter } from "next/router";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import Button from "components/Button";
import Link from "next/link";
import CustomSpinnerIcon from "config/CustomSpinner";
import { Alert, Spin } from "antd";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import PageLoader from "components/PageLoader/PageLoader";
import axios from "axios";
import { colors } from "../Auth/styles";
import ErrorMsg from "../Auth/ErrorMsg";


export default function AddButtonForm() {
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
      console.log('form data add product', formik);
    },
    [router]
  );
  return (
    <PageLoader loading={pageLoading}>
      <div>
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
                  <p className="pb-4 text-shurqBlue font-semibold text-sm">Please enter an Amazon product URL:</p>
                  <Field
                    className={`${colors["primary"]} mb-3
              px-6 py-3`}
                    type="text"
                    id="firstName"
                    name="firstName"
                  />
                </div>

                {/* textarea */}
                <div>
                  <p className="pb-4 pt-2 text-shurqBlue font-semibold text-sm">Please enter the keywords or key phrases you’d like to track(One per Line):</p>
                  <Field as="textarea" className={`${colors["primary"]} mb-3
              px-6 py-3 h-[336px] form-textarea`} id="lastName"
                    name="lastName"/>
                  <label className="flex items-center container">
                    <Field type="checkbox" name="jobType" value="designer" className="w-[23px] h-[23px]" />
                    <span class="checkmark"></span>
                    <span className="pl-3 pt-1 text-shurqLightBlue font-semibold text-sm">Remove Special Characters (.,?!&*%$@#, etc.)</span>
                  </label>
                </div>

                {/* select */}
                <div>
                  <p className="pb-4 pt-5 text-shurqBlue font-semibold text-sm">Select Marketplace:</p>
                  <Field name="colors" as="select" className={`${colors["primary"]} mb-3
              px-6 py-3 my-select icon-arrow`}>
                    <option>Select a Market Place</option>
                    <option value="red">Red</option>
                    <option value="green">Green</option>
                    <option value="blue">Blue</option>
                  </Field>
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
      </div>
    </PageLoader>
  );
}
