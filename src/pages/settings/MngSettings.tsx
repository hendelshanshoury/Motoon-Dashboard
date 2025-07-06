import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import useGetInitial from '../../hooks/useGetInitial';
import useCreate from '../../hooks/useCreate';
import * as Yup from 'yup';
import { Field, Form, Formik } from 'formik';
import ErrMsg from '../../components/Forms/ErrMsg';
import InputGroup from '../../components/Forms/InputGroup';
import Loader from '../../components/Loader';
import useFetch from '../../hooks/useFetch';

const initValues = {
    quiz_num_of_question: '',
    quiz_timer_for_question: '',
    mid_num_of_question: '',
    mid_timer_for_question: '',
    final_num_of_question: '',
    final_timer_for_question: '',
    quiz_success: '',
    mid_success: '',
    final_success: '',
    exam_instructions: '',
    payment_amount: '',
    payment_currency: 'USD',
};

const SubmittedUpdateForm = Yup.object({
    quiz_num_of_question: Yup.string().required(''),
    quiz_timer_for_question: Yup.string().required(''),
    mid_num_of_question: Yup.string().required(''),
    mid_timer_for_question: Yup.string().required(''),
    final_num_of_question: Yup.string().required(''),
    final_timer_for_question: Yup.string().required(''),
    exam_instructions: Yup.string(),
    payment_amount: Yup.string(),
    payment_currency: Yup.string(),
});

const MngSettings = () => {
    const updateUrl = '/api/admin/settings';
    // const { pathname } = useLocation();
    const params = useParams();

    const { data, errors, status, statusText, loading } = useGetInitial({
        url: updateUrl,
        id: 1,
        config: {},
        initialValues: initValues,
    });
    const { updateSettingForm } = useCreate({ updateUrl });

    return (
        <>
            <div className="py-2">
                {/* FORM */}
                <div className="">
                    <Loader isLoading={loading} />
                    <Formik enableReinitialize initialValues={data} validationSchema={SubmittedUpdateForm} onSubmit={updateSettingForm}>
                        {({ touched, values }) => (
                            <Form className={`space-y-5 ${loading ? 'pointer-events-none' : ''}`}>
                                <InputGroup className="panel grid-cols-1 md:grid-cols-2">
                                    <div>
                                        <label htmlFor="quiz_num_of_question">عدد الاسئله في الاختبار القصير</label>
                                        <Field dir="auto" name={`quiz_num_of_question`} type="number" min={1} id="quiz_num_of_question" className="form-input" />
                                        {touched.quiz_num_of_question && <ErrMsg name="quiz_num_of_question" />}
                                    </div>

                                    <div>
                                        <label htmlFor="quiz_timer_for_question">وقت السؤال في الاختبار القصير</label>
                                        <Field dir="auto" name={`quiz_timer_for_question`} type="number" min={1} id="quiz_timer_for_question" className="form-input" />
                                        {touched.quiz_timer_for_question && <ErrMsg name="quiz_timer_for_question" />}
                                    </div>
                                    <div>
                                        <label htmlFor="mid_num_of_question">عدد الاسئله في منتصف الفصل الدراسي</label>
                                        <Field dir="auto" name={`mid_num_of_question`} type="number" min={8} id="mid_num_of_question" className="form-input" />
                                        {touched.mid_num_of_question && <ErrMsg name="mid_num_of_question" />}
                                    </div>
                                    <div>
                                        <label htmlFor="mid_timer_for_question">وقت الاسئله في منتصف الفصل الدراسي</label>
                                        <Field dir="auto" name={`mid_timer_for_question`} type="number" min={1} id="mid_timer_for_question" className="form-input" />
                                        {touched.mid_timer_for_question && <ErrMsg name="mid_timer_for_question" />}
                                    </div>
                                    <div>
                                        <label htmlFor="final_num_of_question">عدد الاسئله في الاختبار النهائي</label>
                                        <Field dir="auto" name={`final_num_of_question`} type="number" min={16} id="final_num_of_question" className="form-input" />
                                        {touched.final_num_of_question && <ErrMsg name="final_num_of_question" />}
                                    </div>
                                    <div>
                                        <label htmlFor="final_timer_for_question">وقت الاسئله في الاختبار النهائي</label>
                                        <Field dir="auto" name={`final_timer_for_question`} type="number" min={1} id="final_timer_for_question" className="form-input" />
                                        {touched.final_timer_for_question && <ErrMsg name="final_timer_for_question" />}
                                    </div>
                                    <div>
                                        <label htmlFor="quiz_success">نسبة النجاح في الاختبار القصير</label>
                                        <Field dir="auto" name={`quiz_success`} type="number" min={1} id="quiz_success" className="form-input" />
                                        {touched.quiz_success && <ErrMsg name="quiz_success" />}
                                    </div>
                                    <div>
                                        <label htmlFor="mid_success">نسبة النجاح في الاختبار نصف النهائي</label>
                                        <Field dir="auto" name={`mid_success`} type="number" min={1} id="mid_success" className="form-input" />
                                        {touched.mid_success && <ErrMsg name="mid_success" />}
                                    </div>
                                    <div>
                                        <label htmlFor="final_success">نسبة النجاح في الاختبار النهائي</label>
                                        <Field dir="auto" name={`final_success`} type="number" min={1} id="final_success" className="form-input" />
                                        {touched.final_success && <ErrMsg name="final_success" />}
                                    </div>
                                    <div>
                                        <label htmlFor="exam_instructions">نص التعليمات</label>
                                        <Field as="textarea" dir="auto" name={`exam_instructions`} id="exam_instructions" className="form-input" />
                                        {touched.exam_instructions && <ErrMsg name="exam_instructions" />}
                                    </div>
                                </InputGroup>

                                <InputGroup className="panel grid-cols-1 md:grid-cols-2">
                                    <div>
                                        <label htmlFor="payment_amount"> قيمة الاشراك ( العملة: $ )</label>
                                        <Field dir="auto" name={`payment_amount`} type="number" min={1} id="payment_amount" className="form-input" />
                                        {touched.payment_amount && <ErrMsg name="payment_amount" />}
                                    </div>
                                </InputGroup>

                                {/* {Object.keys(errors)} */}
                                <button type="submit" className="btn btn-primary !mt-6">
                                    تعديل
                                </button>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </>
    );
};

export default MngSettings;
