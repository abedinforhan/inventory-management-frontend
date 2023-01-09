/* eslint-disable no-nested-ternary */
/* eslint-disable no-shadow */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import {
  AiFillDelete, AiOutlineEdit, AiOutlineSearch
} from 'react-icons/ai';
import axios from '../../API/axios.config';
import Header from '../../components/Breadcrums/Header';
import Table from '../../components/PaginatedTable/Table';
import AddCategoryModal from './AddCategoryModal';
import EditCategoryModal from './EditCategoryModal';

function CategoryList() {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [item, setItem] = useState({});
  const [categories, setCategories] = useState([]);
  const [displayData, setDisplayData] = useState([]);
  // pagination
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  const routes = [
    {
      path: '/',
      title: 'Home'
    },
    {
      path: '',
      title: 'Category List'
    }
  ];

  // fetch categories from server
  const fetchCategories = async () => {
    const { data } = await axios.get(`/category?page=${page}&limit=10`);
    setCategories(data?.data?.categories);
    setDisplayData(data?.data?.categories);
    setTotalPage(data?.data?.totalPage);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchCategories();
  }, [page, isLoading]);

  const tableHeader = [
    'No',
    'Name',
    'Description',
    'Created By',
    'Action'
  ];

  const handleSearch = (e) => {
    const searchText = e.target.value.toLowerCase();
    const matchedResult = categories.filter((elem) => elem.name.toLowerCase().includes(searchText));
    setDisplayData(matchedResult);
  };

  const handleUpdate = (data) => {
    setItem(data);
    setIsEditModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(`/category/${id}`);
      toast.success('Successfuly deleted');
      setIsLoading(!isLoading);
    } catch (error) {
      toast.error(error.message);
    }
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
            <button type="button" onClick={() => setIsOpen(true)} className="btn btn-primary btn-wide">
              Add New Category
            </button>
            <AddCategoryModal
              isAddModalOpen={isOpen}
              setIsAddModalOpen={setIsOpen}
              setIsLoading={setIsLoading}
            />
            <EditCategoryModal
              isEditModalOpen={isEditModalOpen}
              setIsEditModalOpen={setIsEditModalOpen}
              isLoading={isLoading}
              item={item}
              setItem={setItem}
              setIsLoading={setIsLoading}
            />
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
                  {item?.description}
                </td>
                <td>
                  {item?.createdBy}
                </td>
                <td>
                  <div className="flex items-center gap-2">
                    <button type="button" onClick={() => handleUpdate(item)}>
                      <AiOutlineEdit
                        className="cursor-pointer"
                        size={20}
                      />
                    </button>
                    <button type="button" onClick={() => handleDelete(item._id)}>
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

export default CategoryList;
