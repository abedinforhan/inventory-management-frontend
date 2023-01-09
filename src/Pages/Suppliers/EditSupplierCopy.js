/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import { Controller, useForm } from 'react-hook-form';
import { AiFillCalendar } from 'react-icons/ai';
import { useNavigate, useParams } from 'react-router-dom';
import ReactSelect from 'react-select';
import swal from 'sweetalert';
import axios from '../../API/axios.config';
import Header from '../../components/Breadcrums/Header';
import genderList from '../../data/genderList';
import statusList from '../../data/statusLIst';
import useBranchList from '../../hooks/useBranchList';
import useBrandList from '../../hooks/useBrandList';

function EditSupplier() {
  const [brandList, setBrandList] = useBrandList();
  const [branchList, setBranchList] = useBranchList();
  const [supplier, setSupplier] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  const selectStyle = {
    control: (styles) => ({
      ...styles,
      backgroundColor: 'white',
      height: '3rem',
      borderRadius: '5px',
      padding: '0 1rem',

    })
  };

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
    watch
  } = useForm({
    mode: 'onChange'
  });

  const fetchSupplierData = async () => {
    const { data } = await axios.get(`/supplier/${id}`);
    const {
      gender, dateOfBirth, brandName, branchName, status
    } = data.data;

    reset({
      ...data?.data,
      gender: { label: gender, value: gender },
      dateOfBirth: new Date(dateOfBirth),
      brandName: { label: brandName, value: brandName },
      branchName: { label: branchName, value: branchName },
      status: { label: status, value: status },

    });
    setSupplier(data?.data);
  };

  useEffect(() => {
    fetchSupplierData();
  }, [id, reset]);

  const routes = [
    {
      path: '/',
      title: 'Home'
    },
    {
      path: '/people/suppliers',
      title: 'Suppliers'
    },
    {
      path: '',
      title: 'Add Supplier'
    }
  ];

  const onSubmit = async (formData) => {
    const {
      name,
      email,
      gender,
      dateOfBirth,
      contactNo,
      emergencyContactNo,
      presentAddress,
      permanentAddress,
      brandName,
      branchName,
      nationalIdNo,
      tradeLicenceNo,
      status
    } = formData;
    const imageURL = '';
    const nationalIdImageURL = '';

    // if (formData?.imageURL?.length) {
    //   imageURL = await uploadSingleImage(formData.imageURL[0]);
    // }
    // if (formData?.nationalIdImageURL?.length) {
    //   nationalIdImageURL = await uploadSingleImage(formData.nationalIdImageURL[0]);
    // }

    const postData = {
      email,
      contactNo,
      emergencyContactNo,
      presentAddress,
      permanentAddress,
      nationalIdNo,
      tradeLicenceNo,
      gender: gender?.value,
      brandName: brandName?.value,
      branchName: branchName?.value,
      status: status?.value,
    };

    try {
      const { data } = await axios.put(`/supplier/${id}`, postData);

      if (data.status === 'success') {
        swal({
          title: data?.status,
          text: data?.message,
          icon: 'success',
        });
      }
    } catch (error) {
      swal({
        title: error?.response?.data?.status,
        text: error?.response?.data?.message,
        icon: 'error',
      });
    }
  };

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
    email: { required: 'Email is required' },
    password: {
      required: 'Password is required',
      minLength: {
        value: 8,
        message: 'Password must have at least 8 characters'
      }
    },
    gender: {
      required: 'Gender is required'
    },
    dateOfBirth: {
      required: false
    },
    contactNo: {
      required: 'Contact Number is required',
      pattern: {
        value: /^\d+$/,
        message: 'Numbers only '
      },
      minLength: {
        value: 11,
        message: 'Contact  must have at least 11 characters'
      },

    },
    emergencyContactNo: {
      required: 'Contact Number is required',
      pattern: {
        value: /^\d+$/,
        message: 'Numbers only '
      },
      minLength: {
        value: 11,
        message: 'Contact must have at least 11 characters'
      }
    },
    presentAddress: {
      required: false,
      maxLength: {
        value: 50,
        message: 'Address Can not exceed 50 characters '
      }
    },
    permanentAddress: {
      required: false,
      maxLength: {
        value: 50,
        message: 'Address Can not exceed 50 characters '
      }
    },
    brandName: {
      required: 'Brand is required',
    },
    branchName: {
      required: 'Branch is required',
    },
    nationalIdNo: {
      required: 'Please Provide National Id Number',
    },
    tradeLicenceNo: {
      required: 'Please provide Trade Licence  Number',
    },
    imageURL: {
      required: false,
    },
    nationalIdImageURL: {
      required: false
    },
    status: {
      required: 'Status is required'
    }
  };

  return (
    <div className="">
      <Header routes={routes} />

      <div className="mt-10 mx-10 px-10 py-5 rounded bg-white">
        <h2 className="font-medium text-2xl my-4">Edit Supplier</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-8 ">

            <div className="w-full">
              <label className="label">
                <span className="">Name </span>
              </label>
              <input
                type="text"
                placeholder="Enter Your Name"
                className="input input-bordered  w-full  bg-white
              focus:outline-offset-0 focus:outline-black "
                {...register('name', registerOptions.name)}
              />
              <span className="text-green-600">
                {errors?.name && errors?.name?.message}
              </span>
            </div>
            <div className="w-full">
              <label className="label">
                <span className="">Email Address</span>
              </label>
              <input
                type="email"
                placeholder="Enter Your Name"
                className="input input-bordered  w-full  bg-white
              focus:outline-offset-0 focus:outline-black "
                {...register('email', registerOptions.email)}
              />
              <span className="text-green-600">
                {errors?.email && errors?.email?.message}
              </span>
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="">Gender</span>
              </label>
              <Controller
                name="gender"
                control={control}
                rules={registerOptions.gender}
                render={({ field }) => (
                  <ReactSelect
                    isClearable
                    {...field}
                    options={genderList}
                    styles={selectStyle}
                  />
                )}
              />
              <span className="text-green-600">
                {errors?.gender && errors?.gender?.message}
              </span>
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="">Date of Birth</span>
              </label>
              <div className="flex items-center ">
                <Controller
                  control={control}
                  name="dateOfBirth"
                  render={({ field }) => (
                    <ReactDatePicker
                      className="input input-bordered  w-full bg-white
                    focus:outline-offset-0 focus:outline-black"
                      placeholderText="Select date"
                      onChange={(e) => field.onChange(e)}
                      // selected={field.value}
                      peekNextMonth
                      showMonthDropdown
                      showYearDropdown
                      dropdownMode="select"
                    />

                  )}
                />
                <AiFillCalendar size={24} />
                {' '}
                *
              </div>
              <span className="text-green-600">
                {errors?.dateOfBirth && errors?.dateOfBirth?.message}
              </span>
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="">Contact Number</span>
              </label>
              <input
                type="text"
                placeholder="Enter Your Name"
                className="input input-bordered  w-full  bg-white
              focus:outline-offset-0 focus:outline-black "
                {...register('contactNo', registerOptions.contactNo)}
              />
              <span className="text-green-600">
                {errors?.contactNo && errors?.contactNo?.message}
              </span>
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="">Emergency Contact Number</span>
              </label>
              <input
                type="text"
                placeholder="Enter Your AEmergency Contact No"
                className="input input-bordered  w-full  bg-white
              focus:outline-offset-0 focus:outline-black "
                {...register('emergencyContactNo', registerOptions.emergencyContactNo)}
              />
              <span className="text-green-600">
                {errors?.emergencyContactNo && errors?.emergencyContactNo?.message}
              </span>
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="">Present Address</span>
              </label>
              <textarea
                className="textarea textarea-bordered h-24 bg-white  focus:outline-offset-0 focus:outline-black"
                placeholder="Present Address"
                {...register('presentAddress', registerOptions.presentAddress)}
              />
              <span className="text-green-600">
                {errors?.presentAddress && errors?.presentAddress?.message}
              </span>
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="">Permanent Address</span>
              </label>
              <textarea
                className="textarea textarea-bordered h-24 bg-white  focus:outline-offset-0 focus:outline-black"
                placeholder="Present Address"
                {...register('permanentAddress', registerOptions.permanentAddress)}
              />
              <span className="text-green-600">
                {errors?.permanentAddress && errors?.permanentAddress?.message}
              </span>
            </div>

            <div className="form-control w-full">
              <label className="label font-semibold">
                <span className="">Brand</span>
              </label>
              <Controller
                name="brandName"
                rules={registerOptions.brandName}
                control={control}
                render={({ field }) => (
                  <ReactSelect
                    isClearable
                    {...field}
                    options={brandList}
                    styles={selectStyle}
                  />
                )}
              />
              <span className="text-green-600">
                {errors?.brandName && errors?.brandName?.message}
              </span>
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="">Branch</span>
              </label>
              <Controller
                name="branchName"
                rules={registerOptions.branchName}
                control={control}
                render={({ field }) => (
                  <ReactSelect
                    isClearable
                    {...field}
                    options={branchList}
                    styles={selectStyle}
                  />
                )}
              />
              <span className="text-green-600">
                {errors?.branchName && errors?.branchName?.message}
              </span>
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="">National Id No </span>
              </label>
              <input
                type="text"
                placeholder="Enter Your National ID No"
                className="input input-bordered  w-full  bg-white
              focus:outline-offset-0 focus:outline-black "
                {...register('nationalIdNo', registerOptions.nationalIdNo)}
              />
              <span className="text-green-600">
                {errors?.nationalIdNo && errors?.nationalIdNo?.message}
              </span>
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="">Trade Licence No </span>
              </label>
              <input
                type="text"
                placeholder="Enter Your Name"
                className="input input-bordered  w-full  bg-white
              focus:outline-offset-0 focus:outline-black "
                {...register('tradeLicenceNo', registerOptions.tradeLicenceNo)}
              />
              <span className="text-green-600">
                {errors?.tradeLicenceNo && errors?.tradeLicenceNo?.message}
              </span>
            </div>

            {/* <div className="form-control w-full">
              <label className="label">
                <span className="">Upload Profile Image</span>
              </label>
              <input
                type="file"
                className="input input-bordered  w-full  bg-white
              focus:outline-offset-0 focus:outline-black py-2"
                {...register('imageURL', registerOptions.imageURL)}
              />
              <span className="text-green-600">
                {errors?.imageURL && errors?.imageURL?.message}
              </span>
            </div> */}

            {/* <div className="form-control w-full">
              <label className="label">
                <span className="">Upload National ID Card</span>
              </label>
              <input
                type="file"
                className="input input-bordered  w-full  bg-white
              focus:outline-offset-0 focus:outline-black py-2 "
                {...register('nationalIdImageURL', registerOptions.nationalIdImageURL)}
              />
              <span className="text-green-600">
                {errors?.inationalIdImageURL && errors?.nationalIdImageURL?.message}
              </span>
            </div> */}

            <div className="form-control w-full">
              <label className="label">
                <span className="">Status</span>
              </label>
              <Controller
                name="status"
                rules={registerOptions.status}
                control={control}
                render={({ field }) => (
                  <ReactSelect
                    isClearable
                    {...field}
                    options={statusList}
                    styles={selectStyle}
                  />
                )}
              />
              <span className="text-green-600">
                {errors?.status && errors?.status?.message}
              </span>
            </div>
          </div>

          <div>
            <button type="submit" className="btn btn-block btn-primary my-10">ADD</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditSupplier;
