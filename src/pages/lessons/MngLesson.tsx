import React, { useCallback, useState } from 'react';
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

const initValues = {
    description: '',
    name: '',
    course_id: '',
    image: '',
    book_pdf: '',
    video: '',
    lang: '',
};

const SubmittedCreateForm = Yup.object({
    description: Yup.string().required('الحقل مطلوب'),
    course_id: Yup.string().required('الحقل مطلوب'),
    name: Yup.string().required('الحقل مطلوب'),
    image: Yup.string(),
    video: Yup.string(),
    book_pdf: Yup.string(),
});

const SubmittedUpdateForm = Yup.object({
    description: Yup.string(),
    course_id: Yup.string(),
    image: Yup.string(),
    status: Yup.string(),
});

const MngLesson = () => {
    const createUrl = '/api/admin/lessons';
    const updateUrl = '/api/admin/lessons';
    const navigateUrl = '/lessons';
    const { pathname } = useLocation();
    const params = useParams();
    const [images, setImages] = useState<any>([]);
    const maxNumber = 69;

    const onChange = (imageList: ImageListType, addUpdateIndex: number[] | undefined) => {
        const imageListWithoutVideos = imageList.filter((item) => item.type !== 'video');
        setImages(imageListWithoutVideos as never[]);
    };

    const isNew = pathname.split('/').slice(-1)[0] === 'new';

    const { data, lang, setLang, loading } = useGetInitial({
        url: createUrl,
        id: params.id,
        config: {},
        isNew,
        initialValues: initValues,
    });
    const { submitCreateForm, updateForm } = useCreate({ createUrl, navigateUrl, updateUrl, lang });

    return (
        <>
            <div className="py-2">
                {/* BREADCRUMBS */}
                <MainBreadcrumbs links={[{ name: 'الدروس', src: '/lessons' }]} />

                {/* FORM */}
                <div className="panel">
                    <LangFormSwitcher setLang={setLang} lang={lang} />
                    <Loader isLoading={loading} />
                    <Formik enableReinitialize initialValues={data} validationSchema={isNew ? SubmittedCreateForm : SubmittedUpdateForm} onSubmit={isNew ? submitCreateForm : updateForm}>
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
                                        <Field dir="auto" name="course_id" id="course_id">
                                            {({ field, form, meta }) => (
                                                <Searchable
                                                    defaultVal={form?.values?.course_id ? { value: form?.values?.course_id, label: form?.values?.course_name } : null}
                                                    form={form}
                                                    field={field}
                                                    ttl="الماده"
                                                    label="name"
                                                    value="id"
                                                    url="/api/admin/courses"
                                                />
                                            )}
                                        </Field>
                                        {touched.lesson_id && <ErrMsg name="course_id" />}
                                    </div>
                                    {isNew && (
                                        <div>
                                            <label htmlFor="video">فيديو</label>
                                            <Field dir="auto" name={`video`} type="file" id="video" className="form-input" accept="video/*" />
                                            {touched.video && <ErrMsg name="video" />}
                                        </div>
                                    )}
                                    {isNew && (
                                        <div>
                                            <label htmlFor="book_pdf">PDF</label>
                                            <Field dir="auto" name={`book_pdf`} type="file" id="book_pdf" className="form-input" accept="application/pdf" />
                                            {touched.book_pdf && <ErrMsg name="book_pdf" />}
                                        </div>
                                    )}

                                    {isNew && (
                                        <div className="">
                                            <div className="custom-file-container" data-upload-id="myFirstImage">
                                                <div className="label-container">
                                                    <label htmlFor="image">صوره</label>
                                                    <button
                                                        type="button"
                                                        className="custom-file-container__image-clear"
                                                        title="Clear Image"
                                                        onClick={() => {
                                                            setImages([]);
                                                        }}
                                                    >
                                                        ×
                                                    </button>
                                                </div>
                                                <label className="custom-file-container__custom-file"></label>
                                                <input type="file" className="custom-file-container__custom-file__custom-file-input" accept="image/*" />
                                                <input type="hidden" name="MAX_FILE_SIZE" value="10485760" />
                                                <ImageUploading value={images} onChange={onChange} maxNumber={maxNumber}>
                                                    {({ imageList, onImageUpload }) => (
                                                        <div className="upload__image-wrapper">
                                                            <button className="custom-file-container__custom-file__custom-file-control form-input" onClick={onImageUpload}>
                                                                Choose Img...
                                                            </button>
                                                            &nbsp;
                                                            {imageList.map((image, index) => (
                                                                <div key={index} className="custom-file-container__image-preview relative ">
                                                                    <img src={image.dataURL} alt="img" className="w-[150px]" />
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}
                                                </ImageUploading>
                                            </div>
                                        </div>
                                    )}

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

export default MngLesson;
