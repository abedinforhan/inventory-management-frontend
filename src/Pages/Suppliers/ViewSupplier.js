import React, { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';
import axios from '../../API/axios.config';
import Header from '../../components/Breadcrums/Header';
import ViewProfile from '../../components/common/ViewProfile';

function ViewSupplier() {
  const [supplier, setSupplier] = useState({});

  const {
    name,
    email,
    gender,
    contactNo,
    emergencyContactNo,
    presentAddress,
    permanentAddress,
    nationalIdNo,
    tradeLicenceNo,
    brandName,
    branchName,
    status,
    imageURL,
    nationalIdImageURL,
    createdBy,
  } = supplier || {};

  const personalData = {
    Name: name,
    Email: email,
    Gender: gender,
    'Contact No': contactNo,
    'Emergency Contact NO': emergencyContactNo,
    'Present Address': presentAddress,
    'Permanent Address': permanentAddress
  };

  const officialData = {
    'National ID No': nationalIdNo,
    'Trade Licence No': tradeLicenceNo,
    Brand: brandName,
    Branch: branchName,
    Status: status,
    'Created By': createdBy

  };

  const routes = [
    {
      path: '/',
      title: 'Home'
    },
    {
      path: '/people/supplier-list',
      title: 'Supplier List'
    },
    {
      path: '',
      title: 'View Supplier'
    }
  ];

  const { id } = useParams();
  const fetchSupplierData = async () => {
    const { data } = await axios.get(`/supplier/${id}`);
    setSupplier(data?.data);
  };

  useEffect(() => {
    fetchSupplierData();
  }, [id]);

  return (
    <div className="">
      <Header routes={routes} />
      <ViewProfile
        name={supplier?.name}
        designation="Supplier"
        company={supplier?.brandName}
        personalData={personalData}
        officialData={officialData}
        imageURL={imageURL}
        nationalIdImageURL={nationalIdImageURL}
      />
    </div>

  );
}

export default ViewSupplier;
