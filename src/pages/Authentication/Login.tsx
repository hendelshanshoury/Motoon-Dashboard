import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import AuthForm from "./AuthForm";
import { Field, Form, Formik } from "formik";
import InputGroup from "../../components/Forms/InputGroup";
import ErrMsg from "../../components/Forms/ErrMsg";
import * as Yup from "yup";
import useAuth from "../../hooks/useAuth";
import Cookies from "universal-cookie";

const initValues = {
  email: "",
  password: "",
};

const SubmittedLoginForm = Yup.object({
  email: Yup.string(),
  password: Yup.string().required("الحقل مطلوب"),
});

const Login = () => {
  const loginUrl = "/api/admin/login";
  const navigateUrl = "/";
  const { submitLoginForm } = useAuth({ loginUrl, navigateUrl });

  return (
    <div>
      <AuthForm ttl="تسجيل الدخول" Name="">
        <Formik
          initialValues={initValues}
          validationSchema={SubmittedLoginForm}
          onSubmit={submitLoginForm}
        >
          {({ touched, errors }) => (
            <Form className="space-y-5 dark:text-white">
              <InputGroup className="" errorToast={errors}>
                <div>
                  <label htmlFor="Email">البريد الالكتروني</label>
                  <div className="relative text-white-dark">
                    <Field
                      dir="auto"
                      name="email"
                      type="email"
                      required
                      id="email"
                      className="form-input placeholder:text-white-dark"
                      placeholder=""
                    />
                    {touched.email && <ErrMsg name="email" />}
                  </div>
                </div>
                <div>
                  <label htmlFor="Password">كلمة السر</label>
                  <div className="relative text-white-dark">
                    <Field
                      dir="auto"
                      name="password"
                      type="password"
                      id="password"
                      className="form-input placeholder:text-white-dark"
                      placeholder=""
                    />
                    {touched.password && <ErrMsg name="password" />}
                  </div>
                </div>
              </InputGroup>
              <button
                type="submit"
                className="btn btn-gradient !mt-6 w-full border-0 uppercase shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)]"
              >
                تسجيل الدخول
              </button>
            </Form>
          )}
        </Formik>
      </AuthForm>
    </div>
  );
};

export default Login;
