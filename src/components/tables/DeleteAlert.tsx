import { Dialog, Transition } from '@headlessui/react';
import { Loader } from '@mantine/core';
import React from 'react';
import { Fragment } from 'react';

const DeleteAlert = ({ modal, setModal, deleteCallback, loading }) => {
    function deleteHandler() {
        deleteCallback(modal.activeID);
    }
    function closeModal() {
        if (!loading) {
            setModal({ status: false, activeID: null });
        }
    }

    return (
        <Transition appear show={modal.status} as={Fragment}>
            <Dialog as="div" open={modal.status} onClose={closeModal}>
                <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                    <div className="fixed inset-0" />
                </Transition.Child>
                <div className="fixed inset-0 bg-[black]/60 z-[999] overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen px-4">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel as="div" className="panel border-0 p-0 rounded-lg overflow-hidden w-full max-w-lg my-8 text-black dark:text-white-dark">
                                <div className="p-5 text-center">
                                    <h1 className="text-xl font-bold mb-10">هل انت متأكد من الحذف!</h1>
                                    {loading && (
                                        <div className="mb-4 mx-auto text-danger">
                                            <Loader className="mx-auto" color="red" />
                                            <span>جاري الحذف...</span>
                                        </div>
                                    )}
                                    <div className="flex justify-center items-center ">
                                        <button disabled={loading} autoFocus type="button" className="btn btn-secondary" onClick={closeModal}>
                                            الغاء
                                        </button>
                                        <button disabled={loading} type="button" className="btn btn-outline-danger ltr:ml-4 rtl:mr-4" onClick={deleteHandler}>
                                            <span>حذف</span>
                                        </button>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default DeleteAlert;
