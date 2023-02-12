import React from "react";
import { Route, Routes } from "react-router-dom";

import Home from "../Pages/Home";
import About from "../Pages/About";
import Contact from "../Pages/Contact";
import Product from "../Pages/Product";
import Single from "../Pages/Single";
import Login from "../Pages/Login";
import Private from "../Components/Private";
import NotFound from "../Pages/NotFound";
export const AllRouters = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route
          path="/product"
          element={
            <Private>
              <Product />
            </Private>
          }
        />
        <Route path="/product/:id" element={<Single />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};
