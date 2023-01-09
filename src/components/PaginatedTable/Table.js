import React from 'react';

function Table({
  children, header, totalPage, page, setPage
}) {
  const pages = Array.from({ length: totalPage }, (_, i) => i + 1);

  return (
    <div className="mt-5">

      <table className="table table-zebra table-normal table-auto w-full">
        {/* <!-- head --> */}
        <thead className="relative z-0">
          <tr>
            {header.map((item) => (<th key={item}>{item}</th>))}
          </tr>
        </thead>
        <tbody>
          {children}
        </tbody>
      </table>

      {totalPage !== 1 && (
        <div className="flex justify-center mt-5">
          <div className="btn-group">
            {
              pages.map((item) => <button key={item} onClick={() => setPage(item)} type="button" className={`btn btn-sm ${Number(item) === Number(page) ? 'btn-active' : null}`}>{item}</button>)
            }
          </div>
        </div>
      )}
    </div>
  );
}

export default Table;
