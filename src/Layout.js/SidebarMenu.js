/* eslint-disable import/no-cycle */
import React from 'react';
import { NavLink } from 'react-router-dom';

function SidebarMenu({ menu, subMenu, isOpen }) {
  return (
    <div className={`collapse collapse-arrow  group mt-1 origin-left duration-300  ${!isOpen && 'scale-0'}`}>

      <input type="checkbox" className="peer" />
      <div className="collapse-title w-full rounded-md bg-primary peer-checked:bg-accent group-hover:bg-accent text-primary-content ">
        <ul className="mx-2 w-full flex justify-start items-center">
          <menu.icon />
          <li className="mx-1">{menu.name}</li>
        </ul>
      </div>
      <div className="collapse-content flex flex-col bg-accent rounded-md text-primary-content mt-1">
        <p className="mt-3" />
        {
        subMenu?.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            style={({ isActive }) => (isActive ? { color: 'white' } : null)}
          >
            <div className="my-2 w-full flex justify-start items-center hover:text-white transition-all">
              <item.icon className="mx-2" />
              {item.name}
            </div>
          </NavLink>
        ))
        }
      </div>
    </div>
  );
}

export default SidebarMenu;
