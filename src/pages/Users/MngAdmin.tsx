import React from "react";
import MainBreadcrumbs from "../Elements/MainBreadcrumbs";
import * as Yup from "yup";
import { Field, Form, Formik } from "formik";
import InputGroup from "../../components/Forms/InputGroup";
import ErrMsg from "../../components/Forms/ErrMsg";
import useGetInitial from "../../hooks/useGetInitial";
import { useLocation, useParams } from "react-router-dom";
import LangFormSwitcher from "../../components/Forms/LangFormSwitcher";
import useCreate from "../../hooks/useCreate";
import { StatusOptions, TypeAdminOptions } from "../../utils/selects";
import { log } from "console";

// const getURL = '/';
const initValues = {
  email: "",
  name: "",
  password: "",
  type: "admin",
};

const SubmittedCreateForm = Yup.object({
  email: Yup.string()
    .email("البريد الالكتروني غير صحيح")
    .required("الحقل مطلوب"),
  password: Yup.string(),
  name: Yup.string().required("الحقل مطلوب"),
  type: Yup.string().required("الحقل مطلوب"),
});
const SubmittedUpdateForm = Yup.object({
  email: Yup.string().email("البريد الالكتروني غير صحيح"),
  password: Yup.string(),
  name: Yup.string().required("الحقل مطلوب"),
  type: Yup.string().required("الحقل مطلوب"),
  status: Yup.string(),
});

const MngAdmin = () => {
  const createUrl = "/api/admin/admin-create";
  const navigateUrl = "/admins";
  const { pathname } = useLocation();
  const getDataUrl = "/api/admin/admin-show";
  const updateUrl = "/api/admin/admin-update";

  const params = useParams();
  console.log(TypeAdminOptions);

  // errors
  // initial Values ( new: empty || old: {values} )
  // status: success: 201 ----- error: 400 | 500 | 401 | 403
  const isNew = pathname.split("/").slice(-1)[0] === "new";
  const { submitCreateForm, updateUserAdminForm } = useCreate({
    createUrl,
    navigateUrl,
    updateUrl,
  });

  const { data } = useGetInitial({
    url: getDataUrl,
    id: params.id,
    config: {},
    isNew,
    initialValues: initValues,
  });
  if (!data) {
    return;
  }

  return (
    <>
      <div className="py-2">
        {/* BREADCRUMBS */}
        <MainBreadcrumbs links={[{ name: "المسؤولين", src: "/admins" }]} />
        {/* FORM */}
        <div className="panel">
          <Formik
            enableReinitialize
            initialValues={data}
            validationSchema={isNew ? SubmittedCreateForm : SubmittedUpdateForm}
            onSubmit={isNew ? submitCreateForm : updateUserAdminForm}
          >
            {({ touched, errors }) => (
              <Form className="space-y-5">
                {/* {JSON.stringify(errors)} */}
                <InputGroup className="grid-cols-1 md:grid-cols-2">
                  <div>
                    <label htmlFor="email">البريد الالكتروني</label>
                    <Field
                      dir="auto"
                      name="email"
                      type="text"
                      id="email"
                      className="form-input"
                    />
                    {touched.email && <ErrMsg name="email" />}
                  </div>
                  <div>
                    <label htmlFor="password">كلمة السر</label>
                    <Field
                      dir="auto"
                      name="password"
                      type="password"
                      id="password"
                      className="form-input"
                    />
                    {touched.password && <ErrMsg name="password" />}
                  </div>
                  <div>
                    <label htmlFor="name">الاسم</label>
                    <Field
                      dir="auto"
                      name="name"
                      type="text"
                      id="name"
                      className="form-input"
                    />
                    {touched.name && <ErrMsg name="name" />}
                  </div>
                  <div>
                    <label htmlFor="type">النوع</label>
                    <Field
                      className="form-select"
                      dir="auto"
                      as="select"
                      name="type"
                      id="type"
                    >
                      {TypeAdminOptions.map((opt) => (
                        <option key={opt?.value} value={opt?.value}>
                          {opt?.label}
                        </option>
                      ))}
                    </Field>
                    {touched.type && <ErrMsg name="type" />}
                  </div>
                  {!isNew && (
                    <div>
                      <label htmlFor="status">الحالة</label>
                      <Field
                        className="form-select"
                        dir="auto"
                        as="select"
                        name="status"
                        id="status"
                      >
                        {StatusOptions.map((opt) => (
                          <option key={opt?.value} value={opt?.value}>
                            {opt?.label}
                          </option>
                        ))}
                      </Field>
                      {touched.status && <ErrMsg name="status" />}
                    </div>
                  )}
                </InputGroup>
                {/* {Object.keys(errors)} */}
                <button type="submit" className="btn btn-primary !mt-6">
                  إرسال
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default MngAdmin;
