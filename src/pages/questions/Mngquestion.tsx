import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import useGetInitial from '../../hooks/useGetInitial';
import useCreate from '../../hooks/useCreate';
import * as Yup from 'yup';
import { Field, Form, Formik } from 'formik';
import ErrMsg from '../../components/Forms/ErrMsg';
import InputGroup from '../../components/Forms/InputGroup';
import LangFormSwitcher from '../../components/Forms/LangFormSwitcher';
import MainBreadcrumbs from '../Elements/MainBreadcrumbs';
import { InQuizOptions, LevelOptions, StatusOptions, TypeOptions } from '../../utils/selects';
import Loader from '../../components/Loader';
import Searchable from '../../components/Searchable';
import RadioInput from '../../components/Forms/RadioInput';

const initValues = {
    a1: '',
    a2: '',
    a3: '',
    a4: '',
    a5: '',
    a6: '',
    correct_answer: '',
    inQuiz: '',
    type: '',
    level: '',
    lesson_id: '',
    name: '',
};

const SubmittedCreateForm = Yup.object({
    a1: Yup.string().required('الحقل مطلوب'),
    a2: Yup.string().required('الحقل مطلوب'),
    a3: Yup.string(),
    a4: Yup.string(),
    a5: Yup.string(),
    a6: Yup.string(),
    // correct_answer: Yup.string().required('الحقل مطلوب'),
    inQuiz: Yup.string(),
    type: Yup.string(),
    level: Yup.string(),
    lesson_id: Yup.string(),
    name: Yup.string().required('الحقل مطلوب'),
});

const SubmittedUpdateForm = Yup.object({
    inQuiz: Yup.string(),
    a1: Yup.string(),
    a2: Yup.string(),
    a3: Yup.string(),
    a4: Yup.string(),
    a5: Yup.string(),
    a6: Yup.string(),
    // correct_answer: Yup.string(),
    lesson_id: Yup.string(),
    type: Yup.string(),
    level: Yup.string(),
    name: Yup.string(),
    status: Yup.string(),
});

