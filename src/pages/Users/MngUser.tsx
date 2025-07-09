import React, { useEffect, useState } from "react";
import MainBreadcrumbs from "../Elements/MainBreadcrumbs";
import * as Yup from "yup";
import { Field, Form, Formik } from "formik";
import InputGroup from "../../components/Forms/InputGroup";
import ErrMsg from "../../components/Forms/ErrMsg";
import useGetInitial from "../../hooks/useGetInitial";
import { useLocation, useParams } from "react-router-dom";
import useCreate from "../../hooks/useCreate";
import { GenderOptions, StatusOptions } from "../../utils/selects";
import { countries } from "../../utils/countriesList";
import Searchable from "../../components/Searchable";

const initValues = {
  email: "",
  password: "",
  name: "",
  code: "",
  phone: "",
  country: "",
  city: "",
  birthdate: null,
  gender: "",
  batch_id: 1,
  semester_id: null,
  email_verified_at: null,
  national_id: "",
};
const SubmittedCreateForm = Yup.object({
  email: Yup.string()
    .email("البريد الالكتروني غير صحيح")
    .required("الحقل مطلوب"),
  password: Yup.string().required("الحقل مطلوب"),
  name: Yup.string().required("الحقل مطلوب"),
  code: Yup.string().required("الحقل مطلوب"),
  country: Yup.string().required("الحقل مطلوب"),
  city: Yup.string().required("الحقل مطلوب"),
  gender: Yup.string().required("الحقل مطلوب"),
  phone: Yup.string().required("الحقل مطلوب"),
  national_id: Yup.string().required("الحقل مطلوب"),
});
const SubmittedUpdateForm = Yup.object({
  email: Yup.string().email("البريد الالكتروني غير صحيح"),
  password: Yup.string(),
  name: Yup.string(),
  code: Yup.string(),
  country: Yup.string(),
  city: Yup.string(),
  gender: Yup.string(),
  batch_id: Yup.string().nullable(),
  semester_id: Yup.string(),
  phone: Yup.string(),
  national_id: Yup.string(),
  status: Yup.string(),
});

const MngUser = () => {
  const createUrl = "/api/admin/user-create";
  const updateUrl = "/api/admin/user-update";
  const getDataUrl = "/api/admin/user-show";
  const navigateUrl = "/users";
  const { pathname } = useLocation();
  const params = useParams();

  // errors
  // initial Values ( new: empty || old: {values} )
  // status: success: 201 ----- error: 400 | 500 | 401 | 403
  const isNew = pathname.split("/").slice(-1)[0] === "new";
  // const navigate = useNavigate();
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

  return (
    <>
      <div className="py-2">
        {/* BREADCRUMBS */}
        <MainBreadcrumbs links={[{ name: "المستخدمون", src: "/users" }]} />

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
                <InputGroup
                  className="grid-cols-1 md:grid-cols-2"
                  errorToast={errors}
                >
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
                  {isNew && (
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
                  )}
                  <div>
                    <label htmlFor="name_ar">الاسم بالعربي</label>
                    <Field
                      dir="auto"
                      name="name_ar"
                      type="text"
                      id="name_ar"
                      className="form-input"
                    />
                    {touched.name && <ErrMsg name="name_ar" />}
                  </div>
                  <div>
                    <label htmlFor="name">الاسم بالانجليزي</label>
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
                    <label htmlFor="code">كود التسجيل</label>
                    <Field
                      dir="auto"
                      name="code"
                      type="text"
                      id="code"
                      className="form-input"
                    />
                    {touched.code && errors.code && <ErrMsg name="code" />}
                  </div>
                  <div>
                    <label htmlFor="phone">الهاتف</label>
                    <Field
                      dir="auto"
                      name="phone"
                      type="text"
                      id="phone"
                      className="form-input"
                    />
                    {touched.phone && <ErrMsg name="phone" />}
                  </div>
                  <div>
                    <label htmlFor="national_id">رقم الهوية</label>
                    <Field
                      dir="auto"
                      name="national_id"
                      type="text"
                      id="national_id"
                      className="form-input"
                    />
                    {touched.national_id && <ErrMsg name="national_id" />}
                  </div>
                  <div>
                    <label htmlFor="country">الجنسية</label>
                    <Field
                      className="form-select"
                      dir="auto"
                      as="select"
                      name="country"
                      id="country"
                    >
                      {countries.map((opt) => (
                        <option key={opt?.value} value={opt?.value}>
                          {opt?.label}
                        </option>
                      ))}
                    </Field>
                    {touched.country && <ErrMsg name="country" />}
                  </div>
                  <div>
                    <label htmlFor="city">محل الاقامة</label>
                    <Field
                      className="form-select"
                      dir="auto"
                      as="select"
                      name="city"
                      id="city"
                    >
                      {countries.map((opt) => (
                        <option key={opt?.value} value={opt?.value}>
                          {opt?.label}
                        </option>
                      ))}
                    </Field>

                    {touched.city && <ErrMsg name="city" />}
                  </div>

                  <div>
                    <label htmlFor="national_id">تاريخ الميلاد</label>
                    <Field
                      dir="auto"
                      name="birthdate"
                      type="date"
                      id="birthdate"
                      className="form-input"
                    />
                    {touched.birthdate && <ErrMsg name="birthdate" />}
                  </div>
                  <div>
                    <label htmlFor="email_verified_at">تفعيل المستخدم</label>
                    <Field
                      dir="auto"
                      name="email_verified_at"
                      type="date"
                      id="email_verified_at"
                      className="form-input"
                    />
                    {touched.email_verified_at && (
                      <ErrMsg name="email_verified_at" />
                    )}
                  </div>
                  <div>
                    <div>
                      <label htmlFor="gender">النوع</label>
                      <Field
                        className="form-select"
                        dir="auto"
                        as="select"
                        name="gender"
                        id="gender"
                      >
                        {GenderOptions.map((opt) => (
                          <option key={opt?.value} value={opt?.value}>
                            {opt?.label}
                          </option>
                        ))}
                      </Field>
                      {touched.gender && <ErrMsg name="gender" />}
                    </div>
                  </div>
                  <div>
                    <Field
                      dir="auto"
                      field="text"
                      name="semester_id"
                      id="semester_id"
                    >
                      {({ field, form, meta }) => (
                        <Searchable
                          defaultVal={
                            form?.values?.semester_id
                              ? {
                                  value: form?.values?.semester_id,
                                  label: form?.values?.semester_name,
                                }
                              : null
                          }
                          form={form}
                          field={field}
                          ttl="الفصل الحالي للطالب"
                          label="name"
                          value="id"
                          url="/api/admin/semesters"
                        />
                      )}
                    </Field>
                    {touched.semester_id && <ErrMsg name="semester_id" />}
                  </div>
                  <div>
                    <Field
                      dir="auto"
                      field="text"
                      name="batch_id"
                      id="batch_id"
                    >
                      {({ field, form, meta }) => (
                        <Searchable
                          defaultVal={
                            form?.values?.batch_id
                              ? {
                                  value: form?.values?.batch_id,
                                  label: form?.values?.batch_code,
                                }
                              : null
                          }
                          form={form}
                          field={field}
                          ttl="الدفعة"
                          label="code"
                          value="id"
                          url="/api/admin/batches"
                        />
                      )}
                    </Field>
                    {touched.batch_id && <ErrMsg name="batch_id" />}
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

export default MngUser;
