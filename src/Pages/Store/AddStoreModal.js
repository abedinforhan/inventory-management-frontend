/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment } from 'react';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import ReactSelect from 'react-select';
import axios from '../../API/axios.config';
import statusList from '../../data/statusLIst';
import validationOptions from '../../utilities/Validation';

function AddStoreModal({ isAddModalOpen, setIsAddModalOpen, setIsLoading }) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm();

  const onSubmit = async (formData) => {
    const postData = { ...formData, status: formData?.status?.value };
    try {
      setIsLoading(true);
      const { data } = await axios.post('/store', postData);
      toast.success(data?.message);
      setIsAddModalOpen(false);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const closeModal = () => {
    setIsAddModalOpen(false);
  };

  return (
    <Transition appear show={isAddModalOpen} as={Fragment}>
      <Dialog as="div" className="relative z-[999]" onClose={closeModal}>
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
                  Add New Store
                </Dialog.Title>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="w-full my-2">
                    <label className="label">
                      <span className="">Name </span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter Your Name"
                      className="input input-bordered  w-full  bg-white
              focus:outline-offset-0 focus:outline-black "
                      {...register('name', validationOptions.name)}
                    />
                    <span className="text-green-600">
                      {errors?.name && errors?.name?.message}
                    </span>
                  </div>
                  <div className="w-full my-2">
                    <label htmlFor="brand" className="font-semibold">
                      Status
                    </label>
                    <Controller
                      name="status"
                      control={control}
                      rules={validationOptions?.status}
                      render={({ field }) => (
                        <ReactSelect
                          {...field}
                          options={statusList}
                          styles={{
                            control: (baseStyles, state) => ({
                              ...baseStyles,
                              height: '2.75rem',
                              borderRadius: '0.375rem',
                              borderColor: state.isFocused ? '#82A098' : '#82A098',
                              boxShadow: state.isFocused ? '0px 0px 0px 1px rgba(5,66,50,1)' : 'none',
                              '&:hover': { borderColor: '#82A098' }
                            })
                          }}
                        />
                      )}
                    />
                    <span className="text-green-600">
                      {errors?.status && errors?.status?.message}
                    </span>
                  </div>
                  <div>
                    <button type="submit" className="btn btn-block btn-primary my-10">ADD</button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>

  );
}

export default AddStoreModal;
