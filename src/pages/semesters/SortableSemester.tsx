import React from 'react';
import { ReactSortable } from 'react-sortablejs';
import MainBreadcrumbs from '../Elements/MainBreadcrumbs';
import useSortable from '../../hooks/useSortable';

const SortableSemester = () => {
    const url = '/api/admin/semesters';
    const value = 'name';
    const label = 'description';
    const order = 'order';

    const { adminOptions, setAdminOptions } = useSortable({ url, value, label, order });
    return (
        <div>
            <MainBreadcrumbs links={[{ name: 'الترم الدراسي', src: '/semesters' }]} />
            <div className="panel">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12">
                    {[1].map((example) => (
                        <div key={example}>
                            <ul id={`example${example}`}>
                                <ReactSortable
                                    list={adminOptions}
                                    setList={setAdminOptions}
                                    animation={200}
                                    group="multiple"
                                    multiDrag={true}
                                    selectedClass="selected"
                                    fallbackTolerance={3}
                                    ghostClass="gu-transit"
                                >
                                    {adminOptions.map((item) => (
                                        <li key={item.id} className="mb-2.5 cursor-grab">
                                            <div className="bg-white dark:bg-[#1b2e4b] rounded-md border border-white-light dark:border-dark px-6 py-3.5 flex md:flex-row flex-col ltr:text-left rtl:text-right items-md-center">
                                                <div className="flex gap-20 items-center ">
                                                    <div className="text-white-dark text-xs">{item.order}</div>
                                                    <div className="font-semibold md:my-0 my-3">
                                                        <div className="text-dark dark:text-[#bfc9d4] text-base">{item.value}</div>
                                                        <div className="text-white-dark text-xs">{item.label}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ReactSortable>
                            </ul>
                        </div>
                    ))}
                </div>
                <button type="submit" className="btn btn-primary !mt-6">
                    حفظ
                </button>
            </div>
        </div>
    );
};

export default SortableSemester;
