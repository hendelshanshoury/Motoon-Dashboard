import { useEffect, useState } from 'react';
import { getData } from '../utils/fetch';

const useGetInitial = ({ url, id, config, isNew, initialValues }: any) => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(false);
    const [lang, setLang] = useState('ar');
    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState(null);
    const [statusText, setStatusText] = useState(null);

    async function getSingleData(URL = url, CONFIG = config) {
        const { data, status, statusText }: any = await getData(URL, { ...CONFIG, headers: { 'Content-Type': 'application/json', 'Accept-Language': lang || 'en' } });
        setData(data?.data);
        setErrors(data?.errors);
        setStatus(status);
        setStatusText(statusText);
    }

    const fetchData = async () => {
        setLoading(true);
        try {
            if (!isNew) {
                const response = await getSingleData(`${url}/${id ? id : ''}`, config);
                console.log(response);
            } else {
                setData(initialValues);
            }
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [lang, id, isNew]);
    // useEffect(() => {
    //     if (!isNew) {
    //         getSingleData();
    //     }else{
    //         setData(initialValues)
    //     }
    // }, [lang]);

    return { data, loading, errors, status, statusText, lang, setLang };
};

export default useGetInitial;
