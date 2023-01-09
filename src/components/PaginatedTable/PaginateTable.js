import React from 'react';

function PaginateTable() {
  return (
    <div className="w-full overflow-x-auto">
      <table className="table w-full">
        {/* <!-- head --> */}
        <thead>
          <tr>
            <th>Category ID </th>
            <th>Category Name</th>
            <th>Description</th>
            <th>Created By</th>
            <th>Actios</th>
          </tr>
        </thead>
        <tbody>
          {/* <!-- row 1 --> */}  <th>1</th>
            <td>Cy Ganderton</td>
            <td>Quality Control Specialist</td>
            <td>Blue</td>
          </tr>
          {/* <!-- row 2 --> */}
          <tr className="active">
            <th>2</th>
            <td>Hart Hagerty</td>
            <td>Desktop Support Technician</td>
            <td>Purple</td>
          </tr>
          {/* <!-- row 3 --> */}
          <tr>
            <th>3</th>
            <td>Brice Swyre</td>
            <td>Tax Accountant</td>
            <td>Red</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default PaginateTable;
