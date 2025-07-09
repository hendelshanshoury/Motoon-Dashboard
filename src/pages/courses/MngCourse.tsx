import React, { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import useGetInitial from '../../hooks/useGetInitial';
import useCreate from '../../hooks/useCreate';
import * as Yup from 'yup';
import { Field, Form, Formik } from 'formik';
import ErrMsg from '../../components/Forms/ErrMsg';
import InputGroup from '../../components/Forms/InputGroup';
import MainBreadcrumbs from '../Elements/MainBreadcrumbs';
import LangFormSwitcher from '../../components/Forms/LangFormSwitcher';
import { DaysOptions, StatusOptions } from '../../utils/selects';
import Loader from '../../components/Loader';
import Searchable from './../../components/Searchable';
import { toast } from '../../utils/Toast';
import axios from 'axios';

const initValues = {
    name: '',
    description: '',
    lecturer: '',
    day: '',
    semester_id: '',
    lang: '',
    book_pdf: '',
};

const SubmittedCreateForm = Yup.object({
    name: Yup.string().required('الحقل مطلوب'),
    description: Yup.string().required('الحقل مطلوب'),
    lecturer: Yup.string().required('الحقل مطلوب'),
    semester_id: Yup.string().required('الحقل مطلوب'),
    day: Yup.string().required('الحقل مطلوب'),
    book_pdf: Yup.string(),
});

const SubmittedUpdateForm = Yup.object({
    description: Yup.string(),
    lecturer: Yup.string(),
    course_id: Yup.string(),
    day: Yup.string(),
    name: Yup.string(),
    book_pdf: Yup.string(),
    status: Yup.string(),
});

const MngCourse = () => {
    const createUrl = '/api/admin/course-create';
    const updateUrl = '/api/admin/course-update';
    const navigateUrl = '/courses';
    const { pathname } = useLocation();
    const params = useParams();

    const isNew = pathname.split('/').slice(-1)[0] === 'new';

    const { data, errors, status, statusText, lang, setLang, loading } = useGetInitial({
        url: createUrl,
        id: params.id,
        config: {},
        isNew,
        initialValues: initValues,
    });
    const { submitCreateForm, updateForm } = useCreate({ createUrl, navigateUrl, updateUrl, lang });
    const [course_image, setCourse_image] = useState();
    const [bookPDF, setBook] = useState();
    async function addIMG(e) {
        e.preventDefault();
        if (!course_image) return;
        try {
            const formData = new FormData();
            course_image && formData.append('image', course_image);
            course_image && formData.append('_method', 'put');
            const res = await axios.post(`${updateUrl}/${params.id || ''}`, formData);
            toast.fire({ icon: 'success', title: 'تم تحديث الصورة بنجاح', padding: '10px 20px' });
        } catch (error) {
            toast.fire({ icon: 'error', title: 'خطأ في تحديث الصورة', padding: '10px 20px' });
        }
    }
    async function addPDF(e) {
        e.preventDefault();
        if (!bookPDF) return;
        try {
            const formData = new FormData();
            bookPDF && formData.append('book_pdf', bookPDF);
            bookPDF && formData.append('_method', 'put');
            const res = await axios.post(`${updateUrl}/${params.id || ''}`, formData);
            toast.fire({ icon: 'success', title: 'تم تحديث الملف بنجاح', padding: '10px 20px' });
        } catch (error) {
            toast.fire({ icon: 'error', title: 'خطأ في تحديث الملف', padding: '10px 20px' });
        }
    }
    return (
        <>
            <div className="py-2">
                {/* BREADCRUMBS */}
                <MainBreadcrumbs links={[{ name: ' المواد الدراسيه', src: '/courses' }]} />

                {/* FORM */}
                <div className="panel">
                    <LangFormSwitcher setLang={setLang} lang={lang} />
                    <Loader isLoading={loading} />
                    <Formik
                        enableReinitialize
                        initialValues={{
                            id: data?.id,
                            name: data?.name,
                            description: data?.description,
                            lecturer: data?.lecturer,
                            day: data?.day,
                            book_pdf: data?.book_pdf,
                            semester_id: data?.semester_id,
                            status: data?.status,
                        }}
                        validationSchema={isNew ? SubmittedCreateForm : SubmittedUpdateForm}
                        onSubmit={(values) => {
                            isNew
                                ? submitCreateForm
                                : updateForm({
                                      id: values?.id,
                                      name: values?.name,
                                      description: values?.description,
                                      lecturer: values?.lecturer,
                                      day: values?.day,
                                      book_pdf: values?.book_pdf,
                                      semester_id: values?.semester_id,
                                      status: values?.status,
                                  });
                        }}
                    >
                        {({ touched, errors, setFieldValue, values }) => (
                            <Form className={`space-y-5 ${loading ? 'pointer-events-none' : ''}`}>
                                {/* {JSON.stringify(errors)} */}
                                <InputGroup className="grid-cols-1 md:grid-cols-2">
                                    <div>
                                        <label htmlFor="name">الاسم</label>
                                        <Field dir="auto" name={`name`} type="text" id="name" className="form-input" />
                                        {touched.name && <ErrMsg name="name" />}
                                    </div>

                                    <div>
                                        <label htmlFor="description">وصف</label>
                                        <Field as="textarea" dir="auto" name={`description`} type="text" id="description" className="form-input" />
                                        {touched.description && <ErrMsg name="description" />}
                                    </div>
                                    <div>
                                        <label htmlFor="lecturer">المحاضر</label>
                                        <Field dir="auto" name={`lecturer`} type="text" id="lecturer" className="form-input" />
                                        {touched.lecturer && <ErrMsg name="lecturer" />}
                                    </div>
                                    <div>
                                        <label htmlFor="book_pdf">الكتاب</label>
                                        <Field dir="auto" name={`book_pdf`} type="text" id="book_pdf" className="form-input" />
                                        {touched.book_pdf && <ErrMsg name="book_pdf" />}
                                    </div>
                                    <div>
                                        <div dir="auto">
                                            <label htmlFor="day">اليوم</label>
                                            <Field className="form-select" dir="auto" as="select" name="day" id="day">
                                                {DaysOptions.map((opt) => (
                                                    <option key={opt?.value} value={opt?.value}>
                                                        {opt?.label}
                                                    </option>
                                                ))}
                                            </Field>
                                            {touched.day && <ErrMsg name="day" />}
                                        </div>
                                    </div>
                                    <div className="relative z-50">
                                        <Field dir="auto" field="text" name="semester_id" id="semester_id">
                                            {({ field, form, meta }) => (
                                                <Searchable
                                                    defaultVal={form?.values?.semester_id ? { value: form?.values?.semester_id, label: form?.values?.semester_name } : null}
                                                    form={form}
                                                    field={field}
                                                    ttl="الفصل الدراسي"
                                                    label="name"
                                                    value="id"
                                                    isSearchable={false}
                                                    url="/api/admin/semester-paginate"
                                                />
                                            )}
                                        </Field>
                                        {touched.semester_id && <ErrMsg name="semester_id" />}
                                    </div>

                                    {!isNew && (
                                        <div>
                                            <label htmlFor="status">الحالة</label>
                                            <Field className="form-select" dir="auto" as="select" name="status" id="status">
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

                {/* add media forms */}
                {!isNew && (
                    <div className="panel mt-10">
                        <h1 className="text-xl font-bold mb-5">اضافة الميديا</h1>
                        <div className="">
                            <form onSubmit={addIMG}>
                                <label htmlFor="image">الصوره</label>
                                <input
                                    dir="auto"
                                    name="image"
                                    type="file"
                                    id="image"
                                    accept=".png , .jpg , .jpeg"
                                    className="form-input"
                                    onChange={(event) => {
                                        setCourse_image(event.target.files[0]);
                                    }}
                                />
                                <button className="btn btn-primary !mt-3">حفظ</button>
                            </form>

                            {/* <form onSubmit={addPDF} className="mt-10">
                                <label htmlFor="book_pdf">الكتاب</label>
                                <input
                                    name={`book_pdf`}
                                    type="file"
                                    id="book_pdf"
                                    className="form-input"
                                    accept=".pdf"
                                    onChange={(event) => {
                                        setBook(event.currentTarget.files[0]);
                                    }}
                                />
                                <button className="btn btn-primary !mt-3">حفظ</button>
                            </form> */}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default MngCourse;
