/* eslint-disable no-nested-ternary */
/* eslint-disable no-shadow */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */

import React, { useEffect, useState } from 'react';
import {
  AiFillDelete,
  AiFillEye, AiOutlineEdit, AiOutlinePlus, AiOutlineSearch
} from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import axios from '../../API/axios.config';
import Header from '../../components/Breadcrums/Header';
import Table from '../../components/PaginatedTable/Table';

function SuplierList() {
  const routes = [
    {
      path: '/',
      title: 'Home'
    },
    {
      path: '',
      title: 'Supplier List'
    }
  ];
  // navigation
  const navigate = useNavigate();

  // save suppliers from server
  const [suppliers, setSuppliers] = useState([]);
  // display data based on search
  const [displayData, setDisplayData] = useState([]);

  // pagination
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  // load suppliers from server
  const fetchSuppliers = async () => {
    const { data } = await axios.get(`/supplier?page=${page}&limit=10`);
    if (data?.status === 'success') {
      setSuppliers(data?.data?.suppliers);
      setDisplayData(data?.data?.suppliers);
      setTotalPage(data?.data?.totalPage);
    }
  };

  useEffect(() => {
    fetchSuppliers();
  }, [page]);

  const tableHeader = [
    'No',
    'Name',
    'Brand',
    'Email',
    'Contact',
  ];

  const handleSearch = (e) => {
    const searchText = e.target.value.toLowerCase();
    const matchedResult = suppliers.filter((elem) => elem.name.toLowerCase().includes(searchText));
    setDisplayData(matchedResult);
  };

  const handleAddNavigate = () => {
    const url = '/people/supplier/add-supplier';
    navigate(url);
  };

  const handleEyeNavigate = (id) => {
    const url = `/people/supplier/view-supplier/${id}`;
    navigate(url);
  };

  const handleEditNavigate = (id) => {
    const url = `/people/supplier/edit-supplier/${id}`;
    navigate(url);
  };

  return (
    <div className="">
      <Header routes={routes} />
      <div className="mt-10 mx-10 px-10 py-5 rounded bg-white">
        <div className="flex justify-between">
          <div className="relative w-60 h-12">
            <input
              type="text"
              placeholder="Search..."
              className="input input-bordered bg-white
              focus:outline-offset-0 focus:outline-black w-full"
              onChange={(e) => handleSearch(e)}
            />
            <AiOutlineSearch
              size={32}
              className="absolute right-0 top-3 pr-2"
            />
          </div>
          <div>
            <button
              onClick={handleAddNavigate}
              type="button"
              className="btn btn-primary btn-wide"
            >
              Add Supplier
              <AiOutlinePlus size={16} className="text-white ml-2" />
            </button>
          </div>
        </div>

        <Table
          header={tableHeader}
          totalPage={totalPage}
          page={page}
          setPage={setPage}
        >
          {
            displayData?.map((item, idx) => (
              <tr key={item?._id}>
                <td>{idx + 1}</td>
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-circle w-12 h-12">
                        <img src={item?.imageURL} alt="Avatar Tailwind CSS Component" />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{item?.name}</div>
                    </div>
                  </div>
                </td>
                <td>
                  {item?.brandName}
                </td>
                <td>
                  {item?.email}
                </td>
                <td>
                  <div className="flex items-center gap-2">
                    <label htmlFor="supplier-details" className=" modal-button">
                      <AiFillEye
                        className="cursor-pointer"
                        size={20}
                        onClick={() => handleEyeNavigate(item._id)}
                      />
                    </label>
                    <AiOutlineEdit
                      onClick={() => handleEditNavigate(item._id)}
                      className="cursor-pointer"
                      size={20}
                    />
                    <AiFillDelete
                      className="cursor-pointer"
                      size={20}
                    />
                  </div>
                </td>

              </tr>
            ))
          }
        </Table>
      </div>
    </div>
  );
}

export default SuplierList;
