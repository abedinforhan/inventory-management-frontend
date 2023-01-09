import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from '../../../API/axios.config';
import Button from '../../common/Button';
import Input from '../../common/Input';
import Select from '../../common/Select';

function EditPersonalAndContact({
  supplierDetails, setSupplierDetails, brandList, branchList
}) {
  const {
    _id,
    name,
    gender,
    presentAddress,
    permanentAddress,
    email,
    contactNumber,
    emergencyContactNumber,
    brand,
    branch,
    tradeLicenceNumber
  } = supplierDetails;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name,
      gender,
      presentAddress,
      permanentAddress,
      email,
      contactNumber,
      emergencyContactNumber,
      brand: brand.name,
      branch,
      tradeLicenceNumber
    },
  });
  const [options, setOptions] = useState(['female', 'male', 'others']);

  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const updateSupplierData = async (updatedData) => {
    const url = `/supplier/${_id}`;
    const { data } = await axios.put(url, updatedData);

    if (data.status === 'success') {
      setIsLoading(false);
      setIsDisabled(true);
      setSupplierDetails(data?.data);
    }
  };

  const onSubmit = (formData) => {
    setIsLoading(true);
    updateSupplierData(formData);
  };
  console.log(_id);
  return (
    <form
      className="font-medium"
      onSubmit={handleSubmit(onSubmit)}
    >

      <Input
        type="text"
        placeholder="Enter Name"
        title="Full Name"
        registerTitle="name"
        register={register}
        errors={errors}
        required="true"
      />
      <div className="grid grid-cols-2 gap-10">
        <Select
          title="Brand"
          registerTitle="brand"
          register={register}
          errors={errors}
          required
          options={brandList}
        />
        <Select
          title="Branch"
          registerTitle="branch"
          register={register}
          errors={errors}
          required
          options={branchList}
        />
      </div>
      <div className="grid grid-cols-2 gap-10">
        <Select
          title="Gender"
          registerTitle="gender"
          register={register}
          errors={errors}
          required
          options={options}
        />
        <Select
          title="Birthday"
          registerTitle="birthday"
          register={register}
          errors={errors}
          required={false}
          options={options}
        />

      </div>
      <Input
        type="text"
        placeholder="Enter Present Address"
        title="Present Address"
        registerTitle="presentAddress"
        register={register}
        errors={errors}
        required="true"
      />
      <Input
        type="text"
        placeholder="Enter Permanent Address"
        title="Permanent  Address"
        registerTitle="permanentAddress"
        register={register}
        errors={errors}
        required="true"
      />
      <Input
        type="email"
        placeholder="Enter Email "
        title="Email Address"
        registerTitle="email"
        register={register}
        errors={errors}
        required="true"
      />
      <div className="grid grid-cols-2 gap-10">
        <Input
          type="text"
          placeholder="Enter Your Contact Number "
          title="Contact No"
          registerTitle="contactNumber"
          register={register}
          errors={errors}
          required="true"
        />
        <Input
          type="text"
          placeholder="Enter Your Emergency Contact Number "
          title="Emergency Contact No No"
          registerTitle="emergencyContactNumber"
          register={register}
          errors={errors}
          required="true"
        />

      </div>
      <Input
        type="text"
        placeholder=""
        title="Trade Licence Number"
        registerTitle="tradeLicenceNumber"
        register={register}
        errors={errors}
        required="true"
      />
      <Button
        title="Update"
        type="submit"
        isLoading={isLoading}
        isDisabled={isDisabled}
      />
    </form>

  );
}

export default EditPersonalAndContact;
