/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function RegistrationPage() {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register, handleSubmit, watch, formState: { errors }
  } = useForm();
  const onSubmit = (data) => console.log(data);

  return (

    <form className="Main grid grid-cols-2" onSubmit={handleSubmit(onSubmit)}>
      <div className="Left w-10/12">
        <div className="form-control   w-full max-w-xs mb-1">
          <label className="label">
            <span className="label-text">
              First Name
              <span className="text-red-300 font-bold ml-1">*</span>
            </span>
          </label>
          <input
            type="text"
            placeholder="First Name"
            className="
           bg-white
            input
            input-bordered
            focus:outline-bold
            focus:border-none
            outline-[#054232]
            w-full max-w-xs"
            {...register('firstName', { required: true, maxLength: 20 })}
          />
          {errors.name && <span> This field is required</span>}
        </div>

        <div className="form-control   w-full max-w-xs mb-1">
          <label className="label">
            <span className="label-text">
              Last Name
              <span className="text-red-300 font-bold ml-1">*</span>
            </span>
          </label>
          <input
            type="text"
            placeholder="Last Name"
            className="
           bg-white
            input
            input-bordered
            focus:outline-bold
            focus:border-none
            outline-[#054232]
            w-full max-w-xs"
            {...register('lastName', { required: true, maxLength: 20 })}
          />
          {errors.name && <span> This field is required</span>}
        </div>

        <div className="form-control w-full max-w-xs mb-1 ">
          <label className="label">
            <span className="label-text">
              Email Address
              <span className="text-red-300 font-bold ml-1">*</span>
            </span>
          </label>
          <input
            type="email"
            placeholder="Type here"
            className="
          bg-white
          input
          input-bordered
          focus:outline-bold
          focus:border-none
          outline-[#054232]
          w-full max-w-xs"
            {...register('email', { required: true })}
          />
          {errors.email && <span> This field is required</span>}
        </div>

        <div className="form-control   w-full max-w-xs mb-1">
          <label className="label">
            <span className="label-text">
              Password
              <span className="text-red-300 font-bold ml-1">*</span>
            </span>
          </label>
          <input
            type="text"
            placeholder="First Name"
            className="
           bg-white
            input
            input-bordered
            focus:outline-bold
            focus:border-none
            outline-[#054232]
            w-full max-w-xs"
            {...register('firstName', { required: true, maxLength: 20 })}
          />
          {errors.name && <span> This field is required</span>}
        </div>

        <div className="form-control w-full max-w-xs mb-1 ">
          <label className="label">
            <span className="label-text">
              Personal Mobile No
              <span className="text-red-300 font-bold ml-1">*</span>
            </span>
          </label>
          <input
            type="text"
            placeholder="Type here"
            className="
        bg-white
        input
        input-bordered
        focus:outline-bold
        focus:border-none
        outline-[#054232]
        w-full max-w-xs"
            {...register('contactNumber', { required: true })}
          />
          {errors.contactNumber && <span> This field is required</span>}
        </div>

        <div className="form-control w-full max-w-xs mb-1">
          <label className="label">
            <span className="label-text">
              Emergency Contact No
              <span className="text-red-300 font-bold ml-1">*</span>
            </span>
          </label>
          <input
            type="text"
            placeholder="Type here"
            className="
    bg-white
    input
    input-bordered
    focus:outline-bold
    focus:border-none
    outline-[#054232]
    w-full max-w-xs"
            {...register('emergencyContactNumber', {
              required: true,
              maxLength: {
                value: 11,
                message: 'Contact Numbers can not be exceeded 11',
              },
            })}
          />
          {errors.emergencyContactNumber && (
            <span>
              {' '}
              {errors.emergencyContactNumber.message}
            </span>
          )}
        </div>

      </div>

      <div className="right">
        <div className="form-control w-full max-w-xs mb-1">
          <label className="label">
            <span className="label-text">
              Shipping Address
              <span className="text-red-300 font-bold ml-1">*</span>
            </span>
          </label>
          <input
            type="text"
            placeholder="Type here"
            className="
            bg-white
            input
            input-bordered
            focus:outline-bold
            focus:border-none
            outline-[#054232]
            w-full max-w-xs"
            {...register('shippingAddress')}
          />
        </div>

        <div className="form-control w-full max-w-xs mb-1">
          <label className="label">
            <span className="label-text">
              Division
              <span className="text-red-300 font-bold ml-1">*</span>
            </span>
          </label>
          <select
            {...register('brand')}
            className="
            select
            select-bordered
            focus:outline-bold
            focus:border-none
            outline-[#054232]
            bg-white
            w-full
            max-w-xs"
          >
            <option value="dhaka">Dhaka</option>
            <option value="chattogram">Chattogram</option>

          </select>
        </div>

        <div className="form-control w-full max-w-xs mb-1">
          <label className="label">
            <span className="label-text">
              Present Address
              <span className="text-red-300 font-bold ml-1">*</span>
            </span>
          </label>
          <input
            type="text"
            placeholder="Type here"
            className="
            bg-white
            input
            input-bordered
            focus:outline-bold
            focus:border-none
            outline-[#054232]
            w-full max-w-xs"
            {...register('presentAddress', { required: true })}
          />
          {errors.presentAddress && <span> This field is required</span>}
        </div>

        <div className="form-control w-full max-w-xs mb-1">
          <label className="label">
            <span className="label-text">
              Permanent Address
              <span className="text-red-300 font-bold ml-1">*</span>
            </span>
          </label>
          <input
            type="text"
            placeholder="Type here"
            className="
          bg-white
          input
          input-bordered
          focus:outline-bold
          focus:border-none
          outline-[#054232]
          w-full max-w-xs"
            {...register('permanentAddress', { required: true })}
          />
          {errors.permanentAddress && <span> This field is required</span>}
        </div>

        <button
          type="submit"
          className={`mt-2 btn btn-primary btn-sm cursor-pointer ${isLoading ? 'loading' : ''}`}
        >
          Sign Up
        </button>
      </div>
    </form>
  );
}
