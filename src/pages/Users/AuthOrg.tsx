import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPageTitle } from '../../store/themeConfigSlice';
import { Link, useNavigate } from 'react-router-dom';
import { DataTable } from 'mantine-datatable';
import { pagesSizes } from '../../utils/globals';
import { IRootState } from '../../store';
import DeleteAlert from '../../components/tables/DeleteAlert';
import ColumnSelector from '../../components/tables/ColumnSelector';
import ActionsRow from '../../components/tables/ActionsRow';
import useFetch from '../../hooks/useFetch';
import Swal from 'sweetalert2';
import usePagePag from '../../hooks/usePagePag';
import { colsData_org_accounts as colsData } from '../../utils/columns_tables';
import Cookies from 'universal-cookie';
const cookie = new Cookies();

export const colsExtend = colsData.filter((col) => col.extended).map((cols) => cols.name);
const url = '/api/admin/users';

let searchTimeout: any = null;
const AuthOrg = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('AUTH ORG'));
    });
    const navigate = useNavigate();

    const firstUpdate = useRef(true);
    const [search, setSearch] = useState('');
    const [modal, setModal] = useState({ status: false, activeID: null });
    const [hideCols, setHideCols] = useState<any>(colsExtend);
    const { page, setPage, pageSize, setPageSize } = usePagePag();
    const { data, refetch, isLoading, status, deleteItem, isDelLoading, statusDel, error } = useFetch({
        url,
        config: {
            params: {
                search,
                page,
                pageSize,
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
                    },
                });
            }, 600);
        }
        firstUpdate.current = false;
        return () => {
            clearTimeout(searchTimeout);
        };
    }, [search, page, pageSize]);

    // COLUMNS CHOOSER
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
    const cols = [
        {
            accessor: 'action',
            title: 'Action',
            titleClassName: '!text-center',
            render: (data: any) => <ActionsRow editFN={() => navigate(`/users/mng/${data.id}`)} deleteFN={() => setModal({ status: true, activeID: data.id })} />,
        },
        ...colsData.map((col) => ({ accessor: col.name, hidden: hideCols.includes(col.name), title: col.title })),
    ];

    // DELETE
    const deleteRow = async (id) => {
        const { statusText }: any = await deleteItem(id);
        if (statusText == 'Created') {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'تم الحذف',
                showConfirmButton: false,
                timer: 1000,
            });
        }
        if (true) {
            setModal({ status: false, activeID: null });
        }
    };

    return (
        <div>
            <DeleteAlert modal={modal} setModal={setModal} deleteCallback={deleteRow} loading={isDelLoading} />
            <div className="panel ">
                <div className="flex items-center gap-5 mb-3 ltr:ml-auto rtl:mr-auto">
                    {/* COLUMN SELECTS */}
                    <ColumnSelector isRtl={isRtl} cols={cols} setHideCols={setHideCols} hideCols={hideCols} />

                    {/* SEARCH INPUT */}
                    <div className="text-right">
                        <input type="text" className="form-input" placeholder="بحث ..." value={search} onChange={(e) => setSearch(e.target.value)} />
                    </div>
                    {/* ADD BUTTUN */}
                    {cookie.get('user')?.type !== 'org' && <AddLink link={'/users/mng/new'} title="جمعية" />}
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

export default AuthOrg;

const AddLink = ({ link, title }) => {
    return (
        <Link to={link}>
            <button type="button" className="btn btn-primary">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
                    <circle opacity="0.5" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"></circle>
                    <path d="M15 12L12 12M12 12L9 12M12 12L12 9M12 12L12 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"></path>
                </svg>
                <span className="hidden ps-2 md:block">إضافة {title}</span>
            </button>
        </Link>
    );
};
