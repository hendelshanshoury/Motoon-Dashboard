import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPageTitle } from '../../store/themeConfigSlice';
import { Link, useNavigate } from 'react-router-dom';
import { DataTable } from 'mantine-datatable';
import { pagesSizes } from '../../utils/globals';
import { IRootState } from '../../store';
import DeleteAlert from '../../components/tables/DeleteAlert';
import ColumnSelector from '../../components/tables/ColumnSelector';
import useFetch from '../../hooks/useFetch';
import Swal from 'sweetalert2';
import usePagePag from '../../hooks/usePagePag';
import { colsData_mid as colsData, semseters_names, success_status_data } from '../../utils/columns_tables';
import Cookies from 'universal-cookie';
import { downloadExcel } from 'react-export-table-to-excel';
import { getSemesterName } from '../../utils/getSemesterName';

const cookie = new Cookies();

export const colsExtend = colsData.filter((col) => col.extended).map((cols) => cols.name);
const url = '/api/admin/midterm';

let searchTimeout: any = null;
const Midterms = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Midterms'));
    });

    const firstUpdate = useRef(true);
    const [searchCourse, setSearchCourse] = useState('');
    const [searchUserName, setSearchUserName] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [semesterID, setSemesterID] = useState('');
    const [isSuccess, setIsSuccess] = useState('');
    const [modal, setModal] = useState({ status: false, activeID: null });
    const [hideCols, setHideCols] = useState<any>(colsExtend);
    const { page, setPage, pageSize, setPageSize } = usePagePag();
    const { data, refetch, isLoading, deleteItem, isDelLoading } = useFetch({
        url,
        config: {
            params: {
                user_name: searchUserName,
                course_name: searchCourse,
                start_date: startDate,
                end_date: endDate,
                semester_id: semesterID,
                is_success: isSuccess,
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
    }, [searchUserName, searchCourse, startDate, endDate, semesterID,isSuccess]);
    useEffect(() => {
        if (!firstUpdate.current) {
            searchTimeout = setTimeout(async () => {
                refetch(url, {
                    params: {
                        user_name: searchUserName,
                        course_name: searchCourse,
                        start_date: startDate,
                        end_date: endDate,
                        semester_id: semesterID,
                        is_success: isSuccess,
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
    }, [searchUserName, searchCourse, startDate, endDate, isSuccess, semesterID, page, pageSize]);

    // download excel
    const header = ['ID', 'اسم الطالب', 'النسبة المئوية', 'اسم المادة', 'الفصل', 'ناجح|راسب'];

    function handleDownloadExcel() {
        downloadExcel({
            fileName: 'تقرير اختبارات منتصف الفصول',
            sheet: 'react-export-table-to-excel',
            tablePayload: {
                header,
                body: data?.data?.map((x) => ({
                    user_id: x?.user_id,
                    user_name: x?.user_name,
                    degree: `${x?.degree}%`,
                    course_name: x?.course_name,
                    semester_id: getSemesterName(x?.semester_id),
                    is_success: x?.is_success ? 'ناجح' : 'راسب',
                })),
            },
        });
    }

    // COLUMNS CHOOSER
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
    const cols = [
        ...colsData.map((col) => ({ accessor: col.name, hidden: hideCols.includes(col.name), title: col.title })),
        {
            accessor: 'semester',
            title: 'الفصل',
            titleClassName: '!text-center',
            render: (data: any) => getSemesterName(data?.semester_id),
        },
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
                <div className="flex items-center flex-wrap gap-5 ltr:ml-auto rtl:mr-auto mb-3 ">
                    {/* COLUMN SELECTS */}
                    <ColumnSelector isRtl={isRtl} cols={cols} setHideCols={setHideCols} hideCols={hideCols} />

                    {/* SEARCH INPUT */}
                    <div className="text-right">
                        <input type="text" className="form-input max-w-36" placeholder="بحث بإسم الطالب" value={searchUserName} onChange={(e) => setSearchUserName(e.target.value)} />
                    </div>
                    <div className="text-right">
                        <input type="text" className="form-input max-w-36" placeholder="بحث بإسم المادة" value={searchCourse} onChange={(e) => setSearchCourse(e.target.value)} />
                    </div>
                    <div className="flex items-center gap-2">
                        <label htmlFor="">من </label>
                        <input type="date" placeholder="من تاريخ" className="form-input w-fit" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                    </div>
                    <div className="flex items-center gap-2">
                        <label htmlFor="">الى </label>
                        <input type="date" placeholder="إلى تاريخ" className="form-input w-fit" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                    </div>
                    <select className="form-select w-40" dir="auto" name="semesterID" id="semesterID" value={semesterID} onChange={(e) => setSemesterID(e.target.value)}>
                        {semseters_names.map((opt) => (
                            <option key={opt?.value} value={opt?.value}>
                                {opt?.label}
                            </option>
                        ))}
                    </select>
                    <select className="form-select w-40" dir="auto" name="is_success" id="is_success" value={isSuccess} onChange={(e) => setIsSuccess(e.target.value)}>
                        {success_status_data.map((opt) => (
                            <option key={opt?.value} value={opt?.value}>
                                {opt?.label}
                            </option>
                        ))}
                    </select>

                    <button
                        type="button"
                        className="bg-red-600 text-white px-2 py-1 rounded-md"
                        onClick={() => {
                            setStartDate('');
                            setEndDate('');
                            setSearchUserName('');
                            setSearchCourse('');
                            setSemesterID('');
                            setIsSuccess('');
                        }}
                    >
                        تفريغ
                    </button>
                    <button type="button" className="btn btn-success" onClick={handleDownloadExcel}>
                        EXCEL
                    </button>
                    {/* ADD BUTTUN */}
                    {/* <AddLink link={'/exams/midterm/mng/new'} title="اختبار ميدتيرم" /> */}
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

export default Midterms;
