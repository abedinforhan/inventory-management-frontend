import { useEffect, useState } from 'react';
import axios from '../API/axios.config';

const useCategoryList = () => {
  const [categoryList, setCategoryList] = useState([]);

  const fetchCategories = async () => {
    try {
      const { data } = await axios.get('/category');
      const categories = data?.data?.categories.map(({ name }) => ({ label: name, value: name }));
      setCategoryList(categories);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchCategories();
  }, []);

  return [categoryList, setCategoryList];
};

export default useCategoryList;
