import React from 'react';
import MainBreadcrumbs from '../Elements/MainBreadcrumbs';
import * as Yup from 'yup';
import { Field, Form, Formik } from 'formik';
import InputGroup from '../../components/Forms/InputGroup';
import ErrMsg from '../../components/Forms/ErrMsg';
import useGetInitial from '../../hooks/useGetInitial';
import { useLocation, useParams } from 'react-router-dom';
import useCreate from '../../hooks/useCreate';
import { StatusOptions } from '../../utils/selects';
import { countries } from '../../utils/countriesList';
import Searchable from '../../components/Searchable';

// const getURL = '/';
const initValues = {
    email: '',
    name: '',
    address: '',
    password: '',
    phone: '', 
    type: 'center',
    code: '',
    student_num: '',
};

const SubmittedCreateForm = Yup.object({
    admin_id: Yup.string().required('الحقل مطلوب'),
    email: Yup.string().email('البريد الالكتروني غير صحيح').required('الحقل مطلوب'),
    password: Yup.string(),
    address: Yup.string().required('الحقل مطلوب'),
    name: Yup.string().required('الحقل مطلوب'),
    type: Yup.string().required('الحقل مطلوب'),
    phone: Yup.string().required('الحقل مطلوب'),

    code: Yup.string().required('الحقل مطلوب'),
    student_num: Yup.string().required('الحقل مطلوب'),
});
const SubmittedUpdateForm = Yup.object({
    email: Yup.string().email('البريد الالكتروني غير صحيح').required('الحقل مطلوب'),
    password: Yup.string(),
    address: Yup.string(),
    name: Yup.string(),
    phone: Yup.string(),
    code: Yup.string().required('الحقل مطلوب'),
    student_num: Yup.string().required('الحقل مطلوب'),
    type: Yup.string().required('الحقل مطلوب'),
    status: Yup.string().required('الحقل مطلوب'),
});

const MngCenter = () => {
    const { pathname } = useLocation();
    const createUrl = '/api/admin/centers';
    const navigateUrl = '/centers';
    const getDataUrl = '/api/admin/centers';
    const updateUrl = '/api/admin/centers/edit';

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

    return (
        <>
            <div className="py-2">
                {/* BREADCRUMBS */}
                <MainBreadcrumbs links={[{ name: 'المراكز', src: '/centers' }]} />
                {/* FORM */}
                <div className="panel">
                    <Formik enableReinitialize initialValues={data} validationSchema={isNew ? SubmittedCreateForm : SubmittedUpdateForm} onSubmit={isNew ? submitCreateForm : updateUserAdminForm}>
                        {({ touched, errors }) => (
                            <Form className="space-y-5">
                                {/* {JSON.stringify(errors)} */}
                                <InputGroup className="grid-cols-1 md:grid-cols-2">
                                    <Field dir="auto" name="admin_id" id="admin_id">
                                        {({ field, form, meta }) => (
                                            <Searchable
                                                defaultVal={form?.values?.admin_id ? { value: form?.values?.admin_id, label: form?.values?.admin_name } : null}
                                                form={form}
                                                field={field}
                                                ttl="(الجمعية)"
                                                label="name"
                                                value="id"
                                                url="/api/admin/users/admins?type=org"
                                                disabled={!isNew}
                                            />
                                        )}
                                    </Field>

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
                                        <label htmlFor="name">الهاتف</label>
                                        <Field dir="auto" name="phone" type="text" id="phone" className="form-input" />
                                        {touched.phone && <ErrMsg name="phone" />}
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
                                    {isNew && (
                                        <>
                                            <div>
                                                <label htmlFor="code">كود التسجيل</label>
                                                <Field dir="auto" name="code" type="text" id="code" className="form-input" />
                                                {touched.code && errors.code && <ErrMsg name="code" />}
                                            </div>
                                            <div>
                                                <label htmlFor="student_num">عدد الطلاب للكود الجديد</label>
                                                <Field dir="auto" name={`student_num`} type="number" min={0} max={1000000} id="student_num" className="form-input" />
                                                {touched.student_num && <ErrMsg name="student_num" />}
                                            </div>
                                        </>
                                    )}
                                    <div>
                                        <label htmlFor="type">النوع</label>
                                        <Field className="form-select" dir="auto" as="select" name="type" id="type">
                                            <option value="center">مركز</option>
                                        </Field>
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

export default MngCenter;
