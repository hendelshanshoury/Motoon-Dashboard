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
import { colsData_lessons as colsData } from '../../utils/columns_tables';
import Cookies from 'universal-cookie';
const cookie = new Cookies();
import Tippy from '@tippyjs/react';
import BookmarkIcon from '../../components/icons/BookmarkIcon';

export const colsExtend = colsData.filter((col) => col.extended).map((cols) => cols.name);
const url = '/api/admin/lessons';

let searchTimeout: any = null;
const Lessons = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Lessons'));
    });
    const navigate = useNavigate();

    const firstUpdate = useRef(true);
    const [search, setSearch] = useState('');
    const [lang, setLang] = useState('ar');
    const [modal, setModal] = useState({ status: false, activeID: null });
    const [openMarks, setopenMarks] = useState({ status: false, activeID: null, data: [] });
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
    }, [search, page, pageSize, lang]);

    // COLUMNS CHOOSER
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
    const cols = [
        {
            accessor: 'action',
            title: 'Action',
            titleClassName: '!text-center',
            render: (data: any) => (
                <div className="flex gap-2">
                    <Tippy content="Edit">
                        <button onClick={() => setopenMarks({ status: true, activeID: data.id, data: [] })}></button>
                    </Tippy>
                    <ActionsRow editFN={() => navigate(`/lessons/mng/${data.id}`)} deleteFN={() => setModal({ status: true, activeID: data.id })}>
                        <Tippy content="العلامات المرجعية">
                            <Link to={`/bookmarks/mng/${data?.id}`}>
                                <BookmarkIcon />
                            </Link>
                        </Tippy>
                    </ActionsRow>
                </div>
            ),
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
                <div className="flex items-center justify-between ltr:ml-auto rtl:mr-auto mb-3">
                    <div className="flex items-center gap-5">
                        {/* COLUMN SELECTS */}
                        <ColumnSelector isRtl={isRtl} cols={cols} setHideCols={setHideCols} hideCols={hideCols} />
                        {/* SEARCH INPUT */}
                        <div className="text-right">
                            <input type="text" className="form-input" placeholder="بحث ..." value={search} onChange={(e) => setSearch(e.target.value)} />
                        </div>
                        {/* ADD BUTTUN */}
                        {cookie.get('user')?.type !== 'org' && <AddLink link={'/lessons/mng/new'} title="درس" />}
                    </div>
                    <div className="flex justify-center items-center gap-4">
                        <Link to="/sortableLesson">
                            <div className="btn btn-primary">
                                <Tippy content="order">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="cursor-pointer w-5 h-5">
                                        <path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </Tippy>
                            </div>
                        </Link>
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

export default Lessons;

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
