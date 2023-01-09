import React from 'react';
import { MdEdit } from 'react-icons/md';
import DataBox from '../../common/DataBox';

function ViewPersonalAndContact({ supplierDetails, handleEdit }) {
  const {
    name,
    gender,
    presentAddress,
    permanentAddress,
    email,
    contactNumber,
    emergencyContactNumber,
  } = supplierDetails;
  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-medium">Personal Data</h1>
        <MdEdit
          size={18}
          className="cursor-pointer"
          onClick={handleEdit}
        />
      </div>

      <div className="font-medium">
        <DataBox title="Full Name" value={name} />
        <div className="grid grid-cols-2 gap-10">
          <DataBox title="Gender" value={gender} />
          <DataBox title="Birthday" value={name} />
        </div>
        <DataBox title="Present Address" value={presentAddress} />
        <DataBox title="Permanent Address" value={permanentAddress} />
      </div>

      <div className="flex items-center justify-between">
        <h1 className="font-medium">Contact Data</h1>
        <MdEdit
          size={18}
          className="cursor-pointer"
          onClick={handleEdit}
        />
      </div>

      <div className="font-medium">
        <DataBox title="Email" value={email} />
        <div className="grid grid-cols-2 gap-10">
          <DataBox title="Contact No" value={contactNumber} />
          <DataBox title="Emergency Contact No" value={emergencyContactNumber} />
        </div>
      </div>
    </div>
  );
}

export default ViewPersonalAndContact;
