/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <div className="navbar flex justify-between bg-base-100 fixed top-0 z-[900]">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost normal-case text-xl">Inventory</Link>
      </div>
      <div className="flex-none gap-2">
        <Link
          to="/login"
        >
          <h2 className="font-medium">Login</h2>
        </Link>
        <div className="dropdown dropdown-end">
          <label tabIndex="0" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">

              <img src="https://placeimg.com/80/80/people" alt="profile" />
            </div>
          </label>
          <ul tabIndex="0" className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
            <li>
              <Link to="/" className="justify-between">
                Profile
                <span className="badge">New</span>
              </Link>
            </li>
            <li><Link to="/">Settings</Link></li>
            <li><Link to="/">Logout</Link></li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
