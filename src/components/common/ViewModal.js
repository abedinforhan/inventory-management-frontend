import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment } from 'react';

function ViewModal({
  isModalOpen, setIsModalOpen, title, data
}) {
  const dataArray = Object.entries(data);
  const modalContent = dataArray.map((item) => ({ heading: item[0], content: item[1] }));

  function closeModal() {
    setIsModalOpen(false);
  }

  function openModal() {
    setIsModalOpen(true);
  }

  return (
    <div>
      <Transition appear show={isModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => closeModal()}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    {title}
                  </Dialog.Title>
                  <div className="mt-2">
                    <div className="text-sm ">
                      {
                        modalContent?.map(({ heading, content }) => (
                          <div className="grid grid-cols-12 items-center py-2">
                            <p className="col-span-4 font-semibold capitalize">
                              {heading}
                            </p>
                            <p className="col-span-8 capitalize flex items-center">
                              <p className="p-2">:</p>
                              <p>{content}</p>
                            </p>
                          </div>
                        ))
                      }
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

    </div>
  );
}

export default ViewModal;
