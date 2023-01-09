/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import { AiFillDelete, AiFillEye, AiOutlineEdit } from 'react-icons/ai';
import { TbAdjustmentsHorizontal } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';
import axios from '../../API/axios.config';
import Table from '../../components/PaginatedTable/Table';
import useBrandList from '../../hooks/useBrandList';
import useCategoryList from '../../hooks/useCategoryList';

function ProductList() {
  const addProductURL = '/product/add-product';
  const viewProductURL = '/product/view-product';

  const [brandList, setBrandList] = useBrandList();
  const [categoryList, setCategoryList] = useCategoryList();
  const [products, setProducts] = useState([]);

  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  const [searchText, setSearchText] = useState('');

  const [queries, setQueries] = useState({
    category: '',
    brandName: ''
  });

  const navigate = useNavigate();
  // Load all products from server
  const getProducts = async (text) => {
    let url = `/product/?page=${page}&limit=10`;

    if (text) {
      if (text.length > 2) {
        url += `&search=${text}`;
      }
    }

    if (queries.category) {
      url += `&category=${queries.category}`;
    }

    if (queries.brandName) {
      url = `&brandName=${queries.brandName}`;
    }

    const { data } = await axios.get(url);
    setProducts(data?.data?.products);
    setTotalPage(data?.data?.totalPage);
  };

  useEffect(() => {
    getProducts();
  }, [queries, page]);

  const tableHeader = [
    'No',
    'Name',
    'Category',
    'Brand',
    'Unit',
    'Actios',
  ];

  const handleSearch = (text) => {
    getProducts(text);
    setSearchText(text);
  };

  const handleSelect = (e) => {
    const { name, value } = e.target;
    setQueries((prev) => ({ ...prev, [name]: value }));
  };

  const handleClearFilters = () => {
    setQueries((prev) => ({
      ...prev,
      category: '',
      brandName: ''
    }));
  };

  const handleNavigate = (url) => {
    navigate(url);
  };

  return (
    <div className="flex-col items-center p-5">
      <header className="font-medium  flex justify-between">
        <div className="flex-col">
          <p className="text-2xl">Product List</p>
          <p className="text-xl mt-1">View/Search products</p>
        </div>

        <div className="flex-col">
          <p className="flex align-center cursor-pointer">
            <TbAdjustmentsHorizontal
              className=""
              size={28}
              onClick={handleClearFilters}
            />
            <span className="text-md">Clear Filters</span>
          </p>
          <p className="bg-primary text-white py-2 px-4 mt-2">
            <button
              type="button"
              className="rounded"
              onClick={() => handleNavigate(addProductURL)}
            >
              Add Product
              <span className="text-xl ml-2">+</span>
            </button>
          </p>
        </div>
      </header>

      {/* Search and Filtering section */}

      <section className="my-5 grid grid-cols-3 gap-10">
        <p className="">
          <input
            type="text"
            placeholder="Search Here"
            onChange={(e) => handleSearch(e.target.value)}
            className="
             bg-white
             w-full
             font-medium
             border-2
             rounded-md
             p-2
             "
          />
        </p>
        <p className="">
          <select
            name="category"
            onChange={handleSelect}
            value={queries.category}
            className="
            bg-white
            capitalize
             mb-1
             w-full
             select
             select-bordered
             rounded
             focus:border-none
             p-2
             "
          >
            <option value="">Select Category</option>
            {
              categoryList?.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))
            }
          </select>
        </p>

        <p className="">
          <select
            name="brandName"
            onChange={handleSelect}
            value={queries.brandName}
            className="
            bg-white mb-1
              w-full
              select
              select-bordered
              rounded
              focus:border-none
              p-2
              "
          >
            <option value="">Select Brand</option>
            {
              brandList?.map((brand) => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              ))
            }
          </select>
        </p>

      </section>

      {/* table section */}

      <Table
        header={tableHeader}
        totalPage={totalPage}
        page={page}
        setPage={setPage}
      >
        {products?.map((item, idx) => (
          <tr key={item?.name}>
            <th>{idx + 1}</th>
            <td className="capitalize">{item?.name}</td>
            <td className="capitalize">{item?.category}</td>
            <td>{item?.brandName}</td>
            <td>{item?.unit}</td>

            <td>
              <div className="flex items-center gap-2">
                <AiFillEye
                  className="cursor-pointer"
                  onClick={() => handleNavigate(`${viewProductURL}/${item?._id}`)}
                  size={20}
                />
                <AiOutlineEdit className="cursor-pointer" size={20} />
                <AiFillDelete className="cursor-pointer" size={20} />
              </div>
            </td>
          </tr>
        ))}
      </Table>

    </div>
  );
}

export default ProductList;