const MngQuestion = () => {
    const createUrl = '/api/admin/questions';
    const updateUrl = '/api/admin/questions';
    const navigateUrl = '/questions';
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
    useEffect(() => {
        if (data?.a1 && data?.a2) {
            [1, 2, 3, 4, 5, 6].forEach((e) => {
                if (data?.correct_answer === data?.[`a${e}`]) {
                    setCheckedName(`a${e}`);
                }
            });
        }
    }, [data]);
    const { submitCreateForm, updateForm } = useCreate({ createUrl, navigateUrl, updateUrl, lang });
    const [checkedName, setCheckedName] = useState('a1');
    return (
        <>
            <div className="py-2">
                {/* BREADCRUMBS */}
                <MainBreadcrumbs links={[{ name: 'الاسئله ', src: '/questions' }]} />

                {/* FORM */}
                <div className="panel">
                    <LangFormSwitcher setLang={setLang} lang={lang} />
                    <Loader isLoading={loading} />
                    <Formik
                        enableReinitialize
                        initialValues={data}
                        validationSchema={isNew ? SubmittedCreateForm : SubmittedUpdateForm}
                        onSubmit={(values: any) => (isNew ? submitCreateForm({ ...values, correct_answer: values[checkedName] }) : updateForm({ ...values, correct_answer: values[checkedName] }))}
                    >
                        {({ touched, errors, values }) => (
                            <Form className={`space-y-5 ${loading ? 'pointer-events-none' : ''}`}>
                                <InputGroup className="grid-cols-1 md:grid-cols-2">
                                    <div>
                                        <label htmlFor="name">الاسم</label>
                                        <Field dir="auto" name={`name`} type="text" id="name" className="form-input" />
                                        {touched.name && <ErrMsg name="name" />}
                                    </div>

                                    <div>
                                        <Field dir="auto" name="lesson_id" id="lesson_id">
                                            {({ field, form, meta }) => (
                                                <Searchable
                                                    defaultVal={form?.values?.lesson_id ? { value: form?.values?.lesson_id, label: form?.values?.lesson_name } : null}
                                                    form={form}
                                                    field={field}
                                                    ttl="الدرس"
                                                    label="name"
                                                    value="id"
                                                    url="/api/admin/lessons"
                                                />
                                            )}
                                        </Field>
                                        {touched.lesson_id && <ErrMsg name="lesson_id" />}
                                    </div>

                                    <RadioInput setCheckedName={setCheckedName} checkedName={checkedName} touched={touched?.a1} value={values?.a1} lbl="الإجابة 1" inputName="a1" name="answer-name" />
                                    <RadioInput setCheckedName={setCheckedName} checkedName={checkedName} touched={touched?.a2} value={values?.a2} lbl="الإجابة 2" inputName="a2" name="answer-name" />
                                    <RadioInput setCheckedName={setCheckedName} checkedName={checkedName} touched={touched?.a3} value={values?.a3} lbl="الإجابة 3" inputName="a3" name="answer-name" />
                                    <RadioInput setCheckedName={setCheckedName} checkedName={checkedName} touched={touched?.a4} value={values?.a4} lbl="الإجابة 4" inputName="a4" name="answer-name" />
                                    <RadioInput setCheckedName={setCheckedName} checkedName={checkedName} touched={touched?.a5} value={values?.a5} lbl="الإجابة 5" inputName="a5" name="answer-name" />
                                    <RadioInput setCheckedName={setCheckedName} checkedName={checkedName} touched={touched?.a6} value={values?.a6} lbl="الإجابة 6" inputName="a6" name="answer-name" />

                                    {/* <div>
                                        <label htmlFor="correct_answer" className="text-success">
                                            الاجابة الصحيحة
                                        </label>
                                        <Field dir='auto'
                                            value={values?.[checkedName]}
                                            name={`correct_answer`}
                                            type="text"
                                            id="correct_answer"
                                            className="form-input"
                                        />
                                        {<ErrMsg name="correct_answer" />}
                                    </div> */}
                                    <div dir="auto">
                                        <label htmlFor="level">المستوي</label>
                                        <Field className="form-select" dir="auto" as="select" name="level" id="level">
                                            {LevelOptions.map((opt) => (
                                                <option key={opt?.value} value={opt?.value}>
                                                    {opt?.label}
                                                </option>
                                            ))}
                                        </Field>
                                        {touched.level && <ErrMsg name="level" />}
                                    </div>
                                    <div dir="auto">
                                        <label htmlFor="type">نوع الاسئله</label>
                                        <Field className="form-select" dir="auto" as="select" name="type" id="type">
                                            {TypeOptions.map((opt) => (
                                                <option key={opt?.value} value={opt?.value}>
                                                    {opt?.label}
                                                </option>
                                            ))}
                                        </Field>
                                        {touched.type && <ErrMsg name="type" />}
                                    </div>
                                    <div dir="auto">
                                        <label htmlFor="inQuiz">الاختبارات القصيره</label>
                                        <Field className="form-select" dir="auto" as="select" name="inQuiz" id="inQuiz">
                                            {InQuizOptions.map((opt) => (
                                                <option key={opt?.value} value={opt?.value}>
                                                    {opt?.label}
                                                </option>
                                            ))}
                                        </Field>
                                        {touched.inQuiz && <ErrMsg name="inQuiz" />}
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

export default MngQuestion;
// <div>
//     <label>الحاله</label>
//     <div className="form-input flex ">
//         <label className="flex w-[50%]">
//             <Field dir='auto' type="radio" name="status" value="1" className="mr-2" />
//             active
//         </label>
//         <label className="flex">
//             <Field dir='auto' type="radio" name="status" value="0" className="mr-2" />
//             unactive
//         </label>
//     </div>
//     {touched.status && <ErrMsg name="status" />}
// </div>
