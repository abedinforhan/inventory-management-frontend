import React from 'react';

function DataBox({ title, value }) {
  return (
    <div className="h-15 p-2 my-4 bg-[#FAF9F6] rounded">
      <p className="text-gray-400">{title}</p>
      <p className="text-black">{value}</p>
    </div>
  );
}

export default DataBox;
