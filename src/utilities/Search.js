// handle searcch

const handleSearch = (e) => {
  const searchText = e.target.value.toLowerCase();
  const matchedResult = products.filter((elem) => elem.name.toLowerCase().includes(searchText));
};
