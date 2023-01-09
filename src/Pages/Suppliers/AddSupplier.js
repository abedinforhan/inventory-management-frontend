import React from 'react';

import Header from '../../components/Breadcrums/Header';
import AddProfile from '../../components/common/AddProfile';

function AddSupplier() {
  const routes = [
    {
      path: '/',
      title: 'Home'
    },
    {
      path: '/people/suppliers',
      title: 'Supplier List'
    },
    {
      path: '',
      title: 'View Supplier'
    }
  ];

  return (
    <div className="">
      <Header routes={routes} />
      <AddProfile />
    </div>

  );
}

export default AddSupplier;
