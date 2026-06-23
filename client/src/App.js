import './App.css';
import Layout from './components/Layout';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Login from './features/auth/Login';
import Register from './features/auth/Register';
import "primereact/resources/themes/saga-orange/theme.css";
import Product from './features/product/Product';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import NewProduct from './features/product/NewProduct';
import React from 'react';
import './index.css';
import './flags.css';
import UpdtaePro from './features/product/UpdatePro';
import Products from './features/product/Products';
import useAuth from './features/auth/useAuth';
import Basket from './features/basket/Basket';
import Home from './features/Home';

function App() {
  const { isUserloggedIn, _id, role, userName,fullName,icon } = useAuth()
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Layout></Layout>}>
            <Route path='/' element={<Home></Home>}></Route>
            <Route path='/users/login' element={<Login></Login>}> </Route>
            <Route path='/users/register' element={<Register></Register>}></Route>
            {isUserloggedIn&&<Route path='/products' element={<Products></Products>}></Route>}
            <Route path='/products/:id' element={<Product></Product>}></Route>
            {role == "Admin" && <Route path='/products/newProduct' element={<NewProduct></NewProduct>}></Route>}
            <Route path='/products/update/:id' element={<UpdtaePro></UpdtaePro>}></Route>
            {isUserloggedIn&& <Route path='/basket' element={<Basket></Basket>}></Route>}
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
