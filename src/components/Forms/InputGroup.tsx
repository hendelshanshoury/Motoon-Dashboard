import React from 'react';

const InputGroup = ({ children, className, errorToast }: any) => {
    return (
        <div className={`grid gap-5 sm:gap-3 ${className}`}>
            {children}
            {errorToast && typeof errorToast === 'string' && errorToast.trim().length > 0 && <div className="absolute bottom-0 left-0 bg-red-500 text-white p-2">{errorToast}</div>}
        </div>
    );
};

export default InputGroup;
