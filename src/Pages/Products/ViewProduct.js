/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../../API/axios.config';

function ProductList() {
  const [product, setProduct] = useState([]);
  const navigate = useNavigate();
  const { productID } = useParams();

  const handleNavigate = () => {
    const url = '/product/product-list';
    navigate(url);
  };

  const getProductFromDB = async () => {
    const { data } = await axios.get(`/product/${productID}`);
    setProduct(data?.data);
  };

  useEffect(
    () => {
      getProductFromDB();
    },
    [productID]
  );
  console.log(product);
  return (

    <div className="flex-col items-center p-5">

      <header className="font-medium  flex justify-between">
        <div className="flex-col">
          <p className="text-2xl">View Product</p>
        </div>
      </header>

      <section className="mt-5">
        <div className="grid grid-cols-2">
          <figure className="border w-4/5 h-fit">
            <img className="h-4/5 w" src={product?.productImage} alt="Album" />
          </figure>
          <div className="">
            <h2 className="font-medium text-xl">
              {product?.name}
            </h2>
            <p className="mt-4">{product.description}</p>
            <div className="mt-6">
              <div className="overflow-x-auto">
                <table className="table-fixed w-full">
                  <tbody>
                    <tr className="border-b-2">
                      <td className="font-medium py-2">ID</td>
                      <td>{product?._id}</td>
                    </tr>
                    <tr className="border-b-2">
                      <td className="font-medium py-2">Brand</td>
                      <td>{product?.brandName}</td>
                    </tr>
                    <tr className="border-b-2">
                      <td className="font-medium py-2">Category</td>
                      <td className="capitalize">{product?.category}</td>
                    </tr>
                    <tr className="border-b-2">
                      <td className="font-medium py-2">Unit</td>
                      <td>{product?.unit}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="mt-5 grid grid-cols-4">
        {
          product?.otherImages?.map((img) => <figure className="h-fit w-4/5 border-r-2"><img src={img} alt="Other" /></figure>)
        }
      </section>
    </div>

  );
}

export default ProductList;
