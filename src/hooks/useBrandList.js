import { useEffect, useState } from 'react';
import axios from '../API/axios.config';

const useBrandList = () => {
  const [brandList, setBrandList] = useState([]);

  const fetchBrands = async () => {
    try {
      const { data } = await axios.get('/brand');
      const brands = data?.data?.brands.map(({ name }) => ({ label: name, value: name }));
      setBrandList(brands);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchBrands();
  }, []);

  return [brandList, setBrandList];
};

export default useBrandList;
