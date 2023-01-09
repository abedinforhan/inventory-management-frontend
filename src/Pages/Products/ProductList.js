/* eslint-disable no-nested-ternary */
/* eslint-disable no-shadow */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */

import React, { useEffect, useState } from 'react';
import {
  AiFillDelete,
  AiFillEye, AiOutlineEdit, AiOutlineSearch
} from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import ReactSelect from 'react-select';
import axios from '../../API/axios.config';
import Header from '../../components/Breadcrums/Header';
import Table from '../../components/PaginatedTable/Table';
import useBrandList from '../../hooks/useBrandList';
import useCategoryList from '../../hooks/useCategoryList';
import { productListRoutes } from '../../Routes/BreadCrumbs';

function ProductList() {
  const navigate = useNavigate();
  const [categories, setCategories] = useCategoryList();
  const [brands, setBrands] = useBrandList();
  const [products, setProducts] = useState([]);
  const [displayData, setDisplayData] = useState([]);

  const [filters, setFilters] = useState({
    category: '',
    brandName: ''
  });
  // pagination
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  const fetchProucts = async (searchText) => {
    let url = `/product/?page=${page}&limit=10`;

    if (searchText) {
      url += `&search=${searchText}`;
    }
    if (filters.category) {
      url += `&category=${filters.category}`;
      console.log(url);
    }

    if (filters.brandName) {
      url += `&brandName=${filters.brandName}`;
    }
    try {
      const { data } = await axios.get(url);

      if (data?.status === 'success') {
        setProducts(data?.data?.products);
        setDisplayData(data?.data?.products);
        setTotalPage(data?.data?.totalPage);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProucts();
  }, [page, filters.brandName, filters.category]);

  const tableHeader = [
    'No',
    '',
    'Name',
    'Category',
    'Brand',
    'Unit'
  ];

  const handleSearch = (text) => {
    const searchText = text.toLowerCase();
    fetchProucts(searchText);
  };

  const handleSelectCategory = ({ value }) => {
    if (!value) {
      console.log('no');
    }
    setFilters((prev) => ({ ...prev, category: value.toLowerCase() }));
  };
  const handleSelectBrand = ({ value }) => {
    setFilters((prev) => ({ ...prev, brandName: value }));
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

  const customeStyle = {
    option: (baseStyles, state) => ({
      ...baseStyles,
      backgroundColor: state.isSelected ? '#054232' : 'white',
      color: state.isSelected ? 'white' : '#054232',
      '&:hover': { backgroundColor: '#82A098', color: 'white' }
    }),
    control: (baseStyles, state) => ({
      ...baseStyles,
      height: '2.75rem',
      borderRadius: '0.375rem',
      borderColor: state.isFocused ? 'rgba(5, 66, 50, 0.2)' : 'rgba(5, 66, 50, 0.2)',
      boxShadow: state.isFocused ? '0px 0px 0px 2px #054232' : 'none',
      '&:hover': { borderColor: 'rgba(5, 66, 50, 0.2)' }
    }),
  };

  return (
    <div className="">
      <Header routes={productListRoutes} />
      <div className="mt-10 mx-10 px-10 py-5 rounded bg-white">
        <div className="flex justify-between">
          <div className="relative w-60 h-12">
            <input
              type="text"
              placeholder="Search..."
              className="input input-bordered bg-white
              focus:outline-offset-0 focus:outline-black w-full"
              onChange={(e) => handleSearch(e.target.value)}
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
              Add Product
            </button>
          </div>
        </div>

        <section className="flex my-4 gap-8 z-100">
          <div className="w-2/5">
            <ReactSelect
              isClearable
              options={categories}
              styles={customeStyle}
              placeholder="Select Category"
              onChange={handleSelectCategory}
            />
          </div>
          <div className="w-2/5">
            <ReactSelect
              isClearable
              options={brands}
              styles={customeStyle}
              placeholder="Select Brand"
              onChange={handleSelectBrand}
            />
          </div>

        </section>

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
                  <div className="avatar">
                    <div className="rounded w-12 h-12">
                      <img src={item?.productImage} alt="Avatar Tailwind CSS Component" />
                    </div>
                  </div>
                </td>
                <td>
                  {item?.name}
                </td>
                <td className="capitalize">
                  {item?.category}
                </td>
                <td className="capitalize">
                  {item?.brandName}
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

export default ProductList;
