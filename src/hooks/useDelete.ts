import React, { useEffect, useState } from 'react';
import { delData, getData } from '../utils/fetch';

const useFetch = ({ id, config }) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState(false);

    const delData = async () => {
        setIsLoading(true);

        try {
            const { data, status, statusText } = await delData(`/api/admin/users/${id}`, config);
            setData(data?.data);
            setStatus(status);
        } catch (error) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        delData();
    }, [config, page]);

    return {data, isLoading, status, error};
};

export default useFetch;
