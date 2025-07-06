import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPageTitle } from '../../store/themeConfigSlice';
import { DataTable } from 'mantine-datatable';
import { pagesSizes } from '../../utils/globals';
import { IRootState } from '../../store';
import DeleteAlert from '../../components/tables/DeleteAlert';
import ColumnSelector from '../../components/tables/ColumnSelector';
import useFetch from '../../hooks/useFetch';
import Swal from 'sweetalert2';
import usePagePag from '../../hooks/usePagePag';
import { colsData_mid_absent as colsData, semseters_names } from '../../utils/columns_tables';
import { downloadExcel } from 'react-export-table-to-excel';
import { getSemesterName } from '../../utils/getSemesterName';
import AsyncSelect from '../../components/AsyncSelect';

export const colsExtend = colsData.filter((col) => col.extended).map((cols) => cols.name);
const url = '/api/admin/finalAbsent';

let searchTimeout: any = null;
const FinalAbsent = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Final Absent'));
    });

    const firstUpdate = useRef(true);
    const [searchCourse, setSearchCourse] = useState('');
    const [searchUserName, setSearchUserName] = useState('');
    const [batch_id, setBatchID] = useState('');
    const [semesterID, setSemesterID] = useState('');
    const [modal, setModal] = useState({ status: false, activeID: null });
    const [hideCols, setHideCols] = useState<any>(colsExtend);
    const { page, setPage, pageSize, setPageSize } = usePagePag();
    const { data, refetch, isLoading, deleteItem, isDelLoading } = useFetch({
        url,
        config: {
            params: {
                user_name: searchUserName,
                course_name: searchCourse,
                batch_id,
                semester_id: semesterID,
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
    }, [searchUserName, searchCourse, batch_id, semesterID]);

    useEffect(() => {
        if (!firstUpdate.current) {
            searchTimeout = setTimeout(async () => {
                refetch(url, {
                    params: {
                        // user_name: searchUserName,
                        // course_name: searchCourse,
                        batch_id,
                        semester_id: semesterID,
                        page,
                        pageSize,
                    },
                });
            }, 600);
        }
        firstUpdate.current = false;
        return () => {
            clearTimeout(searchTimeout);
        };
    }, [searchUserName, searchCourse, batch_id, semesterID, page, pageSize]);

    const header = ['ID', 'الاسم بالانجليزي', 'الاسم بالعربي', 'البريد الالكتروني', 'كود المنظمة', 'تاريخ الاختبار', 'اسم المادة', 'الفصل'];

    function handleDownloadExcel() {
        downloadExcel({
            fileName: 'تقرير الغياب لنهائي الفصول',
            sheet: 'react-export-table-to-excel',
            tablePayload: {
                header,
                body: data?.data?.map((x) => ({
                    user_id: x?.user_id,
                    user_name: x?.user_name,
                    user_name_ar: x?.user_name_ar,
                    user_email: x?.user_email,
                    user_code: x?.user_code,
                    midterm_date: x?.midterm_date,
                    course_name: x?.course_name,
                    semester_id: getSemesterName(x?.semester_id),
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
                    <select className="form-select w-40" dir="auto" name="semesterID" id="semesterID" value={semesterID} onChange={(e) => setSemesterID(e.target.value)}>
                        {semseters_names.map((opt) => (
                            <option key={opt?.value} value={opt?.value}>
                                {opt?.label}
                            </option>
                        ))}
                    </select>
                    <AsyncSelect url="/api/admin/batches" setValue={setBatchID} labelName="code" />

                    <button
                        type="button"
                        className="bg-red-600 text-white px-2 py-1 rounded-md"
                        onClick={() => {
                            setBatchID('');
                            setSearchUserName('');
                            setSearchCourse('');
                            setSemesterID('');
                        }}
                    >
                        تفريغ
                    </button>
                    <button type="button" className="btn btn-success" onClick={handleDownloadExcel}>
                        EXCEL
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
                        noRecordsText="لا يوجد نتائج تأكد من اختيار كود دفعة"
                        height={'calc(100vh - 20vh)'}
                        paginationText={({ from, to, totalRecords }) => <div dir="rtl">{`من ${from} الى ${to}  (اجمالي ${totalRecords})`}</div>}
                    />
                </div>
            </div>
        </div>
    );
};

export default FinalAbsent;
