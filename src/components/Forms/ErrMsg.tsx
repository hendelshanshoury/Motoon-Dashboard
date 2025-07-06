import { ErrorMessage } from 'formik';
import React from 'react';

const ErrMsg = ({ name }) => {
    return <ErrorMessage name={name}>{(msg) => <span className='text-danger'>{msg}</span>}</ErrorMessage>;
};

export default ErrMsg;
