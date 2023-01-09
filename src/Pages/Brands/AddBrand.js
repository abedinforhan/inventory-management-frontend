/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
// external toastify
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from '../../API/axios.config';

function AddBrand() {
  const [brand, setBrand] = useState({});

  const notify = (message) => toast.success(message, {
    position: 'bottom-center',
    autoClose: 5001,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'dark',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBrand((values) => (
      { ...values, [name]: value, createdBy: 'admin' }
    ));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/brand', brand);
      notify(data?.message);
    } catch (err) {
      console.log(err, 'error');
    }
  };

  return (
    <div className="mt-12 w-11/12 flex justify-center  border-4 border-red-100 bg-white">

      <div className="w-11/12">
        <div className="p-10 flex items-center justify-end">
          <div className="flex flex-col items-end">
            <p className="font-bold">Add Brand</p>
            <p>Add Brand For Products</p>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text font-bold ">Brand Name</span>
          </label>
          <input
            type="text"
            name="name"
            placeholder="Type Name"
            value={brand.value}
            className="input input-bordered w-full max-w-xs"
            onChange={handleChange}
          />
          {' '}
          <br />
          <label className="label">
            <span className="label-text font-bold">Brand Details</span>

          </label>
          <textarea
            className="textarea textarea-bordered h-24"
            name="description"
            placeholder="Type Details"
            value={brand.value}
            onChange={handleChange}
          />
          <div className="mt-3">
            <button
              type="submit"
              className="btn btn-accent text-white-300"
            >
              Submit
            </button>
            <ToastContainer
              position="top-center"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
          </div>
        </form>

      </div>

    </div>
  );
}

export default AddBrand;
