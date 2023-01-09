/* eslint-disable import/no-cycle */
import React, { createContext, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { Toaster } from 'react-hot-toast';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import MainContainer from './Layout.js/MainContainer';
import Login from './Pages/Login/Login';
import AddProduct from './Pages/Products/AddProduct';
import ViewProduct from './Pages/Products/ViewProduct';
import Registration from './Pages/Registration/Registration';
import AddSupplier from './Pages/Suppliers/AddSupplier';
import EditSupplier from './Pages/Suppliers/EditSupplier';
import ViewSupplier from './Pages/Suppliers/ViewSupplier';
import adminRoute from './Routes/AdminRoutes';
import chattogramManagerRoute from './Routes/ChattogramManagerRoute';
import dhakaManagerRoute from './Routes/DhakaManagerRoutes';

export const UserContext = createContext();
function App() {
  const [user, setUser] = useState('admin');
  let routes = [];

  if (user === 'dhaka') {
    routes = dhakaManagerRoute;
  } else if (user === 'chattogram') {
    routes = chattogramManagerRoute;
  } else if (user === 'admin') {
    routes = adminRoute;
  }
  return (
    <UserContext.Provider value={user}>
      <Toaster />
      <Routes>
        <Route path="/" element={<MainContainer />}>
          {routes.map((item) => item.subMenu.map((submenu) => (
            <Route
              key={submenu.path}
              path={submenu.path}
              element={<submenu.component />}
            />
          )))}

          <Route path="/product/add-product" element={<AddProduct />} />
          <Route path="/product/view-product/:productID" element={<ViewProduct />} />
          <Route path="/people/supplier/edit-supplier/:id" element={<EditSupplier />} />
          <Route path="/people/supplier/add-supplier" element={<AddSupplier />} />
          <Route path="/people/supplier/view-supplier/:id" element={<ViewSupplier />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
      </Routes>
    </UserContext.Provider>

  );
}
export default App;
