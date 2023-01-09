/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import ReactDatePicker from 'react-datepicker';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import ReactSelect from 'react-select';
import { v1 as uuidv1 } from 'uuid';
import CalenderIcon from '../../assets/icons/CalenderIcon';
import Header from '../../components/Breadcrums/Header';
import useBrandList from '../../hooks/useBrandList';
import useCategoryList from '../../hooks/useCategoryList';
import useUnits from '../../hooks/useUnits';

function AddPurchase() {
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

  const [brandList] = useBrandList();
  const [units] = useUnits();
  const [categoryList] = useCategoryList();

  const {
    register, handleSubmit, control, getValues, setValue, reset
  } = useForm({
    defaultValues: {
      purchaseNo: uuidv1(),
      totalAmount: 0,
      products: [
        {
          brand: null,
          product: null,
          category: null,
          unit: null,
          quantity: 0,
          buyingPrice: 0,
          sellingPrice: 0,
          totalAmount: 0
        }
      ]
    }
  });

  const { append, fields, remove } = useFieldArray({
    control, name: 'products',
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  const handleAppendForm = () => {
    append({
      brand: {},
      product: {},
      category: {},
      unit: 0,
      quantity: 0,
      buyingPrice: 0,
      sellingPrice: 0,
      totalAmount: 0
    });
  };

  const handleRemoveForm = (index) => {
    remove(index);
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

  const fakeOptions = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ];
  const paymentOptions = [
    { value: 'cash', label: 'cash' },
    { value: 'credit', label: 'Credit' },
  ];

  return (
    <div>
      <Header routes={routes} />
      <div className="mt-10 mx-10 px-10 py-5 rounded">
        <div className="bg-white w-full max-w-5xl mx-auto rounded-md p-3">
          <form className="h-full py-3" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-wrap w-full gap-y-3">
              <div className="w-1/2 flex flex-col gap-1 px-3">
                <label htmlFor="date">
                  Date
                </label>
                <Controller
                  control={control}
                  name="ReactDatepicker"
                  render={({ field }) => (
                    <div className="relative">
                      <div className="absolute top-[50%] right-5 -translate-y-[50%] z-10 pointer-events-none">
                        <CalenderIcon />
                      </div>
                      <ReactDatePicker
                        className="im-input w-full cursor-pointer"
                        placeholderText="Select date"
                        onChange={(e) => field.onChange(e)}
                        selected={field.value}
                      />
                    </div>
                  )}
                />
              </div>
              <div className="w-1/2 flex flex-col gap-1 px-3">
                <label htmlFor="purchaseNo">
                  Purchase No.
                </label>
                <input className="im-input" {...register('purchaseNo')} disabled type="text" name="purchaseId" id="purchaseId" />
              </div>
              <div className="w-1/2 flex flex-col gap-1 px-3">
                <label htmlFor="invoiceNo">
                  Invoice No.
                </label>
                <input className="im-input" {...register('invoiceNo')} type="text" name="invoiceNo" id="invoiceNo" />
              </div>

              <hr className="w-full m-3" />
              {
                fields.map((item, index) => (
                  <>
                    <div className="w-1/2 flex flex-col gap-1 px-3">
                      <label htmlFor="brand">
                        Brand
                      </label>
                      <Controller
                        name={`products[${index}].brand`}
                        control={control}
                        render={({ field }) => (
                          <ReactSelect
                            isClearable
                            {...field}
                            options={brandList}
                            styles={customeStyle}
                          />
                        )}
                      />
                    </div>
                    <div className="w-1/2 flex flex-col gap-1 px-3">
                      <label htmlFor="product">
                        Product
                      </label>
                      <Controller
                        name={`products[${index}].product`}
                        control={control}
                        render={({ field }) => (
                          <ReactSelect
                            isClearable
                            {...field}
                            options={fakeOptions}
                            styles={customeStyle}
                          />
                        )}
                      />
                    </div>
                    <div className="w-1/2 flex flex-col gap-1 px-3">
                      <label htmlFor="category">
                        Category
                      </label>
                      <Controller
                        name={`products[${index}].category`}
                        control={control}
                        render={({ field }) => (
                          <ReactSelect
                            isClearable
                            {...field}
                            options={categoryList}
                            styles={customeStyle}
                          />
                        )}
                      />
                    </div>
                    <div className="w-1/2 flex flex-col gap-1 px-3">
                      <label htmlFor="unit">
                        Unit
                      </label>
                      <Controller
                        name={`products[${index}].unit`}
                        control={control}
                        render={({ field }) => (
                          <ReactSelect
                            isClearable
                            {...field}
                            options={units}
                            styles={customeStyle}
                          />
                        )}
                      />
                    </div>
                    <div className="w-1/2 flex flex-col gap-1 px-3">
                      <label htmlFor="quantity">
                        Quantity
                      </label>
                      <input
                        type="number"
                        id="quantity"
                        className="im-input"
                        min="0"
                        {...register(`products[${index}].quantity`, {
                          valueAsNumber: true,
                          onChange: (e) => {
                            const quantity = parseInt(e.target.value, 10);
                            const buyingPrice = parseFloat(getValues(`products[${index}].buyingPrice`));

                            const totalBuyingPrice = buyingPrice * quantity;
                            setValue(`products.${index}.totalAmount`, totalBuyingPrice);
                            const products = getValues('products');
                            const grandTotal = products.reduce((total, current) => total + current.totalAmount, 0);
                            setValue('grandTotal', grandTotal);
                          }
                        })
                        }
                      />
                    </div>
                    <div className="w-1/2 flex flex-col gap-1 px-3">
                      <label htmlFor="buyingPrice">
                        Buying Price (Per Unit)
                      </label>
                      <input
                        type="number"
                        className="im-input"
                        {...register(`products[${index}].buyingPrice`, {
                          valueAsNumber: true,
                          onChange: (e) => {
                            const buyingPrice = parseFloat(e.target.value);
                            const quantity = parseInt(getValues(`products[${index}].quantity`), 10);

                            const totalBuyingPrice = buyingPrice * quantity;
                            setValue(`products.${index}.totalAmount`, totalBuyingPrice);
                            const products = getValues('products');
                            const grandTotal = products.reduce((total, current) => total + current.totalAmount, 0);
                            setValue('grandTotal', grandTotal);
                          }
                        })
                        }
                        id="buyingPrice"
                      />
                    </div>
                    <div className="w-1/2 flex flex-col gap-1 px-3">
                      <label htmlFor="sellingPrice">
                        Selling Price (Per Unit)
                      </label>
                      <input className="im-input" {...register(`products[${index}].sellingPrice`, { valueAsNumber: true, })} type="text" id="sellingPrice" />
                    </div>
                    {index !== 0 && (
                      <div className="w-1/2 flex items-end justify-end gap-1 px-3">
                        <button className="btn btn-primary" type="button" onClick={() => handleRemoveForm(index)}>Remove</button>
                      </div>
                    )}

                    <hr className="w-full m-3" />
                  </>

                ))
              }

              <div className="w-full flex justify-end gap-3">
                <button className="btn btn-primary" type="button" onClick={handleAppendForm}>Add Product</button>
              </div>

              <div className="w-1/2 flex flex-col gap-1 px-3">
                <label htmlFor="discount">
                  Discount (If any)
                </label>
                <input className="im-input" {...register('discount')} type="text" name="discount" id="discount" />
              </div>

              <div className="w-1/2 flex flex-col gap-1 px-3">
                <label htmlFor="tax">
                  Tax
                </label>
                <input className="im-input" {...register('tax')} type="text" name="tax" id="tax" />
              </div>

              <div className="w-1/2 flex flex-col gap-1 px-3">
                <label htmlFor="shippingCost">
                  Shipping cost
                </label>
                <input className="im-input" {...register('shippingCost')} type="text" name="shippingCost" id="shippingCost" />
              </div>
              <div className="w-1/2 flex flex-col gap-1 px-3">
                <label htmlFor="otherCost">
                  Other cost
                </label>
                <input className="im-input" {...register('otherCost')} type="text" name="otherCost" id="otherCost" />
              </div>
              <div className="w-1/2 flex flex-col gap-1 px-3">
                <label htmlFor="paymentType">
                  Payment Type
                </label>
                <Controller
                  name="paymentType"
                  control={control}
                  render={({ field }) => (
                    <ReactSelect
                      isClearable
                      {...field}
                      options={paymentOptions}
                      styles={customeStyle}
                    />
                  )}
                />
              </div>
              <div className="w-1/2 flex flex-col gap-1 px-3">
                <label htmlFor="totalAmount">
                  Total Amount
                </label>
                <input
                  readOnly
                  className="im-input"
                  {...register('grandTotal', {
                    valueAsNumber: true
                  })}
                  type="number"
                  min="0"
                  name="grandTotal"
                  id="grandTotal"
                />
              </div>

              <div className="w-full flex justify-end gap-3">
                <button className="btn btn-primary" type="submit">Submit</button>
              </div>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
}

export default AddPurchase;
