/* eslint-disable no-shadow */
/* eslint-disable no-await-in-loop */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from '../../API/axios.config';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Select from '../../components/common/Select';
import TextArea from '../../components/common/TextArea';
import useBrandList from '../../hooks/useBrandList';
import useCategoryList from '../../hooks/useCategoryList';

function AddProduct() {
  const [brandList, setBrandList] = useBrandList();
  const [categoryList, setCategoryList] = useCategoryList();
  const [products, setProducts] = useState([]);

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const handleNavigate = () => {
    const url = '/product/product-list';
    navigate(url);
  };

  const uploadImageToImgBB = async (img) => {
    const url = 'https://api.imgbb.com/1/upload?key=030e8b2f4c90bfba52d4ef2b3ff01855';
    const form = new FormData();
    form.append('image', img);
    const { data } = await axios.post(url, form);
    return data?.data.display_url;
  };

  const sendNewProductToDB = async (postData) => {
    console.log(postData);
    const { data } = await axios.post('/product', postData);
    console.log(data);
  };

  const onSubmit = async (formData) => {
    let productImage = '';
    const otherImages = [];

    if (formData?.productImage?.length) {
      productImage = await uploadImageToImgBB(formData.productImage[0]);
    }
    if (formData?.otherImages?.length) {
      const otherImagesData = formData?.otherImages;

      for (let i = 0; i < otherImagesData?.length; i += 1) {
        const url = await uploadImageToImgBB(otherImagesData[i]);
        otherImages.push(url);
      }
    }
    sendNewProductToDB({ ...formData, productImage, otherImages });
  };

  return (
    <div>
      <div className="flex-col items-center p-5">

        <header className="font-medium  flex justify-between">
          <div className="flex-col">
            <p className="text-2xl">Add Product</p>
          </div>
        </header>

        <section className="FORM">
          <form onSubmit={handleSubmit(onSubmit)}>

            <div className="">
              <div className="my-4 font-medium">
                <Input
                  type="text"
                  placeholder="Enter Product Name"
                  title="Product Name"
                  registerTitle="name"
                  register={register}
                  errors={errors}
                  required="true"
                />

                <div className="grid grid-cols-2 gap-4">
                  <TextArea
                    placeholder="Product Description"
                    title="Product Description"
                    registerTitle="description"
                    register={register}
                    errors={errors}
                    required
                  />
                  <Input
                    type="file"
                    placeholder=""
                    title="Product Image"
                    registerTitle="productImage"
                    register={register}
                    errors={errors}
                    required={false}
                  />
                </div>
                <Input
                  type="file"
                  placeholder=""
                  title="Other Images"
                  registerTitle="otherImages"
                  register={register}
                  errors={errors}
                  multiple
                  required={false}
                />
                <div className="grid grid-cols-2 gap-4">

                  <Select
                    title="Category"
                    registerTitle="category"
                    register={register}
                    errors={errors}
                    required
                    options={categoryList}
                  />
                  <Select
                    title="Brand"
                    registerTitle="brandName"
                    register={register}
                    errors={errors}
                    required
                    options={brandList}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4 content-center">
                  <Select
                    title="Unit"
                    registerTitle="unit"
                    register={register}
                    errors={errors}
                    required
                    options={['kg', 'litre', 'pcs', 'bag']}
                  />

                </div>

                <Button
                  title="Submit"
                  type="submit"
                />
              </div>
            </div>
          </form>
        </section>

      </div>

    </div>
  );
}

export default AddProduct;
