/* eslint-disable no-useless-escape */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import ReactSelect from 'react-select';
import axios from '../../API/axios.config';
import CalenderIcon from '../../assets/icons/CalenderIcon';
import statusList from '../../data/statusLIst';
import useBranchList from '../../hooks/useBranchList';
import useBrandList from '../../hooks/useBrandList';
import { uploadSingleImage } from '../../utilities/uploadImage';
import validationOptions from '../../utilities/Validation';

function AddProfile() {
  const [brandList] = useBrandList();
  const [branchList] = useBranchList();
  const navigate = useNavigate();
  const [images, setImages] = useState({
    imageURL: '',
    nationalIdImageURL: ''
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
    }
  });

  const handleImageUpload = async (e) => {
    if (e.target.files.length) {
      const { name } = e.target;
      const imageURL = await uploadSingleImage(e.target.files[0]);
      images[name] = imageURL;
    }
  };

  const onSubmit = async (formData) => {
    const {
      gender,
      brandName,
      branchName,
      status
    } = formData || {};

    const postData = {
      ...formData,
      ...images,
      gender: gender?.value,
      brandName: brandName?.value,
      branchName: branchName?.value,
      status: status?.value,
      createdBy: 'Admin'
    };

    try {
      const { data } = await axios.post('/supplier', postData);
      if (data.status === 'success') {
        toast.success(data.message);
        navigate('/people/supplier-list');
      }
    } catch (error) {
      toast.error('Failed to update data');
    }
  };

  return (
    <div className="mt-10 mx-10 px-10 py-5 rounded bg-white">
      {/* Heading */}
      <h2 className="2xl from-neutral-focus">Add New Supplier</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Personal Information */}
        <div className="my-2 py-4 border-y">
          <h1 className="font-bold text-xl">Personal Information</h1>
        </div>
        <div className="w-full max-w-5xl mx-auto rounded-md p-3">
          <div className="flex flex-wrap w-full gap-y-3">
            <div className="w-1/2 flex flex-col gap-1 px-3">
              <label htmlFor="name" className="font-semibold">
                Name
              </label>
              <input
                id="name"
                className="im-input"
                type="text"
                name="name"
                {...register('name', validationOptions.name)}
              />
              <span className="text-green-600">
                {errors?.name && errors?.name?.message}
              </span>
            </div>

            <div className="w-1/2 flex flex-col gap-1 px-3">
              <label htmlFor="email" className="font-semibold">
                Email
              </label>
              <input
                id="email"
                className="im-input"
                type="text"
                name="email"
                {...register('email', validationOptions.email)}
              />
              <span className="text-green-600">
                {errors?.email && errors?.email?.message}
              </span>
            </div>

            <div className="w-1/2 flex flex-col gap-1 px-3">
              <label htmlFor="gender" className="font-semibold">
                Gender
              </label>
              <Controller
                name="gender"
                control={control}
                rules={validationOptions.gender}
                render={({ field }) => (
                  <ReactSelect
                    {...field}
                    options={[
                      { value: 'male', label: 'male' },
                      { value: 'female', label: 'female' },
                      { value: 'other', label: 'other' }
                    ]}
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
                {errors?.gender && errors?.gender?.message}
              </span>
            </div>

            <div className="w-1/2 flex flex-col gap-1 px-3">
              <label htmlFor="dateofBirth" className="font-semibold">
                Birth Date
              </label>
              <Controller
                control={control}
                name="dateOfBirth"
                rules={validationOptions.dateOfBirth}
                render={({ field }) => (
                  <div className="relative">
                    <div className="absolute top-[50%] right-5 -translate-y-[50%] z-10 pointer-events-none">
                      <CalenderIcon />
                    </div>
                    <ReactDatePicker
                      className="im-input w-full cursor-pointer"
                      placeholderText="Select date"
                      onChange={(e) => field.onChange(e)}
                      selected={field.value}
                    />
                  </div>
                )}
              />
            </div>

            <div className="w-1/2 flex flex-col gap-1 px-3">
              <label htmlFor="contactNo" className="font-semibold">
                Contact Number
              </label>
              <input
                id="contactNo"
                className="im-input"
                type="text"
                name="contactNo"
                {...register('contactNo', validationOptions?.contactNo)}
              />
              <span className="text-green-600">
                {errors?.contactNo && errors?.contactNo?.message}
              </span>
            </div>

            <div className="w-1/2 flex flex-col gap-1 px-3">
              <label htmlFor="emergencyContactNo" className="font-semibold">
                Emergency Contact Number
              </label>
              <input
                id="emergencyContactNo"
                className="im-input"
                type="text"
                name="emergencyContactNo"
                {...register('emergencyContactNo', validationOptions.emergencyContactNo)}
              />
              <span className="text-green-600">
                {errors?.emergencyContactNo && errors?.emergencyContactNo?.message}
              </span>
            </div>

            <div className="w-1/2 flex flex-col gap-1 px-3">
              <label htmlFor="presentAddress" className="font-semibold">
                Present Address
              </label>
              <input
                id="presentAddress"
                className="im-input"
                type="text"
                name="presentAddress"
                {...register('presentAddress', validationOptions?.presentAddress)}
              />
              <span className="text-green-600">
                {errors?.presentAddress && errors?.presentAddress?.message}
              </span>
            </div>

            <div className="w-1/2 flex flex-col gap-1 px-3">
              <label htmlFor="permanentAddress" className="font-semibold">
                Permanent Address
              </label>
              <input
                id="permanentAddress"
                className="im-input"
                type="text"
                name="permanentAddress"
                {...register('permanentAddress', validationOptions.permanentAddress)}
              />
              <span className="text-green-600">
                {errors?.permanentAddress && errors?.permanentAddress?.message}
              </span>
            </div>

            <div className="w-1/2 flex flex-col gap-1 px-3">
              <label htmlFor="name" className="font-semibold">
                National Id No
              </label>
              <input
                id="nationalIdNo"
                className="im-input"
                type="text"
                name="nationalIdNo"
                {...register('nationalIdNo', validationOptions?.nationalIdNo)}
              />
              <span className="text-green-600">
                {errors?.nationalIdNo && errors?.nationalIdNo?.message}
              </span>
            </div>

            <div className="w-1/2 flex flex-col gap-1 px-3">
              <label htmlFor="permanentAddress" className="font-semibold">
                Upload Your Image
              </label>
              <input
                id="imageURL"
                className="im-input py-2"
                type="file"
                name="imageURL"
                onChange={handleImageUpload}
              />
              <span className="text-green-600">
                {errors?.imageURL && errors?.imageURL?.message}
              </span>
            </div>

            <div className="w-1/2 flex flex-col gap-1 px-3">
              <label htmlFor="nationalIdImageURL" className="font-semibold">
                Upload Your National ID
              </label>
              <input
                id="nationalIdImageURL"
                className="im-input py-2"
                type="file"
                name="nationalIdImageURL"
                onChange={handleImageUpload}
              />
              <span className="text-green-600">
                {errors?.nationalIdImageURL && errors?.nationalIdImageURL?.message}
              </span>
            </div>
          </div>
        </div>

        {/* Official Information */}
        <div className="my-8 py-4 border-y">
          <h1 className="font-bold text-xl">Official  Information</h1>
        </div>
        <div className="w-full max-w-5xl mx-auto rounded-md p-3">
          <div className="flex flex-wrap w-full gap-y-3">

            <div className="w-1/2 flex flex-col gap-1 px-3">
              <label htmlFor="tradeLicenceNo" className="font-semibold">
                Trade Licence No
              </label>
              <input
                id="email"
                className="im-input"
                type="text"
                name="tradeLicenceNo"
                {...register('tradeLicenceNo', validationOptions.tradeLicenceNo)}
              />
              <span className="text-green-600">
                {errors?.tradeLicenceNo && errors?.tradeLicenceNo?.message}
              </span>
            </div>

            <div className="w-1/2 flex flex-col gap-1 px-3">
              <label htmlFor="brandName" className="font-semibold">
                Brand
              </label>
              <Controller
                name="brandName"
                control={control}
                rules={validationOptions.brandName}
                render={({ field }) => (
                  <ReactSelect
                    {...field}
                    options={brandList}
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
                {errors?.brandName && errors?.brandName?.message}
              </span>
            </div>

            <div className="w-1/2 flex flex-col gap-1 px-3">
              <label htmlFor="brand" className="font-semibold">
                Branch
              </label>
              <Controller
                name="branchName"
                control={control}
                rules={validationOptions?.branchName}
                render={({ field }) => (
                  <ReactSelect
                    {...field}
                    options={branchList}
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
                {errors?.branchName && errors?.branchName?.message}
              </span>
            </div>

            <div className="w-1/2 flex flex-col gap-1 px-3">
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

            <div className="w-full">
              <button
                className="btn btn-primary btn-block my-4"
                type="submit"
              >
                Save

              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddProfile;
