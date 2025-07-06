// في مكون Select2.js
import React, { useEffect } from 'react';
import Select from 'react-select';

const Select2 = ({ ttl, form, field, defaultValue, options, isDisabled = false, isSearchable = false }: any) => {
    return (
        <div id="basic" className="relative">
            <label>{ttl}</label>
            <div className="custom-select">
                <Select options={options} isSearchable={false} onChange={(e) => form.setFieldValue(field.name, e?.value)} isDisabled={isDisabled} />
            </div>
        </div>
    );
};

export default Select2;
