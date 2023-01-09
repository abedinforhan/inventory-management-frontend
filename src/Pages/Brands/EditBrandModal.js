/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import axios from '../../API/axios.config';

function EditBrandModal({
  isEditModalOpen, setIsEditModalOpen, item, setItem, setIsLoading
}) {
  const {
    name,
    email,
    description,
    website,
    address,
    status
  } = item;
  const defaultValues = {
    name,
    email,
    description,
    website,
    address,
    status,
  };
  const {
    register,
    handleSubmit,
    watch, formState: { errors },
    reset
  } = useForm({
    defaultValues
  });

  const registerOptions = {
    name: {
      required: 'Name is required',
      pattern: {
        value: /^[a-zA-Z ]*$/,
        message: 'Alphabetical characters only'
      },
      minLength: {
        value: 3,
        message: 'Name shoud be at least 3 characters'
      },
      maxLength: {
        value: 30,
        message: 'Name can not exceed 30 characters'
      }
    },
    email: {
      required: 'Email is required',
    },
    website: {
      required: false
    },
    description: {
      required: false,
      maxLength: {
        value: 100,
        message: 'Description can not exceed more than 1000 characters'
      }
    },
    address: {
      required: false
    },
    status: {
      required: 'Status is required'
    }

  };

  useEffect(() => {
    reset(defaultValues);
  }, [item.name]);

  const onSubmit = async (formData) => {
    const newData = { ...formData, createdBy: 'Admin' };
    try {
      setIsLoading(true);
      const { data } = await axios.put(`/brand/${item?._id}`, newData);
      setIsEditModalOpen(false);
      toast.success('Successfully added');
    } catch (error) {
      toast.error(error?.message);
    }
  };

  const closeModal = () => {
    setIsEditModalOpen(false);
  };

  return (
    <Transition appear show={isEditModalOpen} as={Fragment}>
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
                  Update Brand
                </Dialog.Title>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="w-full">
                    <label className="label">
                      <span className="">Name </span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter Your Name"
                      className="input input-bordered w-full bg-white focus:outline-offset-0 focus:outline-black "
                      {...register('name', registerOptions.name)}
                    />
                    <span className="text-green-600">
                      {errors?.name && errors?.name?.message}
                    </span>
                  </div>
                  <div className="w-full">
                    <label className="label">
                      <span className="">Email </span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter Your Name"
                      className="input input-bordered w-full bg-white focus:outline-offset-0 focus:outline-black "
                      {...register('email', registerOptions.email)}
                    />
                    <span className="text-green-600">
                      {errors?.emai && errors?.email?.message}
                    </span>
                  </div>
                  <div className="w-full">
                    <label className="label">
                      <span className="">Description</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter Description"
                      className="input input-bordered w-full bg-white focus:outline-offset-0 focus:outline-black "
                      {...register('description', registerOptions.description)}
                    />
                    <span className="text-green-600">
                      {errors?.description && errors?.description?.message}
                    </span>
                  </div>
                  <div className="w-full">
                    <label className="label">
                      <span className="">Address</span>
                    </label>
                    <textarea
                      className="textarea textarea-bordered w-full bg-white focus:outline-offset-0 focus:outline-black "
                      {...register('address', registerOptions.address)}
                    />
                    <span className="text-green-600">
                      {errors?.address && errors?.address?.message}
                    </span>
                  </div>
                  <div className="w-full">
                    <label className="label">
                      <span className="">Website</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter Description"
                      className="input input-bordered w-full bg-white focus:outline-offset-0 focus:outline-black "
                      {...register('website', registerOptions.website)}
                    />
                    <span className="text-green-600">
                      {errors?.website && errors?.website?.message}
                    </span>
                  </div>
                  <div className="w-full">
                    <label className="label">
                      <span>Status</span>
                    </label>
                    <select {...register('status')} className="select select-bordered w-full bg-white focus:outline-offset-0 focus:outline-black ">
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
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

export default EditBrandModal;
