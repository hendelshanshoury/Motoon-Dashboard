import React, { useEffect, useState } from 'react';
import MainBreadcrumbs from '../Elements/MainBreadcrumbs';
import * as Yup from 'yup';
import { Field, Form, Formik } from 'formik';
import InputGroup from '../../components/Forms/InputGroup';
import ErrMsg from '../../components/Forms/ErrMsg';
import useGetInitial from '../../hooks/useGetInitial';
import { useLocation, useParams } from 'react-router-dom';
import useCreate from '../../hooks/useCreate';
import { InUserValidateStateOptions } from '../../utils/selects';
import axios from 'axios';
import { toast } from '../../utils/Toast';

const initValues = {
    national_id_status: '',
    national_id_image_url: '',
    national_id: '',
    cert_secondary_url: '',
    cert_secondary_status: '',
};
const SubmittedCreateForm = Yup.object({
    national_id_status: Yup.string().required('الحقل مطلوب'),
});

const MngActivationId = () => {
    const updateUrl = '/api/admin/users/nationals';
    const getDataUrl = '/api/admin/users';
    const navigateUrl = '/activate-users-id';
    const { pathname } = useLocation();
    const params = useParams();

    // errors
    // initial Values ( new: empty || old: {values} )
    // status: success: 201 ----- error: 400 | 500 | 401 | 403
    const isNew = pathname.split('/').slice(-1)[0] === 'new';
    const { data } = useGetInitial({
        url: getDataUrl,
        id: params.id,
        config: {},
        isNew,
        initialValues: initValues,
    });
    async function updateForm(formData) {
        try {
            const res = await axios.post(`/api/admin/users/nationals/${params.id}`, formData);
            toast.fire({
                icon: 'success',
                title: 'تم التحقق بنجاح',
            });
        } catch (error) {
            toast.fire({
                icon: 'error',
                title: 'لم يتم التعديل',
            });
        }
    }
    return (
        <>
            <div className="py-2">
                {/* BREADCRUMBS */}
                <MainBreadcrumbs links={[{ name: 'طلبات المستخدمون', src: '/activate-users-id' }]} />

                {/* FORM */}
                <div className="panel">
                    <div>
                        {/* {JSON.stringify(errors)} */}
                        <div>
                            <div>
                                <span className="font-bold text-xl">صورة الهوية:</span>
                                <div className="text-center font-bold text-danger text-xl">{!data?.national_id_image_url && 'غير مرفقة'}</div>
                                <img src={data?.national_id_image_url} className="img-fluid rounded-top border object-contain mx-auto w-[320px] h-[200px]" alt="" />
                            </div>
                            <div className="border my-10 border-dark"></div>
                            <div>
                                <span className="font-bold text-xl">شهادة الثانوية: </span>
                                <div className="text-center font-bold text-danger text-xl">{!data?.cert_secondary_url && 'غير مرفقة'}</div>
                                <img src={data?.cert_secondary_url} className="img-fluid rounded-top border object-contain mx-auto w-[320px] h-[400px]" alt="" />
                            </div>
                            <div>
                                <div className="border my-10 border-dark"></div>
                                <div className="text-xl text-center mt-4">
                                    <span className="font-bold text-yellow-400">رقم الهوية: </span>
                                    <span className="text-center">{data?.national_id}</span>
                                </div>
                            </div>
                        </div>
                        <Formik
                            enableReinitialize
                            initialValues={data}
                            validationSchema={SubmittedCreateForm}
                            onSubmit={(e) => updateForm({ national_id_status: e?.national_id_status, cert_secondary_status: e?.cert_secondary_status })}
                        >
                            {({ touched, errors }) => (
                                <Form className="space-y-5">
                                    <div>
                                        <label htmlFor="national_id_status">تفعيل الهوية</label>
                                        <Field className="form-select" dir="auto" as="select" name="national_id_status" id="national_id_status">
                                            {InUserValidateStateOptions.map((opt) => (
                                                <option key={opt?.value} value={opt?.value}>
                                                    {opt?.label}
                                                </option>
                                            ))}
                                        </Field>
                                        {touched.national_id_status && <ErrMsg name="national_id_status" />}
                                    </div>
                                    <div>
                                        <label htmlFor="cert_secondary_status">تفعيل شهادة الثانوية</label>
                                        <Field className="form-select" dir="auto" as="select" name="cert_secondary_status" id="cert_secondary_status">
                                            {InUserValidateStateOptions.map((opt) => (
                                                <option key={opt?.value} value={opt?.value}>
                                                    {opt?.label}
                                                </option>
                                            ))}
                                        </Field>
                                        {touched.cert_secondary_status && <ErrMsg name="cert_secondary_status" />}
                                    </div>
                                    <button type="submit" className="btn btn-primary !mt-6 w-full">
                                        إرسال
                                    </button>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MngActivationId;
