import React, { useEffect, useState } from 'react';
import { pagesSizes } from '../utils/globals';

const usePagePag = () => {
    const PAGE_SIZES = pagesSizes;
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(PAGE_SIZES[2]);

    // CHANGE PAGINATION
    useEffect(() => {
        setPage(1);
    }, [pageSize]);

    return { page, setPage, pageSize, setPageSize };
};

export default usePagePag;
