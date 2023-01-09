/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable no-shadow */
/* eslint-disable no-await-in-loop */
/* eslint-disable jsx-a11y/label-has-associated-control */

import React, { useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { v1 as uuidv1 } from 'uuid';
import axios from '../../API/axios.config';
import MyDatePicker from '../../components/common/MyDatePicker';
import MyInput from '../../components/common/MyInput';
import MySelect from '../../components/common/MySelect';
import useBrandList from '../../hooks/useBrandList';
import useCategoryList from '../../hooks/useCategoryList';
import useUnits from '../../hooks/useUnits';

let renderCount = 0;

const paymentList = [
  { label: 'debit', value: 'debit' },
  { label: 'credit', value: 'credit' }
];
const statusList = [
  { label: 'pending', value: 'pending' },
  { label: 'completed', value: 'completed' }
];

function AddProduct() {
  const [brandList, setBrandList] = useBrandList();
  const [categoryList, setCategoryList] = useCategoryList();
  const [unitList, setUnitList] = useUnits();
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);

  // eslint-disable-next-line no-plusplus
  renderCount++;
  const {
    handleSubmit,
    control,
    watch,
    register,
    getValues,
    setValue,
    reset,
    formState,
    formState: { errors, isSubmitSuccessful, isSubmitting }
  } = useForm({
    criteriaMode: 'all',
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {
      products: [{
        brand: '',
        product: '',
        category: '',
        unit: '',
        buyingPrice: 0,
        quantity: 0,
        totalBuyingPrice: 0,
        sellingPrice: 0,
        totalSellingPrice: 0
      }],
      discount: 0,
      tax: 0,
      shippingCost: 0,
      otherCost: 0,
      date: new Date(),
      purchaseNo: uuidv1(),
      paymentType: '',
      status: ''
    }
  });

  console.log(uuidv1());

  const {
    fields,
    append,
    remove,
  } = useFieldArray({
    control,
    name: 'products',
    rules: {
      minLength: 1
    }
  });

  const handleAppendForm = () => {
    append({
      buyingPrice: 0,
      quantity: 0,
      totalBuyingPrice: 0,
      sellingPrice: 0,
      totalSellingPrice: 0
    });
  };

  const handleRemoveForm = (index) => {
    if (index > 0) {
      remove(index);
    }
  };

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset({
        products: [{
          brand: '',
          product: '',
          category: '',
          unit: '',
          buyingPrice: 0,
          quantity: 0,
          totalBuyingPrice: 0,
          sellingPrice: 0,
          totalSellingPrice: 0
        }],
        discount: 0,
        tax: 0,
        shippingCost: 0,
        otherCost: 0,
        date: new Date(),
        purchaseNo: uuidv1(),
        paymentType: '',
        status: '',
      });
    }
  }, [formState.isSubmitSuccessful, reset]);

  const getSelectedProductsFromServer = async (selectedBrand) => {
    const url = `/product/brand/${selectedBrand}`;
    const { data } = await axios.get(url);
    const newSelectedProducts = data?.data.map(({ name }) => ({ label: name, value: name }));
    setSelectedProducts(newSelectedProducts);
  };

  const onSubmit = (data) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 5000);
  };

  return (
    <div className="font-medium">
      <p>{renderCount}</p>

      <section className="FORM bg-white p-5">

        <form onSubmit={handleSubmit(onSubmit)}>
          {
            isLoading ? (

              <div className=" h-screen flex items-center justify-center">
                <h2 className="text-2xl">Processing ....</h2>
              </div>
            )
              : (
                <div>
                  <header className="font-medium  flex justify-between mt-5">
                    <div>
                      <p className="text-2xl">Add Purchase</p>
                    </div>
                    <MyDatePicker
                      name="date"
                      label="Date"
                      control={control}
                      watch={watch}
                      minDate={new Date()}
                      selected={startDate}
                      rules={
                      {
                        required: true,

                      }
                    }
                    />

                  </header>

                  <div className="grid grid-cols-2 gap-4">
                    <MyInput
                      readOnly
                      id="purchaseNo"
                      label="Purchase No"
                      type="text"
                      placeholder="Purchase No Not Found"
                      register={register}
                      name="purchaseNo"
                      rules={{ required: true }}
                      errors={errors}
                    />
                    <MyInput
                      id="invoiceNo"
                      label="Invoice No"
                      type="text"
                      placeholder="Invoice Number"
                      register={register}
                      name="invoiceNo"
                      rules={{ required: false }}
                      errors={errors}
                    />

                  </div>

                  <div className="bg-white">
                    {
                      fields.map((item, index) => (
                        <div key={item.id} className="grid grid-cols-2 gap-4 border-b border-green-200 py-2 my-5 ">

                          <MySelect
                            id="brand"
                            label="Brand"
                            name={`products.${index}.brand`}
                            control={control}
                            errors={errors}
                            rules={
                              {
                                required: 'This field is required',
                                onChange: (e) => {
                                  const { value } = e.target;
                                  if (value) {
                                    getSelectedProductsFromServer(value);
                                  }
                                }
                              }
                            }
                            options={brandList}
                          />

                          <MySelect
                            id="product"
                            label="Product"
                            name={`products.${index}.product`}
                            control={control}
                            errors={errors}
                            rules={{
                              required: 'This field is required',
                            }}
                            options={selectedProducts}
                          />

                          <MySelect
                            id="category"
                            label="Category"
                            name={`products.${index}.category`}
                            control={control}
                            errors={errors}
                            rules={{ required: 'This field is required' }}
                            options={categoryList}
                          />

                          <MySelect
                            id="unit"
                            label="Unit"
                            name={`products.${index}.unit`}
                            control={control}
                            errors={errors}
                            rules={{ required: 'This field is required' }}
                            options={unitList}
                          />

                          <MyInput
                            id="buyingPrice"
                            label="Buying Price(Per Unit)"
                            type="number"
                            defaultValue={item.buyingPrice}
                            placeholder="Enter Price"
                            register={register}
                            name={`products.${index}.buyingPrice`}
                            rules={
                              {
                                required: true,
                                valueAsNumber: true,
                                min: {
                                  value: 0,
                                  message: 'Price can not be less than 0'
                                },
                                onChange: (e) => {
                                  const quantity = getValues(`products.${index}.quantity`);
                                  const totalBuyingPrice = ((parseInt(quantity, 10) * parseFloat(e.target.value)));
                                  setValue(`products.${index}.totalBuyingPrice`, totalBuyingPrice);
                                }
                              }
                            }
                            errors={errors}
                          />

                          <MyInput
                            id="quantity"
                            label="Quantity"
                            type="number"
                            defaultValue={item.quantity}
                            placeholder="Enter Quantity"
                            register={register}
                            name={`products.${index}.quantity`}
                            rules={
                              {
                                required: true,
                                valueAsNumber: true,
                                min: {
                                  value: 0,
                                  message: 'Price can not be less than 0'
                                },
                                onChange: (e) => {
                                  const buyingPrice = getValues(`products.${index}.buyingPrice`);
                                  const sellingPrice = getValues(`products.${index}.sellingPrice`);

                                  const totalBuyingPrice = ((parseFloat(buyingPrice) * parseInt(e.target.value, 10)));
                                  const totalSellingPrice = ((parseFloat(sellingPrice) * parseInt(e.target.value, 10)));

                                  setValue(`products.${index}.totalBuyingPrice`, totalBuyingPrice);
                                  setValue(`products.${index}.totalSellingPrice`, totalSellingPrice);
                                }
                              }
                            }
                            errors={errors}
                          />

                          <MyInput
                            id="sellingPrice"
                            label="Sellling Price (Per Unit)"
                            type="number"
                            defaultValue={item.sellingPrice}
                            placeholder="Enter Price"
                            register={register}
                            name={`products.${index}.sellingPrice`}
                            rules={
                              {
                                required: true,
                                valueAsNumber: true,
                                min: {
                                  value: 0,
                                  message: 'Price can not be less than 0'
                                },
                                onChange: (e) => {
                                  const quantity = getValues(`products.${index}.quantity`);
                                  const totalSellingPrice = (parseFloat(e.target.value) * parseInt(quantity, 10));
                                  setValue(`products.${index}.totalSellingPrice`, totalSellingPrice);
                                }
                              }
                            }
                            errors={errors}
                          />

                          <div className="border-l-2 border-green-500 pl-5">
                            <MyInput
                              readOnly
                              id="totalBuyingPrice"
                              label="Total Buying Price"
                              type="number"
                              defaultValue={item.totalBuyingPrice}
                              placeholder="Total Buying Price"
                              register={register}
                              name={`products.${index}.totalBuyingPrice`}
                              rules={
                                {
                                  required: true,
                                  valueAsNumber: true,
                                  min: {
                                    value: 0,
                                    message: 'Price can not be less than 0'
                                  }
                                }
                              }
                              errors={errors}
                              dynamicClass="border-0"
                            />

                            <MyInput
                              readOnly
                              id="totalSellingPrice"
                              label="Total Selling Price"
                              type="number"
                              defaultValue={item.totalSellingPrice}
                              placeholder="Total Selling Price"
                              register={register}
                              name={`products.${index}.totalSellingPrice`}
                              rules={
                                {
                                  required: true,
                                  valueAsNumber: true,
                                  min: {
                                    value: 0,
                                    message: 'Price can not be less than 0'
                                  }
                                }
                              }
                              errors={errors}
                              dynamicClass="border-0"
                            />

                          </div>

                          <div className="flex  ">
                            <p>
                              <button
                                type="button"
                                className={`bg-white text-black flex items-center cursor-pointer border-2 p-2 rounded  border-black ${index === 0 ? 'hidden' : ''}`}
                                onClick={() => {
                                  handleRemoveForm(index);
                                }}
                              >
                                <AiOutlineMinus />
                                <p>Remove Product</p>
                              </button>
                            </p>
                            <p>
                              <button
                                type="button"
                                className=" bg-white text-black flex items-center cursor-pointer border-2 p-2 rounded  border-black"
                                onClick={() => {
                                  handleAppendForm();
                                }}
                              >
                                <AiOutlinePlus />
                                <p>Add Product</p>
                              </button>
                            </p>
                          </div>

                        </div>

                      ))
                    }
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <MyInput
                      id="discount"
                      label="Discount ( if any )"
                      type="number"
                      placeholder="Enter Discount"
                      register={register}
                      name="shippingCost"
                      rules={
                        {
                          required: false,
                          valueAsNumber: true,
                          min: {
                            value: 0,
                            message: 'Price can not be less than 0'
                          }
                        }
                      }
                      errors={errors}
                    />

                    <MyInput
                      id="tax"
                      label="Tax "
                      type="number"
                      placeholder="Enter Tax"
                      register={register}
                      name="tax"
                      rules={
                        {
                          required: true,
                          valueAsNumber: true,
                          min: {
                            value: 0,
                            message: 'Price can not be less than 0'
                          }
                        }
                      }
                      errors={errors}
                    />

                    <MyInput
                      id="shippingCost"
                      label="Shipping Cost"
                      type="number"
                      placeholder="Total Shipping Cost"
                      register={register}
                      name="shippingCost"
                      rules={
                        {
                          required: true,
                          valueAsNumber: true,
                          min: {
                            value: 0,
                            message: 'Price can not be less than 0'
                          }
                        }
                      }
                      errors={errors}
                    />

                    <MyInput
                      id=" otherCost"
                      label="Other Cost"
                      type="number"
                      placeholder="Enter Other Cost"
                      register={register}
                      name="otherCost"
                      rules={
                        {
                          required: true,
                          valueAsNumber: true,
                          min: {
                            value: 0,
                            message: 'Price can not be less than 0'
                          }
                        }
                      }
                      errors={errors}
                    />

                    <MySelect
                      id="paymentType"
                      label="Payment Type"
                      name="paymentType"
                      control={control}
                      errors={errors}
                      rules={{ required: 'This field is required' }}
                      options={paymentList}
                    />

                    <MySelect
                      id="statusType"
                      label="Status"
                      name="status"
                      control={control}
                      errors={errors}
                      rules={{ required: 'This field is required' }}
                      options={statusList}
                    />
                  </div>

                  <button type="submit" className="btn btn-primary mt-5"> Submit</button>
                </div>
              )
          }
        </form>
      </section>

    </div>
  );
}

export default AddProduct;
