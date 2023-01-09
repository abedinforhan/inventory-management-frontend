import { useEffect, useState } from 'react';
import axios from '../API/axios.config';

const useBranchList = () => {
  const [branchList, setBranchList] = useState([]);

  const fetchBranches = async () => {
    try {
      const { data } = await axios.get('/store');
      const allBranches = data?.data.map(({ name }) => ({ label: name, value: name }));
      setBranchList(allBranches);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchBranches();
  }, []);

  return [branchList, setBranchList];
};

export default useBranchList;
