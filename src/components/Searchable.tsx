import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import Select from 'react-select';
import Cookies from 'universal-cookie';
const cookie = new Cookies();

let searchTimeout: any = null;

const Searchable = ({ ttl, url, value, label, form, field, defaultVal, isSearchable = true, disabled = false, ...props }) => {
    const [options, setOptions] = useState([]);
    const [selectedOpt, setSelectedOpt] = useState({});
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);
    const firstUpdate = useRef(true);
    const fromSelectedInput = useRef(false);

    const handleChange = (e) => {
        console.log(e);
        form?.setFieldValue(field.name, e?.value);
        fromSelectedInput.current = true;
        setSelectedOpt({ value: e?.value, label: e.label });
    };

    const handleSearch = (value) => {
        setSearch(value);
    };

    // Search use Effect Logic
    useEffect(() => {
        if (defaultVal?.value && !selectedOpt?.value && firstUpdate.current) {
            console.log('test here', defaultVal);
            setSelectedOpt(defaultVal);
            firstUpdate.current = false;
        }
    }, [defaultVal]);
    useEffect(() => {
        if (fromSelectedInput.current) {
            fromSelectedInput.current = false;
            return;
        }
        searchTimeout = setTimeout(async () => {
            setLoading(true);
            await axios
                .get(url, {
                    headers: {
                        'Accept-Language': 'ar',
                        Authorization: `Bearer ${cookie.get('user')?.token}`,
                    },
                    params: {
                        search,
                        pageSize: 25,
                    },
                })
                .then(async (res) => {
                    const data = res.data.data.data;
                    console.log(data);
                    const newOptions = data?.map((opt) => ({
                        value: opt[value],
                        label: opt[label],
                    }));
                    setOptions(newOptions);
                })
                .catch((error) => {
                    console.error('Error fetching admin IDs:', error);
                })
                .finally(() => {
                    setLoading(false);
                });
        }, 600);

        return () => {
            clearTimeout(searchTimeout);
        };
    }, [search]);

    return (
        <>
            {/* {JSON.stringify(selectedOpt)} */}
            <div>
                <div className="flex items-center justify-between">
                    <label htmlFor={field.name}>{ttl}</label>
                </div>
                <div className="custom-select">
                    <Select
                        isLoading={loading}
                        value={selectedOpt}
                        onInputChange={handleSearch}
                        isSearchable={isSearchable}
                        placeholder="اختر..."
                        isDisabled={disabled}
                        options={options}
                        onChange={handleChange}
                    />
                </div>
            </div>
        </>
    );
};

export default Searchable;
