import { Field } from 'formik';
import React, { useState } from 'react';
import ErrMsg from './ErrMsg';

const RadioInput = ({ name, inputName, lbl, touched, value, setCheckedName, checkedName }) => {
    return (
        <div>
            <label htmlFor="name">{lbl}</label>
            <div className="flex h-10">
                <div className="bg-[#f1f2f3] dark:bg-[#1b2e4b] flex justify-center items-center ltr:rounded-l-md rtl:rounded-r-md px-3 font-semibold border ltr:border-r-0 rtl:border-l-0 border-white-light dark:border-[#17263c]">
                    <input
                        onChange={(e) => {
                            e.target.checked ? setCheckedName(inputName) : null;
                        }}
                        checked={checkedName === inputName}
                        disabled={!value}
                        type="radio"
                        name={name}
                        className="form-radio text-info border-white-light dark:border-white-dark ltr:mr-0 rtl:ml-0"
                    />
                </div>
                <Field dir="auto" name={inputName} type="text" className="form-input ltr:rounded-l-none rtl:rounded-r-none" />
            </div>
            {touched && <ErrMsg name={inputName} />}
        </div>
    );
};

export default RadioInput;
