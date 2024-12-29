import React from 'react';
import { GrUserAdmin } from "react-icons/gr";
import { NavLink } from "react-router-dom";

const AdminNav = () => {
  return (
    <div className="bg-slate-100 m-5 shadow-lg rounded-lg p-4">
      {/* Header */}
      <div className="flex flex-col justify-center items-center mb-6">
        <GrUserAdmin className="text-7xl text-blue-900 m-2 p-2" />
         <p className="text-lg font-semibold text-blue-900">Admin</p>
      </div>
      <hr />

      {/* Navigation Links */}
      <nav>
        <ul className="space-y-4">
          <li>
            <NavLink
              to="/dashboard"
              end
              className={({ isActive }) =>
                isActive
                  ? "text-blue-500 font-bold"
                  : "text-gray-700 hover:text-blue-500"
              }
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/add-new-post"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-500 font-bold"
                  : "text-gray-700 hover:text-blue-500"
              }
            >
              Add New Post
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/ManageItems"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-500 font-bold"
                  : "text-gray-700 hover:text-blue-500"
              }
            >
             Manage Items
            </NavLink>
          </li>
          
        </ul>
      </nav>
    </div>
  );
};

export default AdminNav;
