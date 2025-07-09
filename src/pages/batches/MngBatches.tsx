import React from "react";
import { useLocation, useParams } from "react-router-dom";
import useGetInitial from "../../hooks/useGetInitial";
import useCreate from "../../hooks/useCreate";
import * as Yup from "yup";
import { Field, Form, Formik } from "formik";
import ErrMsg from "../../components/Forms/ErrMsg";
import InputGroup from "../../components/Forms/InputGroup";
import MainBreadcrumbs from "../Elements/MainBreadcrumbs";
import { StatusOptions } from "../../utils/selects";
import Loader from "../../components/Loader";

const initValues = {
  sem1_date: "",
  sem2_date: "",
  sem3_date: "",
  sem4_date: "",

  mid1_date: "",
  mid2_date: "",
  mid3_date: "",
  mid4_date: "",

  final1_date: "",
  final2_date: "",
  final3_date: "",
  final4_date: "",
};

const SubmittedCreateForm = Yup.object({
  // start_date: Yup.string().required('الحقل مطلوب'),
  sem1_date: Yup.string().required("الحقل مطلوب"),
  sem2_date: Yup.string().required("الحقل مطلوب"),
  sem3_date: Yup.string().required("الحقل مطلوب"),
  sem4_date: Yup.string().required("الحقل مطلوب"),

  mid1_date: Yup.date().required("الحقل مطلوب"),
  mid2_date: Yup.date().required("الحقل مطلوب"),
  mid3_date: Yup.date().required("الحقل مطلوب"),
  mid4_date: Yup.date().required("الحقل مطلوب"),

  final1_date: Yup.date().required("الحقل مطلوب"),
  final2_date: Yup.date().required("الحقل مطلوب"),
  final3_date: Yup.date().required("الحقل مطلوب"),
  final4_date: Yup.date().required("الحقل مطلوب"),
});

const UpdateStartForm = Yup.object({
  start_date: Yup.string().required("الحقل مطلوب"),
  code: Yup.string().required("الحقل مطلوب"),
});
const SubmittedUpdateForm = Yup.object({
  // start_date: Yup.string().required('الحقل مطلوب'),
  sem1_date: Yup.string().required("الحقل مطلوب"),
  sem2_date: Yup.string().required("الحقل مطلوب"),
  sem3_date: Yup.string().required("الحقل مطلوب"),
  sem4_date: Yup.string().required("الحقل مطلوب"),

  mid1_date: Yup.date().required("الحقل مطلوب"),
  mid2_date: Yup.date().required("الحقل مطلوب"),
  mid3_date: Yup.date().required("الحقل مطلوب"),
  mid4_date: Yup.date().required("الحقل مطلوب"),

  final1_date: Yup.date().required("الحقل مطلوب"),
  final2_date: Yup.date().required("الحقل مطلوب"),
  final3_date: Yup.date().required("الحقل مطلوب"),
  final4_date: Yup.date().required("الحقل مطلوب"),
});

