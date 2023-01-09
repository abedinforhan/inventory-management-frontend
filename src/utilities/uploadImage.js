import axios from '../API/axios.config';

// eslint-disable-next-line import/prefer-default-export
export const uploadSingleImage = async (img) => {
  const url = `https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_IMGBB_KEY}`;
  const form = new FormData();
  form.append('image', img);
  const { data } = await axios.post(url, form);
  return data?.data.display_url;
};
