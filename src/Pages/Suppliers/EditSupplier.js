/* eslint-disable no-useless-escape */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { HiOutlineCamera } from 'react-icons/hi';
import { useParams } from 'react-router-dom';
import ReactSelect from 'react-select';
import axios from '../../API/axios.config';
import CalenderIcon from '../../assets/icons/CalenderIcon';
import Header from '../../components/Breadcrums/Header';
import statusList from '../../data/statusLIst';
import useBranchList from '../../hooks/useBranchList';
import useBrandList from '../../hooks/useBrandList';
import { editSuplieRoutes } from '../../Routes/BreadCrumbs';
import { uploadSingleImage } from '../../utilities/uploadImage';
import validationOptions from '../../utilities/Validation';

function EditSupplier() {
  const [brandList] = useBrandList();
  const [branchList] = useBranchList();
  const [supplier, setSupplier] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
    }
  });

  const fetchSupplierData = async () => {
    const { data } = await axios.get(`/supplier/${id}`);
    setSupplier(data?.data);
    const {
      gender, dateOfBirth, brandName, branchName, status
    } = data.data;

    reset({
      ...data?.data,
      gender: { label: gender, value: gender },
      dateOfBirth: new Date(),
      brandName: { label: brandName, value: brandName },
      branchName: { label: branchName, value: branchName },
      status: { label: status, value: status },
    });
    setIsLoading(false);
  };

  useEffect(() => {
    fetchSupplierData();
  }, [id, reset, isLoading]);

  const updateProfileImage = async (e) => {
    const { files } = e.target;
    if (files.length) {
      const imageURL = await uploadSingleImage(files[0]);
      const postData = { imageURL };
      try {
        const { data } = await axios.put(`/supplier/${id}`, postData);
        if (data.status === 'success') {
          toast.success(data.message);
          setIsLoading(true);
        }
      } catch (error) {
        toast.error('Failed to update data');
      }
    }
  };

  const onSubmit = async (formData) => {
    const {
      gender,
      brandName,
      branchName,
      status
    } = formData || {};

    const nationalIdImageURL = '';

    // if (formData?.nationalIdImageURL?.length) {
    //   nationalIdImageURL = await uploadSingleImage(formData.nationalIdImageURL[0]);
    // }

    const postData = {
      ...formData,
      gender: gender?.value,
      brandName: brandName?.value,
      branchName: branchName?.value,
      status: status?.value,
    };

    try {
      const { data } = await axios.put(`/supplier/${id}`, postData);
      if (data.status === 'success') {
        toast.success(data.message);
      }
    } catch (error) {
      toast.error('Failed to update data');
    }
  };
  return (
    <div className="">
      <Header routes={editSuplieRoutes} />

      <div className="mt-10 mx-10 px-10 py-5 rounded bg-white">
        <div className="flex justify-between">
          <div className="flex items-center">
            <div className="relative border rounded-full">
              <div className="avatar">
                <div className="w-24 rounded-full  m-2">
                  <img src={supplier?.imageURL} alt="profile" />

                </div>
              </div>
              <div className="absolute -bottom-2  -right-1 z-100">
                <label htmlFor="file">
                  <HiOutlineCamera className="text-gray-500 cursor-pointer" size={22} />
                </label>
                <input id="file" type="file" className="h-0 w-0" onChange={(e) => updateProfileImage(e)} />
              </div>
            </div>
            <div className="ml-4">
              <p className="font-semibold capitalize">{supplier?.name}</p>
              <p className="text-gray-500">
                {supplier?.brandName}
                ,Supplier
              </p>
            </div>
          </div>
          <div />
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Personal Information */}
          <div className="my-8 py-4 border-y">
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
                  {...register('permanentAddress')}
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

    </div>

  );
}

export default EditSupplier;
