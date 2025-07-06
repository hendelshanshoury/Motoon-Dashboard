import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPageTitle } from '../../store/themeConfigSlice';
import { Link, useNavigate } from 'react-router-dom';
import { DataTable } from 'mantine-datatable';
import { pagesSizes } from '../../utils/globals';
import { IRootState } from '../../store';
import ColumnSelector from '../../components/tables/ColumnSelector';
import ActionsRow from '../../components/tables/ActionsRow';
import useFetch from '../../hooks/useFetch';
import Swal from 'sweetalert2';
import usePagePag from '../../hooks/usePagePag';
import { colsData_valdation as colsData } from '../../utils/columns_tables';
import Cookies from 'universal-cookie';
import { InUserValidateStateOptions } from '../../utils/selects';
const cookie = new Cookies();

export const colsExtend = colsData.filter((col) => col.extended).map((cols) => cols.name);
const url = '/api/admin/users/nationals/all';

let searchTimeout: any = null;
const ActivateId = () => {
    const [verifyStatus, setStatus] = useState('pending');
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('تفعيل الهوية'));
    });
    const navigate = useNavigate();

    const firstUpdate = useRef(true);
    const [search, setSearch] = useState('');
    const [modal, setModal] = useState({ status: false, activeID: null });
    const [hideCols, setHideCols] = useState<any>(colsExtend);
    const [lang, setLang] = useState('ar');
    const { page, setPage, pageSize, setPageSize } = usePagePag();
    const { data, refetch, isLoading, status, isDelLoading, statusDel, error } = useFetch({
        url,
        config: {
            params: {
                search,
                page,
                pageSize,
                type: verifyStatus,
            },
            headers: {
                'Accept-Language': lang,
            },
        },
    });
    // SEARCH
    useEffect(() => {
        if (!firstUpdate.current) {
            setPage(1);
        }
    }, [search]);
    useEffect(() => {
        if (!firstUpdate.current) {
            searchTimeout = setTimeout(async () => {
                refetch(url, {
                    params: {
                        search,
                        page: page,
                        pageSize,
                        type: verifyStatus,
                    },
                    headers: {
                        'Accept-Language': lang,
                    },
                });
            }, 600);
        }
        firstUpdate.current = false;
        return () => {
            clearTimeout(searchTimeout);
        };
    }, [search, page, pageSize, verifyStatus, lang]);

    // COLUMNS CHOOSER
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
    const cols = [
        {
            accessor: 'action',
            title: 'Action',
            titleClassName: '!text-center',
            render: (data: any) => <ActionsRow editFN={() => navigate(`/activate-users-id/mng/${data.id}`)} />,
        },
        ...colsData.map((col) => ({ accessor: col.name, hidden: hideCols.includes(col.name), title: col.title })),
    ];

    return (
        <div>
            <div className="panel ">
                <div className="flex items-center justify-between ltr:ml-auto rtl:mr-auto mb-3">
                    <div className="flex items-center gap-5">
                        {/* COLUMN SELECTS */}
                        <ColumnSelector isRtl={isRtl} cols={cols} setHideCols={setHideCols} hideCols={hideCols} />
                        {/* SEARCH INPUT */}
                        <div className="text-right">
                            <input type="text" className="form-input min-w-44" placeholder="بحث برقم الهوية ..." value={search} onChange={(e) => setSearch(e.target.value)} />
                        </div>
                        {/* <div className="flex items-center gap-2 ">
                            <label htmlFor="verifyStatus" className="mb-0">
                                الطلبات فقط
                            </label>
                            <input defaultChecked={verifyStatus} onChange={(e) => setStatus(e.target.checked)} type="checkbox" name="verifyStatus" id="verifyStatus" />
                        </div> */}
                        <select
                            value={verifyStatus}
                            onChange={(e) => {
                                setStatus(e.target.value);
                            }}
                            className="form-select"
                            dir="auto"
                            name="status"
                            id="status"
                        >
                            {InUserValidateStateOptions.map((opt) => (
                                <option key={opt?.value} value={opt?.value}>
                                    {opt?.label}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <select name="lang" className="form-input" onChange={(e) => setLang(e.target.value)}>
                            <option value="ar">AR</option>
                            <option value="en">EN</option>
                        </select>
                    </div>
                </div>

                <div dir="ltr" className="datatables">
                    <DataTable
                        striped
                        className="whitespace-nowrap table-striped "
                        records={data?.data}
                        columns={cols}
                        totalRecords={data?.total}
                        fetching={isLoading}
                        recordsPerPage={pageSize}
                        page={page}
                        onPageChange={(p) => setPage(p)}
                        recordsPerPageOptions={pagesSizes}
                        onRecordsPerPageChange={setPageSize}
                        minHeight={200}
                        height={'calc(100vh - 20vh)'}
                        paginationText={({ from, to, totalRecords }) => <div dir="rtl">{`من ${from} الى ${to}  (اجمالي ${totalRecords})`}</div>}
                    />
                </div>
            </div>
        </div>
    );
};

export default ActivateId;

const AddLink = ({ link, title }) => {
    return (
        <Link to={link}>
            <button type="button" className="btn btn-primary">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
                    <circle opacity="0.5" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"></circle>
                    <path d="M15 12L12 12M12 12L9 12M12 12L12 9M12 12L12 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"></path>
                </svg>
                <span className="ps-2 hidden md:block">إضافة {title}</span>
            </button>
        </Link>
    );
};
