import React from 'react';
import MainBreadcrumbs from '../Elements/MainBreadcrumbs';
import * as Yup from 'yup';
import { Field, Form, Formik } from 'formik';
import InputGroup from '../../components/Forms/InputGroup';
import ErrMsg from '../../components/Forms/ErrMsg';
import useGetInitial from '../../hooks/useGetInitial';
import { useLocation, useParams } from 'react-router-dom';
import useCreate from '../../hooks/useCreate';
import { StatusOptions, TypeCodeOptions } from '../../utils/selects';
import { countries } from '../../utils/countriesList';
import Searchable from '../../components/Searchable';

// const getURL = '/';
const initValues = {
    email: '',
    name: '',
    address: '',
    password: '',
    type: 'org',
};

const SubmittedCreateForm = Yup.object({
    email: Yup.string().required('الحقل مطلوب'),
    name: Yup.string().required('الحقل مطلوب'),
    password: Yup.string().required('الحقل مطلوب'),
    address: Yup.string().required('الحقل مطلوب'),
    type: Yup.string().required('الحقل مطلوب'),
});
const SubmittedUpdateForm = Yup.object({
    email: Yup.string().required('الحقل مطلوب'),
    password: Yup.string(),
    name: Yup.string(),
    address: Yup.string(),
    type: Yup.string(),
    status: Yup.string(),
});

const MngAdmin = () => {
    const createUrl = '/api/admin/users/admins/create';
    const navigateUrl = '/organizations';
    const { pathname } = useLocation();
    const getDataUrl = '/api/admin/users/admins';
    const updateUrl = '/api/admin/users/admins/edit';

    const params = useParams();

    // errors
    // initial Values ( new: empty || old: {values} )
    // status: success: 201 ----- error: 400 | 500 | 401 | 403
    const isNew = pathname.split('/').slice(-1)[0] === 'new';
    const { submitCreateForm, updateUserAdminForm } = useCreate({ createUrl, navigateUrl, updateUrl });

    const { data } = useGetInitial({
        url: getDataUrl,
        id: params.id,
        config: {},
        isNew,
        initialValues: initValues,
    });
    // console.log(data)

    return (
        <>
            <div className="py-2">
                {/* BREADCRUMBS */}
                <MainBreadcrumbs links={[{ name: 'الجمعيات', src: '/organizations' }]} />

                {/* FORM */}
                <div className="panel">
                    <Formik enableReinitialize initialValues={data} validationSchema={isNew ? SubmittedCreateForm : SubmittedUpdateForm} onSubmit={isNew ? submitCreateForm : updateUserAdminForm}>
                        {({ touched, errors }) => (
                            <Form className="space-y-5">
                                {/* {JSON.stringify(errors)} */}
                                <InputGroup className="grid-cols-1 md:grid-cols-2">
                                    <div>
                                        <label htmlFor="email">البريد الالكتروني</label>
                                        <Field dir="auto" name="email" type="text" id="email" className="form-input" />
                                        {touched.email && <ErrMsg name="email" />}
                                    </div>
                                    <div>
                                        <label htmlFor="password">كلمة السر</label>
                                        <Field dir="auto" name="password" type="password" id="password" className="form-input" />
                                        {touched.password && <ErrMsg name="password" />}
                                    </div>
                                    <div>
                                        <label htmlFor="name">الاسم</label>
                                        <Field dir="auto" name="name" type="text" id="name" className="form-input" />
                                        {touched.name && <ErrMsg name="name" />}
                                    </div>
                                    <div>
                                        <label htmlFor="address">المنطقة</label>
                                        <Field className="form-select" dir="auto" as="select" name="address" id="address">
                                            {countries.map((opt) => (
                                                <option key={opt?.value} value={opt?.value}>
                                                    {opt?.label}
                                                </option>
                                            ))}
                                        </Field>
                                        {touched.address && <ErrMsg name="address" />}
                                    </div>
                                    <div className="hidden">
                                        <Field dir="auto" name="type" type="text" id="type" className="form-input" />
                                        {touched.type && <ErrMsg name="type" />}
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
            </div>
        </>
    );
};

export default MngAdmin;
