import { useEffect, useState } from 'react';
import axios from '../API/axios.config';

const useSuppliers = () => {
  const [suppliers, setSuppliers] = useState([]);

  const fetchSuppliers = async () => {
    try {
      const { data } = await axios.get('/supplier');
      setSuppliers(data?.data?.suppliers);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchSuppliers();
  }, []);

  return [suppliers, setSuppliers];
};

export default useSuppliers;
