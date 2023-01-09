import { useEffect, useState } from 'react';
import axios from '../API/axios.config';

const useUnits = () => {
  const [unitList, setUnitList] = useState([]);

  const fetchUnits = async () => {
    try {
      const { data } = await axios.get('/unit');
      const units = data?.data?.map(({ name }) => ({ label: name, value: name }));
      setUnitList(units);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchUnits();
  }, []);

  return [unitList, setUnitList];
};

export default useUnits;
