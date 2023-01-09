/* eslint-disable no-nested-ternary */
/* eslint-disable no-shadow */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import {
  AiFillDelete, AiFillEye, AiOutlineEdit, AiOutlineSearch
} from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import axios from '../../API/axios.config';
import Header from '../../components/Breadcrums/Header';
import DeleteModal from '../../components/common/DeleteModal';
import ViewModal from '../../components/common/ViewModal';
import Table from '../../components/PaginatedTable/Table';
import AddBrandModal from './AddBrandModal';
import EditBrandModal from './EditBrandModal';

function BrandList() {
  const navigate = useNavigate();
  const [addBrandModal, setAddBrandModal] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [item, setItem] = useState({});

  const routes = [
    {
      path: '/',
      title: 'Home'
    },
    {
      path: '/people/suppliers',
      title: 'Category'
    },
    {
      path: '',
      title: 'Add Category'
    }
  ];
  const [categories, setCategories] = useState([]);
  const [displayData, setDisplayData] = useState([]);

  // pagination
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  const handleEyeNavigate = (id) => {
    const url = `/people/supplier/supplier-details/${id}`;
    navigate(url);
  };

  // load categories from server
  const fetchBrands = async () => {
    const { data } = await axios.get(`/brand?page=${page}&limit=10`);
    setCategories(data?.data?.brands);
    setDisplayData(data?.data?.brands);
    setTotalPage(data?.data?.totalPage);
    setIsLoading(false);
  };

  const deleteBrand = async (id) => {
    try {
      setIsLoading(true);
      const { data } = await axios.delete(`/brand/${id}`);
      if (data.status === 'success') {
        toast.success(data.message);
      }
    } catch (error) {
      toast.error('Failed to delete');
    }
  };

  useEffect(() => {
    fetchBrands();
  }, [page, isLoading]);

  const tableHeader = [
    'No',
    'Name',
    'Email',
    'Description',
    'Action'
  ];

  const handleSearch = (e) => {
    const searchText = e.target.value.toLowerCase();
    const matchedResult = categories.filter((elem) => elem.name.toLowerCase().includes(searchText));
    setDisplayData(matchedResult);
  };

  const handleView = (item) => {
    setItem(item);
    setIsViewModalOpen(true);
  };

  const handleEdit = (item) => {
    setItem(item);
    setIsEditModalOpen(true);
  };

  const handleDelete = (item) => {
    setItem(item);
    setIsDeleteModalOpen(true);
  };

  return (
    <div className="">
      <AddBrandModal addBrandModal={addBrandModal} setAddBrandModal={setAddBrandModal} setIsLoading={setIsLoading} />
      <EditBrandModal
        setIsLoading={setIsLoading}
        item={item}
        setItem={setItem}
        isEditModalOpen={isEditModalOpen}
        setIsEditModalOpen={setIsEditModalOpen}
      />
      <ViewModal
        isModalOpen={isViewModalOpen}
        setIsModalOpen={setIsViewModalOpen}
        title="View Brand Details"
        data={item}
      />
      <DeleteModal
        setIsLoading={setIsLoading}
        isModalOpen={isDeleteModalOpen}
        setIsModalOpen={setIsDeleteModalOpen}
        handleDelete={deleteBrand}
        data={item}
      />
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
            <button type="button" onClick={() => setAddBrandModal(true)} className="btn btn-primary btn-wide">Add New Brnad</button>
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
                  {item?.name}
                </td>
                <td>
                  {item?.email}
                </td>
                <td>
                  {item?.description.slice(0, 25)}
                  ...
                </td>
                <td>
                  <div className="flex items-center gap-2">
                    <button type="button" onClick={() => handleView(item)}>
                      <AiFillEye
                        className="cursor-pointer"
                        size={20}
                      />
                    </button>
                    <button type="button" onClick={() => handleEdit(item)}>
                      <AiOutlineEdit
                        className="cursor-pointer"
                        size={20}
                      />
                    </button>
                    <button type="button" onClick={() => handleDelete(item)}>
                      <AiFillDelete
                        className="cursor-pointer"
                        size={20}
                      />
                    </button>
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

export default BrandList;
