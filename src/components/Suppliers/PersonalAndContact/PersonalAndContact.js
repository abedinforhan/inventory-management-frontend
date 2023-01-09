import React, { useState } from 'react';
import useBranchList from '../../../hooks/useBranchList';
import useBrandList from '../../../hooks/useBrandList';
import EditPersonalAndContact from './EditPersonalAndContact';
import ViewPersonalAndContact from './ViewPersonalAndContact';

function PersonalAndContact({ supplierDetails, setSupplierDetails }) {
  const [brandList, setBrandList] = useBrandList();
  const [branchList, setBranchList] = useBranchList();

  const [inEditMode, setInEditMode] = useState(false);
  const handleEdit = () => {
    setInEditMode((prev) => !prev);
  };
  return (
    <div className="my-4">
      {
        inEditMode
          ? (
            <EditPersonalAndContact
              supplierDetails={supplierDetails}
              setSupplierDetails={setSupplierDetails}
              handleEdit={handleEdit}
              brandList={brandList}
              branchList={branchList}
            />
          )
          : (
            <ViewPersonalAndContact
              supplierDetails={supplierDetails}
              handleEdit={handleEdit}
            />
          )
      }
    </div>
  );
}

export default PersonalAndContact;
