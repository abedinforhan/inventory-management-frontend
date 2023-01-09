import React from 'react';
import { FiEdit } from 'react-icons/fi';
import { useNavigate, useParams } from 'react-router-dom';

function ViewProfile({
  name, designation, company, personalData, officialData, imageURL, nationalIdImageURL
}) {
  const { id } = useParams();
  const navigate = useNavigate();
  const personalDataArray = Object.entries(personalData);
  const officialDataArray = Object.entries(officialData);

  const personalInformation = personalDataArray.map((item) => ({ heading: item[0], content: item[1] }));

  const officialInformation = officialDataArray.map((item) => ({ heading: item[0], content: item[1] }));

  const handleEditNavigate = () => {
    navigate(`/people/supplier/edit-supplier/${id}`);
  };

  return (
    <div className="mt-10 mx-10 px-10 py-5 rounded bg-white">
      {/* Heading */}
      <div className="flex justify-between">
        <div className="flex items-center">
          <div className="avatar">
            <div className="w-24 rounded-full">
              <img src={imageURL} alt="profile" />
            </div>
          </div>
          <div className="ml-4">
            <p className="font-semibold capitalize">{name}</p>
            <p className="text-gray-500">
              {company}
              ,
              {designation}
            </p>
          </div>
        </div>
        <div>
          <button type="button" onClick={() => handleEditNavigate()}>
            <FiEdit size={22} />
          </button>
        </div>
      </div>

      {/* Personal Information */}
      <div className="my-8 py-4 border-y">
        <h1 className="font-bold text-xl">Personal Information</h1>
      </div>
      <div className="grid grid-cols-12">
        <div className="col-span-9">
          {
            personalInformation.map(({ heading, content }) => (
              <div className="grid grid-cols-12 my-4">
                <div className="col-span-6 font-semibold">
                  {heading}
                </div>
                <div className="col-span-6 capitalize">
                  :
                  {content}
                </div>
              </div>
            ))
          }
        </div>
        <div className="col-span-3" />
      </div>

      {/* Official Information */}
      <div className="my-8 py-4 border-y">
        <h1 className="font-bold text-xl"> Official  Information</h1>
      </div>
      <div className="grid grid-cols-12">
        <div className="col-span-9">
          {
            officialInformation.map(({ heading, content }) => (
              <div className="grid grid-cols-12 my-4">
                <div className="col-span-6 font-semibold">
                  {heading}
                </div>
                <div className="col-span-6 capitalize">
                  :
                  {content}
                </div>
              </div>
            ))
          }
        </div>
        <div className="col-span-3">
          <img className="h-60 w-60" src={imageURL} alt="profile" />
        </div>
      </div>

    </div>
  );
}

export default ViewProfile;
