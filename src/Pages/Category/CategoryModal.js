/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { AiOutlineClose } from 'react-icons/ai';
import { toast, ToastContainer } from 'react-toastify';
import axios from '../../API/axios.config';

function CategoryModal({ setNewCategory }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [isLoading, setIsLoading] = useState(false);
  const notify = (text) => toast(text);

  const addCategory = async (dataToBeAdded) => {
    const { data } = await axios.post('/category', dataToBeAdded);
    if (data.status === 'success') {
      setIsLoading(false);
      notify(data.message);
    }
  };
  const onSubmit = (data) => {
    setIsLoading(true);
    const newData = { ...data, createdBy: 'admin' };
    addCategory(newData);
    setNewCategory(newData);
  };

  return (
    <div>
      <input type="checkbox" id="add-category" className="modal-toggle" />
      <div className="modal  modal-bottom sm:modal-middle">

        <div className="bg-white py-3 px-10 rounded  text-center">
          <form
            className="form-control w-full max-w-xs "
            onSubmit={handleSubmit(onSubmit)}
          >

            <div className="modal-action">
              <label
                htmlFor="add-category"
                className="btn btn-sm mb-1"
              >
                <AiOutlineClose />
              </label>
            </div>
            <hr />
            <label className="label">
              <span className="font-medium"> Name</span>
            </label>
            <label className="input-group input-group-vertical">
              <input
                type="text"
                placeholder="Category Name"
                className="
                input
                input-bordered
                focus:outline-bold
                focus:border-none
                outline-[#054232]
                w-full max-w-xs
                font-medium"
                {...register('name', { required: true })}
              />
            </label>

            <label className="label">
              <span className="font-medium">Description</span>
            </label>
            <label className="input-group input-group-vertical">
              <input
                type="text"
                placeholder="Category Details"
                className="
                input
                input-bordered
                w-full
                max-w-xs
                font-medium
                mb-1
                "
                {...register('description')}
              />
            </label>

            {
            isLoading ? (
              <button
                type="submit"
                className="btn btn-sm max-w-xs mt-4 cursor-pointer loading "
              >
                Add
              </button>
            )
              : (
                <button className="btn btn-sm max-w-xs mt-4 cursor-pointer">
                  {/* <RiCheckLine /> */}
                  Add
                </button>
              )
          }
            <ToastContainer
              position="bottom-center"
              autoClose={4000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="dark"
            />
          </form>
        </div>
      </div>
    </div>
  );
}

export default CategoryModal;
