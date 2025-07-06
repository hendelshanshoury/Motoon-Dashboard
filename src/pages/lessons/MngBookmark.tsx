import React, { useCallback, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import useGetInitial from '../../hooks/useGetInitial';
import useCreate from '../../hooks/useCreate';
import * as Yup from 'yup';
import { Field, Form, Formik } from 'formik';
import ErrMsg from '../../components/Forms/ErrMsg';
import InputGroup from '../../components/Forms/InputGroup';
import LangFormSwitcher from '../../components/Forms/LangFormSwitcher';
import MainBreadcrumbs from '../Elements/MainBreadcrumbs';
import ImageUploading, { ImageListType } from 'react-images-uploading';
import Loader from '../../components/Loader';
import Searchable from './../../components/Searchable';
import { StatusOptions } from '../../utils/selects';
import IconX from '../../components/icons/IconX';
import { AddLink } from './Bookmarks';

const initValues = {
    lesson_id: '',
};

const SubmittedCreateForm = Yup.object({
    lesson_id: Yup.string().required('الحقل مطلوب'),
});
const SubmittedUpdateForm = Yup.object({
    lesson_id: Yup.string(),
});

const MngBookmark = () => {
    const createUrl = '/api/admin/lesson/bookmarks';
    const updateUrl = '/api/admin/lesson/bookmarks';
    const getDataUrl = '/api/admin/lesson/bookmarks';
    const navigateUrl = '/bookmarks';
    const { pathname } = useLocation();
    const params = useParams();
    const [images, setImages] = useState<any>([]);
    const maxNumber = 69;

    const [items, setItems] = useState<any>([
        {
            id: 1,
            name: '',
            time: 0,
        },
    ]);

    const addItem = () => {
        if (!items[items?.length - 1]?.name) {
            return;
        }
        let maxId = 0;
        maxId = items?.length ? items.reduce((max: number, character: any) => (character.id > max ? character.id : max), items[0].id) : 0;
        setItems([...items, { id: maxId + 1, name: '', time: 0 }]);
    };

    const removeItem = (item: any = null) => {
        if (items.length <= 1) return;
        setItems(items.filter((d: any) => d.id !== item.id));
    };

    const changeRow = (type: string, value: string, id: number) => {
        const list = items;
        const item = list.find((d: any) => d.id === id);
        if (type === 'time') {
            item.time = Number(value);
            if (!Object.keys(item).includes('name')) {
                item.name = '';
            }
        }
        if (type === 'name') {
            item.name = value;
            if (!Object.keys(item).includes('time')) {
                item.time = 0;
            }
        }
        setItems([...list]);
    };

    const isNew = pathname.split('/').slice(-1)[0] === 'new';

    const { data, lang, setLang, loading } = useGetInitial({
        url: getDataUrl,
        id: params.id,
        config: {},
        isNew,
        initialValues: initValues,
    });

    const { submitCreateForm } = useCreate({ createUrl, navigateUrl, updateUrl, lang });

    useEffect(() => {
        if (!data?.bookmarks || !data?.bookmarks.length) {
            setItems([{ id: 1, name: '' }]);
        } else {
            setItems(data?.bookmarks || [{ id: 1, name: '' }]);
        }
    }, [data]);

    // useEffect(() => {
    //     console.log(items);
    // }, [items]);

    return (
        <>
            <div className="py-2">
                {/* BREADCRUMBS */}
                <MainBreadcrumbs links={[{ name: 'العلامات المرجعية', src: '/lessons' }]} />
                {/* FORM */}
                <div className="panel">
                    <LangFormSwitcher setLang={setLang} lang={lang} />
                    <Loader isLoading={loading} />
                    <Formik
                        enableReinitialize
                        initialValues={data}
                        validationSchema={isNew ? SubmittedCreateForm : SubmittedUpdateForm}
                        onSubmit={(values) => submitCreateForm({ ...values, bookmarks: items.filter((item) => item.name), lesson_id: params.id })}
                    >
                        {({ touched, errors }) => (
                            <Form className={`space-y-5 ${loading ? 'pointer-events-none' : ''}`}>
                                {/* {JSON.stringify(errors)} */}
                                {isNew && (
                                    <div>
                                        <Field dir="auto" name="lesson_id" id="lesson_id">
                                            {({ field, form, meta }) => (
                                                <Searchable
                                                    defaultVal={form?.values?.lesson_id ? { value: form?.values?.lesson_id, label: form?.values?.lesson?.name } : null}
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
                                )}
                                <div className="mt-8">
                                    <div className="table-responsive">
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>العنوان</th>
                                                    <th className="">التوقيت ( بالثواني )</th>
                                                    <th className="">حذف</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {items.length <= 0 && (
                                                    <tr>
                                                        <td colSpan={5} className="!text-center font-semibold">
                                                            لا يوجد
                                                        </td>
                                                    </tr>
                                                )}
                                                {items.map((item: any, index) => {
                                                    return (
                                                        <tr className="align-top" key={item.id}>
                                                            <td>
                                                                <input
                                                                    autoComplete="off"
                                                                    onChange={(e) => changeRow('name', e.target.value, item.id)}
                                                                    value={item?.name}
                                                                    type="text"
                                                                    className="form-input"
                                                                    placeholder="ادخل عنوان العلامة"
                                                                    name={`name`}
                                                                />
                                                                {touched?.[`name[${index}]`] && <ErrMsg name={`name[${index}]`} />}
                                                            </td>
                                                            <td>
                                                                <input
                                                                    autoComplete="off"
                                                                    onChange={(e) => changeRow('time', e.target.value, item.id)}
                                                                    value={item.time}
                                                                    type="number"
                                                                    className="form-input w-24"
                                                                    placeholder="0"
                                                                    min={0}
                                                                    name={`time`}
                                                                />
                                                                {touched?.[`time[${index}]`] && <ErrMsg name={`time[${index}]`} />}
                                                            </td>

                                                            <td>
                                                                <button type="button" className="btn btn-danger shadow-none" onClick={() => removeItem(item)}>
                                                                    <IconX className="w-5 h-5" />
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="sm:mb-0 my-6 px-4">
                                        <button type="button" className="btn btn-primary w-full" onClick={() => addItem()}>
                                            <AddLink />
                                        </button>
                                    </div>
                                </div>

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

export default MngBookmark;
