/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { BsArrowRightShort } from 'react-icons/bs';
import { Link, NavLink } from 'react-router-dom';

function Header({ routes }) {
  return (
    <div className="flex justify-between bg-white p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <BsArrowRightShort
            className="font-bold cursor-pointer"
            color="black"
            size={25}
          />
          <div className="text-md font-medium breadcrumbs">
            <ul>
              <li>

                {
                 routes?.map(({ path, title }) => (
                   path
                     ? (
                       <NavLink
                         key={title}
                         to={path}
                       >
                         {title}
                         <span className="mx-2">
                           /
                         </span>
                       </NavLink>
                     )
                     : (
                       <p className="text-gray-400 font-normal">
                         {title}
                       </p>
                     )
                 ))
               }

              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="dropdown dropdown-end">
        <div className="flex items-center">
          <div>
            <p className="font-medium">Mezbaul Abedin Forhan</p>
            <p>Supplier</p>
          </div>
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-14 rounded-full">
              <img alt="profile" src="https://placeimg.com/80/80/people" />
              <div />
            </div>
          </label>
        </div>
        <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
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
  );
}

export default Header;
