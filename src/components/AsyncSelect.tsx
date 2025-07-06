import React, { useState } from 'react';

import AsyncSelect from 'react-select/async';
import { getData } from '../utils/fetch';

export default ({ url, setValue, labelName = 'name', valueId = 'id' }) => {
    const resetShape = (list: any = []) => {
        return list.map((i) => ({ value: i?.[valueId], label: i?.[labelName] }));
    };
    const promiseOptions = async (inputValue: string) => {
        const { data }: any = await getData(url, { params: { search: inputValue } });
        const options = await resetShape(data?.data?.data);
        return [{ value: '', label: 'الكل' }, ...options];
    };

    return (
        <div className="custom-select z-10 min-w-32">
            <AsyncSelect
                cacheOptions
                defaultOptions
                onChange={(value) => {
                    setValue(value?.value);
                }}
                placeholder="كود الدفعة"
                noOptionsMessage={() => 'لا يوجد نتيجة'}
                loadOptions={promiseOptions}
            />
        </div>
    );
};
