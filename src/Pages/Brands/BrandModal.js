/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { useForm } from 'react-hook-form';
import { AiOutlineClose } from 'react-icons/ai';
import { ToastContainer } from 'react-toastify';

function BrandModal({ addBrand, setNewBrand }) {
  // react hook form
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm();

  const onSubmit = (data) => {
    const newData = { ...data, createdBy: 'admin' };
    addBrand(newData);
    setNewBrand(newData);
  };
  return (
    <div>
      <input type="checkbox" id="add-brand" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box ">

          <form className="form-control w-full max-w-xs " onSubmit={handleSubmit(onSubmit)}>
            <label className="label">
              <span className="font-medium"> Name</span>
            </label>
            <label className="input-group input-group-vertical">
              <input
                type="text"
                placeholder="Brand Name"
                className="input input-bordered w-full max-w-xs font-medium"
                {...register('name', { required: true })}
              />
            </label>

            <label className="label">
              <span className="font-medium">Description</span>
            </label>
            <label className="input-group input-group-vertical">
              <input
                type="text"
                placeholder="Brand Details"
                className="input input-bordered w-full max-w-xs font-medium"
                {...register('description')}
              />
            </label>

            <label className="label">
              <span className="font-medium">Brand Email</span>
            </label>
            <label className="input-group input-group-vertical">
              <input
                type="text"
                placeholder="Brand Email"
                className="input input-bordered w-full max-w-xs font-medium"
                {...register('email')}
              />
            </label>

            <label className="label">
              <span className="font-medium">Brand Website</span>
            </label>
            <label className="input-group input-group-vertical">
              <input
                type="text"
                placeholder="Brand Website"
                className="input input-bordered w-full max-w-xs font-medium"
                {...register('website')}
              />
            </label>

            <label className="label">
              <span className="font-medium">Brand Official Address</span>
            </label>
            <label className="input-group input-group-vertical">
              <input
                type="text"
                placeholder="Brand Website"
                className="input input-bordered w-full max-w-xs font-medium"
                {...register('address')}
              />
            </label>
            <label className="label">
              <span className="font-medium">Status</span>
            </label>
            <select
              className="select input-bordered w-full max-w-xs"
              value="active"
              {...register('status')}
            >
              <option value="active">active</option>
              <option value="inactive">inactive</option>
            </select>
            <br />

            <input
              value="Submit"
              className="btn btn-accent btn-sm"
              type="submit"
            />
            <ToastContainer />
          </form>

          <div className="modal-action">
            <label htmlFor="add-brand" className="btn btn-sm ">
              <AiOutlineClose />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BrandModal;
