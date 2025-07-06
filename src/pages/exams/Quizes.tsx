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
import { colsData_quiz as colsData } from '../../utils/columns_tables';
import Cookies from 'universal-cookie';
const cookie = new Cookies();

export const colsExtend = colsData.filter((col) => col.extended).map((cols) => cols.name);
const url = '/api/admin/quizzes';

let searchTimeout: any = null;
const Quizes = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Quizes'));
    });
    const navigate = useNavigate();

    const firstUpdate = useRef(true);
    const [searchUserName, setSearchUserName] = useState('');
    const [searchLessonName, setSearchLessonName] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [modal, setModal] = useState({ status: false, activeID: null });
    const [hideCols, setHideCols] = useState<any>(colsExtend);
    const { page, setPage, pageSize, setPageSize } = usePagePag();
    const { data, refetch, isLoading, status, deleteItem, isDelLoading, statusDel, error } = useFetch({
        url,
        config: {
            params: {
                user_name: searchUserName,
                lesson_name: searchLessonName,
                start_date: new Date(startDate).toLocaleDateString('ar'),
                end_date: endDate,
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
    }, [searchUserName, searchLessonName, startDate, endDate]);

    useEffect(() => {
        if (!firstUpdate.current) {
            searchTimeout = setTimeout(async () => {
                refetch(url, {
                    params: {
                        user_name: searchUserName,
                        lesson_name: searchLessonName,
                        start_date: startDate,
                        end_date: endDate,
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
    }, [searchUserName, searchLessonName, startDate, endDate, page, pageSize]);

    // COLUMNS CHOOSER
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
    const cols = [
        // {
        //     accessor: 'action',
        //     title: 'Action',
        //     titleClassName: '!text-center',
        //     render: (data: any) => <ActionsRow editFN={() => navigate(`/exams/quizes/mng/${data.id}`)} deleteFN={() => setModal({ status: true, activeID: data.id })} />,
        // },
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
                <div className="flex items-center gap-5 ltr:ml-auto rtl:mr-auto mb-3">
                    {/* COLUMN SELECTS */}
                    <ColumnSelector isRtl={isRtl} cols={cols} setHideCols={setHideCols} hideCols={hideCols} />

                    {/* SEARCH INPUT */}
                    <div className="text-right">
                        <input type="text" className="form-input" placeholder="بحث بإسم الطالب" value={searchUserName} onChange={(e) => setSearchUserName(e.target.value)} />
                    </div>
                    <div className="text-right">
                        <input type="text" className="form-input" placeholder="بحث بإسم الدرس" value={searchLessonName} onChange={(e) => setSearchLessonName(e.target.value)} />
                    </div>
                    <input type="date" placeholder="من تاريخ" className='form-input w-fit' value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                    <input type="date" placeholder="إلى تاريخ" className='form-input w-fit' value={endDate} onChange={(e) => setEndDate(e.target.value)} />

                    {/* <Flatpickr
                        value={startDate}
                        placeholder="من تاريخ"
                        options={{
                            dateFormat: 'Y-m-d',
                            position: isRtl ? 'auto right' : 'auto left',
                        }}
                        className="form-input w-fit"
                        onChange={(date) => setStartDate(date)}
                    />
                    <Flatpickr
                        value={endDate}
                        placeholder="إلى تاريخ"
                        options={{ dateFormat: 'Y-m-d', position: isRtl ? 'auto right' : 'auto left' }}
                        className="form-input w-fit"
                        onChange={(date) => setEndDate(date)}
                    /> */}
                    <button
                        type="button"
                        className="bg-red-600 text-white px-2 py-1 rounded-md"
                        onClick={() => {
                            setStartDate('');
                            setEndDate('');
                            setSearchUserName('');
                            setSearchLessonName('');
                        }}
                    >
                        تفريغ
                    </button>
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

export default Quizes;
