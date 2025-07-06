import { useEffect, useState } from 'react';

const useSortable = ({ url, value, label, order }) => {
    const [adminOptions, setAdminOptions] = useState([]);

    useEffect(() => {
        fetch(url, {
            headers: {
                'Accept-Language': 'ar',
            },
        })
            .then((response) => response.json())
            .then((Data) => {
                const adminData = Data.data.data;
                const options = adminData.map((admin, index) => ({
                    id: index,
                    value: admin[value],
                    label: admin[label],
                    order: admin[order],
                }));
                console.log(options);
                setAdminOptions(options);
            })
            .catch((error) => {
                console.error('Error fetching admin IDs:', error);
            });
    }, [url]);

    return { url, adminOptions, setAdminOptions };
};

export default useSortable;
