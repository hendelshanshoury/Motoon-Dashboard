import React from 'react';
import Dropdown from '../Dropdown';

const ColumnSelector = ({ isRtl, cols, setHideCols, hideCols }) => {

    const showHideColumns = (col: any, value: any) => {
        if (hideCols.includes(col)) {
            setHideCols((col: any) => hideCols.filter((d: any) => d !== col));
        } else {
            setHideCols([...hideCols, col]);
        }
    };

    return (
        <div className="hidden sm:flex md:items-center md:flex-row flex-col gap-5 ">
            <div className="dropdown">
                <Dropdown
                    placement={`${isRtl ? 'bottom-end' : 'bottom-start'}`}
                    btnClassName="!flex items-center border font-semibold border-white-light dark:border-[#253b5c] rounded-md px-4 py-2 text-sm dark:bg-[#1b2e4b] dark:text-white-dark"
                    button={
                        <>
                            <span className="ltr:mr-1 rtl:ml-1">الأعمدة</span>
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M19 9L12 15L5 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </>
                    }
                >
                    <ul className="!min-w-[140px]">
                        {cols.map((col, i) => {
                            return (
                                <li
                                    key={i}
                                    className="flex flex-col"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                    }}
                                >
                                    <div className="flex items-center px-4 py-1">
                                        <label className="cursor-pointer mb-0">
                                            <input
                                                type="checkbox"
                                                checked={!hideCols.includes(col.accessor)}
                                                className="form-checkbox"
                                                defaultValue={col.accessor}
                                                onChange={(event: any) => {
                                                    setHideCols(event.target.value);
                                                    showHideColumns(col.accessor, event.target.checked);
                                                }}
                                            />
                                            <span className="ltr:ml-2 rtl:mr-2">{col.title}</span>
                                        </label>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </Dropdown>
            </div>
        </div>
    );
};

export default ColumnSelector;
