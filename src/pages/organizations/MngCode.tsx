import React from "react";
import * as Yup from "yup";
import { Field, Form, Formik } from "formik";
import { useLocation, useParams } from "react-router-dom";
import useGetInitial from "../../hooks/useGetInitial";
import useCreate from "../../hooks/useCreate";
import ErrMsg from "../../components/Forms/ErrMsg";
import { StatusOptions, TypeCodeOptions } from "../../utils/selects";
import MainBreadcrumbs from "../Elements/MainBreadcrumbs";
import InputGroup from "../../components/Forms/InputGroup";
import Loader from "../../components/Loader";
import Searchable from "../../components/Searchable";
import LoadIcon from "../../components/icons/LoadIcon";
import { generateNumber } from "../../utils/generate_udigit";

const initValues = {
  type: "",
  student_num: "",
  code: "",
  address: "",
  admin_id: "",
  users_count: "",
};

const SubmittedUpdateForm = Yup.object({
  type: Yup.string(),
  student_num: Yup.string().required("الحقل مطلوب"),
  code: Yup.string().required("الحقل مطلوب"),
  admin_id: Yup.string().required("الحقل مطلوب"),
  // users_count: Yup.string(),
  status: Yup.string(),
});
const SubmittedCreateForm = Yup.object({
  type: Yup.string(),
  student_num: Yup.string().required("الحقل مطلوب"),
  code: Yup.string().required("الحقل مطلوب"),
  admin_id: Yup.string().required("الحقل مطلوب"),
  // users_count: Yup.string().required('الحقل مطلوب'),
});

const MngCode = () => {
  const createUrl = "/api/admin/code-create";
  const updateUrl = "/api/admin/code-update";
  const navigateUrl = "/codes";
  const { pathname } = useLocation();
  const params = useParams();

  const isNew = pathname.split("/").slice(-1)[0] === "new";

  const { data, loading, errors, status, statusText } = useGetInitial({
    url: createUrl,
    id: params.id,
    config: {},
    isNew,
    initialValues: initValues,
  });
  const { submitCreateForm, updateForm } = useCreate({
    createUrl,
    navigateUrl,
    updateUrl,
  });

  return (
    <>
      <div className="py-2">
        {/* BREADCRUMBS */}
        <MainBreadcrumbs
          links={[{ name: "اداره اكواد التسجيل", src: "/codes" }]}
        />
        {/* FORM */}
        <div className="panel">
          <Loader isLoading={loading} />
          <Formik
            enableReinitialize
            initialValues={data}
            validationSchema={isNew ? SubmittedCreateForm : SubmittedUpdateForm}
            onSubmit={isNew ? submitCreateForm : updateForm}
          >
            {({ touched, errors, setFieldValue }) => (
              <Form
                className={`space-y-5 ${loading ? "pointer-events-none" : ""}`}
              >
                <InputGroup className="grid-cols-1 md:grid-cols-2">
                  <Field dir="auto" name="admin_id" id="admin_id">
                    {({ field, form, meta }) => (
                      <Searchable
                        defaultVal={
                          form?.values?.admin_id
                            ? {
                                value: form?.values?.admin_id,
                                label: form?.values?.admin_name,
                              }
                            : null
                        }
                        form={form}
                        field={field}
                        ttl="(الجمعية)"
                        label="name"
                        value="id"
                        url="/api/admin/users/admins"
                        disabled={!isNew}
                      />
                    )}
                  </Field>
                  <div>
                    <label htmlFor="code">كود التسجيل</label>
                    <div className="flex">
                      <Field
                        dir="auto"
                        disabled={!isNew}
                        name={`code`}
                        type="text"
                        id="code"
                        className="form-input"
                      />
                      <button
                        type="button"
                        className="btn btn-primary"
                        disabled={!isNew}
                        onClick={() => setFieldValue("code", generateNumber())}
                      >
                        <LoadIcon generate />
                      </button>
                    </div>
                    {touched.code && <ErrMsg name="code" />}
                  </div>
                  {/* TODO HERE < CREATE CENTER SELECT2 >  */}
                  <div>
                    <label htmlFor="student_num">عدد الطلاب</label>
                    <Field
                      dir="auto"
                      name={`student_num`}
                      type="number"
                      min={0}
                      max={1000000}
                      id="student_num"
                      className="form-input"
                    />
                    {touched.student_num && <ErrMsg name="student_num" />}
                  </div>
                  {/* <div>
                                        <label htmlFor="users_count">اجمالي الطلاب</label>
                                        <Field dir='auto' name={`users_count`} type="text" id="users_count" className="form-input" />
                                        {touched.users_count && <ErrMsg name="users_count" />}
                                    </div> */}
                  <div className="hidden">
                    <label htmlFor="type">النوع</label>
                    <Field
                      className="form-select"
                      dir="auto"
                      as="select"
                      name="type"
                      id="type"
                    >
                      {TypeCodeOptions.map((opt) => (
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

export default MngCode;
