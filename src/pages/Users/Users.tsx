import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPageTitle } from "../../store/themeConfigSlice";
import { Link, useNavigate } from "react-router-dom";
import { DataTable } from "mantine-datatable";
import { pagesSizes } from "../../utils/globals";
import { IRootState } from "../../store";
import DeleteAlert from "../../components/tables/DeleteAlert";
import ColumnSelector from "../../components/tables/ColumnSelector";
import ActionsRow from "../../components/tables/ActionsRow";
import useFetch from "../../hooks/useFetch";
import Swal from "sweetalert2";
import usePagePag from "../../hooks/usePagePag";
import {
  colsData_user as colsData,
  semseters_names,
} from "../../utils/columns_tables";
import Cookies from "universal-cookie";
import { downloadExcel } from "react-export-table-to-excel";
const cookie = new Cookies();
import axios from "axios";
import { getSemesterName } from "../../utils/getSemesterName";
import AsyncSelect from "../../components/AsyncSelect";
import { countries } from "../../utils/countriesList";

export const colsExtend = colsData
  .filter((col) => col.extended)
  .map((cols) => cols.name);
const url = "/api/admin/user-paginate";
const deleteurl = "/api/admin/user-delete";

let searchTimeout: any = null;
const Users = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setPageTitle("Users"));
  });
  const navigate = useNavigate();

  const firstUpdate = useRef(true);
  const [search, setSearch] = useState("");
  const [code, setCode] = useState("");
  const [batchId, setBatchID] = useState("");
  const [semesterID, setSemesterID] = useState("");
  const [date1, setDate1] = useState("");

  const [modal, setModal] = useState({ status: false, activeID: null });
  const [hideCols, setHideCols] = useState<any>(colsExtend);
  const [lang, setLang] = useState("ar");
  const { page, setPage, pageSize, setPageSize } = usePagePag();
  const {
    data,
    refetch,
    isLoading,
    status,
    deleteItem,
    isDelLoading,
    statusDel,
    error,
  } = useFetch({
    url,
    config: {
      params: {
        search,
        page,
        pageSize,
      },
      headers: {
        "Accept-Language": lang,
      },
    },
    deleteurl
  });
  // SEARCH
  useEffect(() => {
    if (!firstUpdate.current) {
      setPage(1);
    }
  }, [search, code, date1, batchId, semesterID]);
  useEffect(() => {
    if (!firstUpdate.current) {
      searchTimeout = setTimeout(async () => {
        refetch(url, {
          params: {
            search,
            code,
            batchId,
            semester_id: semesterID,
            created_at: date1,
            page: page,
            pageSize,
          },
          headers: {
            "Accept-Language": lang,
          },
        });
      }, 600);
    }
    firstUpdate.current = false;
    return () => {
      clearTimeout(searchTimeout);
    };
  }, [search, code, date1, batchId, semesterID, page, pageSize, lang]);

  // COLUMNS CHOOSER
  const isRtl =
    useSelector((state: IRootState) => state.themeConfig.rtlClass) === "rtl"
      ? true
      : false;
  const cols = [
    {
      accessor: "action",
      title: "Action",
      titleClassName: "!text-center",
      render: (data: any) => (
        <ActionsRow
          editFN={() => navigate(`/users/mng/${data.id}`)}
          deleteFN={() => setModal({ status: true, activeID: data.id })}
          canEdit={cookie.get("user")?.type !== "org"}
          canDelete={cookie.get("user")?.type !== "org"}
        />
      ),
    },
    ...colsData.map((col) => ({
      accessor: col.name,
      hidden: hideCols.includes(col.name),
      title: col.title,
    })),
  ];

  // download excel
  const header = [
    "#",
    "الاسم بالانجليزي",
    "الاسم بالعربي",
    "الجنسية",
    "البريد الالكتروني",
    "كود المنظمة",
    "الدفعة",
    "الفصل الحالي",
  ];

  function handleDownloadExcel() {
    downloadExcel({
      fileName: "تقرير الطلاب",
      sheet: "react-export-table-to-excel",
      tablePayload: {
        header,
        body: data?.data?.map((x) => ({
          id: x?.id,
          name: x?.name,
          name_ar: x?.name_ar,
          country: countries.find(
            (country) =>
              country?.value.toLowerCase() == x.country?.toLowerCase()
          )?.label,
          email: x?.email,
          code: x?.code,
          batch_code: x?.batch_code,
          semester_id: getSemesterName(x?.semester_id),
        })),
      },
    });
  }

  // DELETE
  const deleteRow = async (id) => {
    const { statusText }: any = await deleteItem(id);
    if (statusText == "Created") {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "تم الحذف",
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
      <DeleteAlert
        modal={modal}
        setModal={setModal}
        deleteCallback={deleteRow}
        loading={isDelLoading}
      />
      <div className="panel ">
        <div className="flex items-center justify-between mb-3 ltr:ml-auto rtl:mr-auto">
          <div className="flex flex-wrap items-center gap-5">
            {/* COLUMN SELECTS */}
            <ColumnSelector
              isRtl={isRtl}
              cols={cols}
              setHideCols={setHideCols}
              hideCols={hideCols}
            />
            {/* SEARCH INPUT */}
            <div className="text-right">
              <input
                type="text"
                className="form-input"
                placeholder="بحث ..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="text-right">
              <input
                type="text"
                className="form-input"
                placeholder="كود المنظمة"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
            </div>
            <select
              className="w-40 form-select"
              dir="auto"
              name="semesterID"
              id="semesterID"
              value={semesterID}
              onChange={(e) => setSemesterID(e.target.value)}
            >
              {semseters_names.map((opt) => (
                <option key={opt?.value} value={opt?.value}>
                  {opt?.label}
                </option>
              ))}
            </select>
            <AsyncSelect
              url="/api/admin/batches"
              setValue={setBatchID}
              labelName="code"
            />
            {/* ADD BUTTUN */}
            <input
              type="date"
              placeholder="تاريخ التسجيل"
              className="form-input w-fit"
              value={date1}
              onChange={(e) => setDate1(e.target.value)}
            />
            <button
              className="px-2 py-1 text-white bg-red-600 rounded-md"
              type="button"
              onClick={() => {
                setDate1("");
                setSearch("");
                setCode("");
                setBatchID("");
              }}
            >
              تفريغ
            </button>
            <button className="btn btn-success" onClick={handleDownloadExcel}>
              Excel
            </button>
            {cookie.get("user")?.type !== "org" && (
              <AddLink title={""} link={"/users/mng/new"} />
            )}
          </div>
          {/* <div>
                        <select name="lang" className="form-input" onChange={(e) => setLang(e.target.value)}>
                            <option value="ar">AR</option>
                            <option value="en">EN</option>
                        </select>
                    </div> */}
        </div>

        <div dir="ltr" className="datatables">
          <DataTable
            striped
            className="whitespace-nowrap table-striped "
            records={data?.users}
            columns={cols}
            totalRecords={data?.meta?.total}
            fetching={isLoading}
            recordsPerPage={pageSize}
            page={page}
            onPageChange={(p) => setPage(p)}
            recordsPerPageOptions={pagesSizes}
            onRecordsPerPageChange={setPageSize}
            minHeight={200}
            height={"calc(100vh - 20vh)"}
            paginationText={({ from, to, totalRecords }) => (
              <div dir="rtl">{`من ${from} الى ${to}  (اجمالي ${totalRecords})`}</div>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default Users;

const AddLink = ({ link, title }) => {
  return (
    <Link to={link}>
      <button type="button" className="btn btn-primary">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
        >
          <circle
            opacity="0.5"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="1.5"
          ></circle>
          <path
            d="M15 12L12 12M12 12L9 12M12 12L12 9M12 12L12 15"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          ></path>
        </svg>
        <span className="hidden ps-2 md:block">إضافة {title}</span>
      </button>
    </Link>
  );
};
const ExportToExcel = ({ filter }) => {
  async function downloadExcel() {
    const { data } = await axios.get("/api/admin/reports/users", {
      params: filter,
    });
    const excel = data.data;
    window.location.href = excel;
  }

  return (
    <div>
      <button type="button" className="btn btn-primary" onClick={downloadExcel}>
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
        >
          <path
            opacity="0.5"
            d="M3 10C3 6.22876 3 4.34315 4.17157 3.17157C5.34315 2 7.22876 2 11 2H13C16.7712 2 18.6569 2 19.8284 3.17157C21 4.34315 21 6.22876 21 10V14C21 17.7712 21 19.6569 19.8284 20.8284C18.6569 22 16.7712 22 13 22H11C7.22876 22 5.34315 22 4.17157 20.8284C3 19.6569 3 17.7712 3 14V10Z"
            fill="currentColor"
          ></path>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M7.25 9C7.25 8.58579 7.58579 8.25 8 8.25H14.5C14.9142 8.25 15.25 8.58579 15.25 9C15.25 9.41421 14.9142 9.75 14.5 9.75H8C7.58579 9.75 7.25 9.41421 7.25 9ZM7.25 13C7.25 12.5858 7.58579 12.25 8 12.25H11C11.4142 12.25 11.75 12.5858 11.75 13C11.75 13.4142 11.4142 13.75 11 13.75H8C7.58579 13.75 7.25 13.4142 7.25 13ZM7.25 17C7.25 16.5858 7.58579 16.25 8 16.25H9.5C9.91421 16.25 10.25 16.5858 10.25 17C10.25 17.4142 9.91421 17.75 9.5 17.75H8C7.58579 17.75 7.25 17.4142 7.25 17Z"
            fill="currentColor"
          ></path>
        </svg>
        <span className="hidden ps-2 md:block">تصدير</span>
      </button>
    </div>
  );
};
