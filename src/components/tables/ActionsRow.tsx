import Tippy from '@tippyjs/react';
import React from 'react';
import { useLocation } from 'react-router-dom';
import 'tippy.js/dist/tippy.css';

const ActionsRow = ({ editFN, deleteFN, children, canEdit = true, canDelete = true }: any) => {
    const location = useLocation();
    const excludedPages = ['/contacts', '/supports'];
    const isNotExcludedPage = !excludedPages.includes(location.pathname);

    const isNotExcludedDelete = !location.pathname.startsWith('/semesters');

    return (
        <div className="flex items-center w-max mx-auto gap-2">
            {children}
            {isNotExcludedPage && canEdit ? (
                <Tippy content="تعديل">
                    {editFN && (
                        <svg onClick={editFN} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="cursor-pointer w-5 h-5">
                            <path
                                d="M15.2869 3.15178L14.3601 4.07866L5.83882 12.5999L5.83881 12.5999C5.26166 13.1771 4.97308 13.4656 4.7249 13.7838C4.43213 14.1592 4.18114 14.5653 3.97634 14.995C3.80273 15.3593 3.67368 15.7465 3.41556 16.5208L2.32181 19.8021L2.05445 20.6042C1.92743 20.9852 2.0266 21.4053 2.31063 21.6894C2.59466 21.9734 3.01478 22.0726 3.39584 21.9456L4.19792 21.6782L7.47918 20.5844L7.47919 20.5844C8.25353 20.3263 8.6407 20.1973 9.00498 20.0237C9.43469 19.8189 9.84082 19.5679 10.2162 19.2751C10.5344 19.0269 10.8229 18.7383 11.4001 18.1612L11.4001 18.1612L19.9213 9.63993L20.8482 8.71306C22.3839 7.17735 22.3839 4.68748 20.8482 3.15178C19.3125 1.61607 16.8226 1.61607 15.2869 3.15178Z"
                                stroke="currentColor"
                                strokeWidth="1.5"
                            />
                            <path
                                opacity="0.5"
                                d="M14.36 4.07812C14.36 4.07812 14.4759 6.04774 16.2138 7.78564C17.9517 9.52354 19.9213 9.6394 19.9213 9.6394M4.19789 21.6777L2.32178 19.8015"
                                stroke="currentColor"
                                strokeWidth="1.5"
                            />
                        </svg>
                    )}
                </Tippy>
            ) : null}
            {isNotExcludedDelete && canDelete ? (
                <Tippy content="حذف">
                    {deleteFN && (
                        <svg onClick={deleteFN} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="cursor-pointer w-5 h-5">
                            <path opacity="0.5" d="M9.17065 4C9.58249 2.83481 10.6937 2 11.9999 2C13.3062 2 14.4174 2.83481 14.8292 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                            <path d="M20.5001 6H3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                            <path
                                d="M18.8334 8.5L18.3735 15.3991C18.1965 18.054 18.108 19.3815 17.243 20.1907C16.378 21 15.0476 21 12.3868 21H11.6134C8.9526 21 7.6222 21 6.75719 20.1907C5.89218 19.3815 5.80368 18.054 5.62669 15.3991L5.16675 8.5"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                            />
                            <path opacity="0.5" d="M9.5 11L10 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                            <path opacity="0.5" d="M14.5 11L14 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                    )}
                </Tippy>
            ) : null}
        </div>
    );
};
export default ActionsRow;
