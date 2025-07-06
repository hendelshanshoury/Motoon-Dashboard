import React, { useState } from 'react';
import { ReactSortable } from 'react-sortablejs';

const items1 = [
    {
        id: 1,
        text: 'Need to be approved',
        name: 'Kelly Young',
    },
    {
        id: 2,
        text: 'Meeting with client',
        name: 'Andy King',
    },
    {
        id: 3,
        text: 'Project Detail',
        name: 'Judy Holmes',
    },
    {
        id: 4,
        text: 'Edited Post Apporval',
        name: 'Vincent Carpenter',
    },
    {
        id: 5,
        text: 'Project Lead Pickup',
        name: 'Mary McDonald',
    },
];
const items2 = [
    {
        id: 6,
        text: 'Need to be approved',
        name: 'Kelly Young',
    },
    {
        id: 7,
        text: 'Meeting with client',
        name: 'Andy King',
    },
    {
        id: 8,
        text: 'Project Detail',
        name: 'Judy Holmes',
    },
    {
        id: 9,
        text: 'Edited Post Apporval',
        name: 'Vincent Carpenter',
    },
    {
        id: 10,
        text: 'Project Lead Pickup',
        name: 'Mary McDonald',
    },
];

const Sortable = () => {
    const [handler1, setHandler1] = useState(items1);
    const [handler2, setHandler2] = useState(items2);

    return (
        <div>
            <div className="panel">
                <div className="font-semibold text-lg dark:text-white mb-5">Handler</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12">
                    <div>
                        <ul id="example5" className="dragndrop">
                            <ReactSortable list={handler1} setList={setHandler1}  >
                                {handler1.map((item) => {
                                    return (
                                        <li key={item.id} className="mb-2.5 cursor-grab">
                                            <div className="bg-white dark:bg-[#1b2e4b] rounded-md border border-white-light dark:border-dark px-6 py-3.5 flex md:flex-row flex-col ltr:text-left rtl:text-right items-md-center">
                                                {/* <div className="ltr:sm:mr-4 rtl:sm:ml-4">
                                                    <img alt="avatar" src={`/assets/images/profile-${item.id}.jpeg`} className="w-11 h-11 rounded-full mx-auto" />
                                                </div> */}
                                                <div className="flex md:flex-row flex-col justify-between items-center flex-1 text-center md:text-left">
                                                    <div className="font-semibold md:my-0 my-3">
                                                        <div className="text-dark dark:text-[#bfc9d4] text-base">{item.text}</div>
                                                        <div className="text-white-dark text-xs">{item.name}</div>
                                                    </div>
                                                    <div className="text-white-dark">
                                                        <span className="handle px-2 ltr:mr-1 rtl:ml-1 bg-[#ebedf2] dark:bg-black rounded cursor-move">+</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    );
                                })}
                            </ReactSortable>
                        </ul>
                    </div>

                    <div>
                        <ul id="example6">
                            {/* <ReactSortable list={handler2} setList={setHandler2} animation={200} handle=".handle" group="handler" ghostClass="gu-transit">
                                {handler2.map((item) => {
                                    return (
                                        <li key={item.id} className="mb-2.5 cursor-grab">
                                            <div className="bg-white dark:bg-[#1b2e4b] rounded-md border border-white-light dark:border-dark px-6 py-3.5 flex md:flex-row flex-col ltr:text-left rtl:text-right items-md-center">
                                                <div className="ltr:sm:mr-4 rtl:sm:ml-4">
                                                    <img alt="avatar" src={`/assets/images/profile-${item.id}.jpeg`} className="w-11 h-11 rounded-full mx-auto" />
                                                </div>
                                                <div className="sm:flex block justify-between items-center flex-1 text-center md:text-left">
                                                    <div className="font-semibold md:my-0 my-3">
                                                        <div className="text-dark dark:text-[#bfc9d4] text-base">{item.text}</div>
                                                        <div className="text-white-dark text-xs">{item.name}</div>
                                                    </div>
                                                    <div className="text-white-dark">
                                                        <span className="handle px-2 ltr:mr-1 rtl:ml-1 bg-[#ebedf2] dark:bg-black rounded cursor-move">+</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    );
                                })}
                            </ReactSortable> */}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sortable;