const MngBatches = () => {
  const createUrl = "/api/admin/batch-create";
  const updateUrl = "/api/admin/batch-update";
  const navigateUrl = "/batches";
  const { pathname } = useLocation();
  const params = useParams();

  const isNew = pathname.split("/").slice(-1)[0] === "new";

  const { data, errors, status, statusText, loading } = useGetInitial({
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
        <MainBreadcrumbs links={[{ name: "الدفعه", src: "/batches" }]} />

        {false && (
          <div className="mb-5 panel">
            <Formik
              enableReinitialize
              initialValues={{
                id: data?.id,
                start_date: data?.start_date,
                code: data?.code,
              }}
              validationSchema={UpdateStartForm}
              onSubmit={(values) =>
                isNew
                  ? submitCreateForm({
                      start_date: values?.start_date,
                      code: values?.code,
                    })
                  : updateForm({
                      id: data?.id,
                      start_date: values?.start_date,
                      code: values?.code,
                    })
              }
            >
              {({ touched, errors }) => (
                <Form
                  className={`space-y-5 ${
                    loading ? "pointer-events-none" : ""
                  }`}
                >
                  <InputGroup className="grid-cols-1 md:grid-cols-2">
                    <div>
                      <label htmlFor="start_date">موعد انطلاق الدفعة</label>
                      <Field
                        dir="auto"
                        name={`start_date`}
                        type="date"
                        id="start_date"
                        className="form-input"
                      />
                      {touched.start_date && <ErrMsg name="start_date" />}
                    </div>
                    <div>
                      <label htmlFor="code">كود الدفعة</label>
                      <Field
                        dir="auto"
                        name={`code`}
                        id="code"
                        className="form-input"
                      />
                      {touched.code && <ErrMsg name="code" />}
                    </div>
                  </InputGroup>
                  <button type="submit" className="btn btn-primary !mt-6">
                    إرسال
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        )}

        {/* FORM */}
        <div className="panel">
          <Loader isLoading={loading} />
          <Formik
            enableReinitialize
            initialValues={data}
            validationSchema={isNew ? SubmittedCreateForm : SubmittedUpdateForm}
            onSubmit={(values) =>
              isNew
                ? submitCreateForm({
                    ...values,
                    start_date: values["sem1_date"],
                  })
                : updateForm({ ...values, start_date: values["sem1_date"] })
            }
          >
            {({ touched, errors }) => (
              <Form
                className={`space-y-5 ${loading ? "pointer-events-none" : ""}`}
              >
                {/* {JSON.stringify(errors)} */}

                {/* مواعيد بداية الفصول  */}
                <h3 className="text-xl font-bold">مواعيد بداية الفصول</h3>
                <InputGroup className="grid-cols-1 md:grid-cols-2">
                  <div>
                    <label htmlFor="sem1_date">موعد فصل دراسي اول</label>
                    <Field
                      dir="auto"
                      name={`sem1_date`}
                      type="date"
                      id="sem1_date"
                      className="form-input"
                    />
                    {touched.sem1_date && <ErrMsg name="sem1_date" />}
                  </div>
                  <div>
                    <label htmlFor="sem2_date">موعد فصل دراسي ثاني</label>
                    <Field
                      dir="auto"
                      name={`sem2_date`}
                      type="date"
                      id="sem2_date"
                      className="form-input"
                    />
                    {touched.sem2_date && <ErrMsg name="sem2_date" />}
                  </div>
                  <div>
                    <label htmlFor="sem3_date">موعد فصل دراسي ثالث</label>
                    <Field
                      dir="auto"
                      name={`sem3_date`}
                      type="date"
                      id="sem3_date"
                      className="form-input"
                    />
                    {touched.sem3_date && <ErrMsg name="sem3_date" />}
                  </div>
                  <div>
                    <label htmlFor="sem4_date">موعد فصل دراسي رابع</label>
                    <Field
                      dir="auto"
                      name={`sem4_date`}
                      type="date"
                      id="sem4_date"
                      className="form-input"
                    />
                    {touched.sem4_date && <ErrMsg name="sem4_date" />}
                  </div>
                </InputGroup>
                <div className="border-b border-gray-700"></div>

                {/* مواعيد الاختبارات الرئيسية */}
                <h3 className="text-xl font-bold">
                  مواعيد الاختبارات الرئيسية
                </h3>
                <InputGroup className="grid-cols-1 md:grid-cols-2">
                  <div>
                    <label htmlFor="mid1_date">موعد MIDTERM للفصل الاول</label>
                    <Field
                      dir="auto"
                      name={`mid1_date`}
                      type="date"
                      id="mid1_date"
                      className="form-input"
                    />
                    {touched.mid1_date && <ErrMsg name="mid1_date" />}
                  </div>
                  <div>
                    <label htmlFor="final1_date">موعد FINAL للفصل الاول</label>
                    <Field
                      dir="auto"
                      name={`final1_date`}
                      type="date"
                      id="final1_date"
                      className="form-input"
                    />
                    {touched.final1_date && <ErrMsg name="final1_date" />}
                  </div>
                  <div>
                    <label htmlFor="mid2_date">موعد MIDTERM للفصل الثاني</label>
                    <Field
                      dir="auto"
                      name={`mid2_date`}
                      type="date"
                      id="mid2_date"
                      className="form-input"
                    />
                    {touched.mid2_date && <ErrMsg name="mid2_date" />}
                  </div>
                  <div>
                    <label htmlFor="final2_date">موعد FINAL للفصل الثاني</label>
                    <Field
                      dir="auto"
                      name={`final2_date`}
                      type="date"
                      id="final2_date"
                      className="form-input"
                    />
                    {touched.final2_date && <ErrMsg name="final2_date" />}
                  </div>
                  <div>
                    <label htmlFor="mid3_date">موعد MIDTERM للفصل الثالث</label>
                    <Field
                      dir="auto"
                      name={`mid3_date`}
                      type="date"
                      id="mid3_date"
                      className="form-input"
                    />
                    {touched.mid3_date && <ErrMsg name="mid3_date" />}
                  </div>
                  <div>
                    <label htmlFor="final3_date">موعد FINAL للفصل الثالث</label>
                    <Field
                      dir="auto"
                      name={`final3_date`}
                      type="date"
                      id="final3_date"
                      className="form-input"
                    />
                    {touched.final3_date && <ErrMsg name="final3_date" />}
                  </div>
                  <div>
                    <label htmlFor="mid4_date">موعد MIDTERM للفصل الرابع</label>
                    <Field
                      dir="auto"
                      name={`mid4_date`}
                      type="date"
                      id="mid4_date"
                      className="form-input"
                    />
                    {touched.mid4_date && <ErrMsg name="mid4_date" />}
                  </div>
                  <div>
                    <label htmlFor="final4_date">موعد FINAL للفصل الرابع</label>
                    <Field
                      dir="auto"
                      name={`final4_date`}
                      type="date"
                      id="final4_date"
                      className="form-input"
                    />
                    {touched.final4_date && <ErrMsg name="final4_date" />}
                  </div>
                </InputGroup>
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

export default MngBatches;
