import React, { useState } from 'react';
import * as Yup from 'yup';
import { Field, Form, Formik } from 'formik';
import { useLocation, useParams } from 'react-router-dom';
import useCreate from '../../hooks/useCreate';
import useGetInitial from '../../hooks/useGetInitial';
import ErrMsg from '../../components/Forms/ErrMsg';
import LangFormSwitcher from '../../components/Forms/LangFormSwitcher';
import MainBreadcrumbs from '../Elements/MainBreadcrumbs';
import InputGroup from '../../components/Forms/InputGroup';
import { StatusOptions } from '../../utils/selects';
import Loader from '../../components/Loader';
import axios from 'axios';
import { toast } from '../../utils/Toast';

const initValues = {
    year: '',
    description: '',
    name: '',
    lang: '',
};

const SubmittedUpdateForm = Yup.object({
    description: Yup.string(),
    year: Yup.string(),
    name: Yup.string(),
    status: Yup.string(),
});
const SubmittedCreateForm = Yup.object({
    description: Yup.string().required('الحقل مطلوب'),
    year: Yup.string().required('الحقل مطلوب'),
    name: Yup.string().required('الحقل مطلوب'),
});

const MngSemester = () => {
    const createUrl = '/api/admin/semesters';
    const updateUrl = '/api/admin/semesters';
    const navigateUrl = '/semesters';
    const { pathname } = useLocation();
    const params = useParams();

    // errors
    // initial Values ( new: empty || old: {values} )
    // status: success: 201 ----- error: 400 | 500 | 401 | 403
    const isNew = pathname.split('/').slice(-1)[0] === 'new';
    const [course_image, setCourse_image] = useState(null);

    const { data, errors, status, statusText, lang, setLang, loading } = useGetInitial({
        url: createUrl,
        id: params.id,
        config: {},
        isNew,
        initialValues: initValues,
    });
    const { submitCreateForm, updateForm } = useCreate({ createUrl, navigateUrl, updateUrl, lang });
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
    return (
        <>
            <div className="py-2">
                {/* BREADCRUMBS */}
                <MainBreadcrumbs links={[{ name: 'الترم الدراسي', src: '/semesters' }]} />

                {/* FORM */}
                <div className="panel">
                    <LangFormSwitcher setLang={setLang} lang={lang} />
                    <Loader isLoading={loading} />
                    <Formik
                        enableReinitialize
                        initialValues={{ name: data?.name, description: data?.description, year: data?.year, status: data?.status }}
                        validationSchema={isNew ? SubmittedCreateForm : SubmittedUpdateForm}
                        onSubmit={isNew ? submitCreateForm : updateForm}
                    >
                        {({ touched, errors }) => (
                            <Form className={`space-y-5 ${loading ? 'pointer-events-none' : ''}`}>
                                <InputGroup className="grid-cols-1 md:grid-cols-2">
                                    <div>
                                        <label htmlFor="name">الاسم</label>
                                        <Field dir="auto" name={`name`} type="text" id="name" className="form-input" />
                                        {touched.name && <ErrMsg name="name" />}
                                    </div>

                                    <div>
                                        <label htmlFor="description">وصف</label>
                                        <Field dir="auto" name={`description`} type="text" id="description" className="form-input" />
                                        {touched.description && <ErrMsg name="description" />}
                                    </div>
                                    <div>
                                        <label>السنه</label>
                                        <div className="form-input">
                                            <label className="flex">
                                                <Field dir="auto" type="radio" name="year" value="1" className="mr-2" />
                                                السنة الاولى
                                            </label>
                                            <label className="flex">
                                                <Field dir="auto" type="radio" name="year" value="2" className="mr-2" />
                                                السنة الثانية
                                            </label>
                                        </div>
                                        {touched.year && <ErrMsg name="year" />}
                                    </div>
                                    {/* <div>
                                        <Field dir="auto" name="image" id="image">
                                            {({ field, form, meta }) => <input type="file" onChange={(e) => form.setFieldValue('image', e.target.files[0])} />}
                                        </Field>
                                        {touched.image && <ErrMsg name="image" />}
                                    </div> */}
                                    {!isNew && (
                                        <div>
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
                    </div>
                </div>
            </div>
        </>
    );
};

export default MngSemester;
