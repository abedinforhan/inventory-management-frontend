import React from 'react';
import './Topbar.css';
const Topbar = () => {
  return (
    <div className="topbar">
     <div className="topbarWrapper">
      <div className="topLeft">
        <span className="logo">
          Inventory Management
        </span>
      </div>
      <div className="topRight">
        right
      </div>
     </div>
    </div>
  );
};

export default Topbar;