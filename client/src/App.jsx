import React from "react";
import { Authpage } from "./pages/Authpage";
import { Routes, Route } from "react-router";
import Homepage from "./pages/Homepage";
import UploadCarPage from "./pages/UploadCarPage";
import Productpage from "./pages/Productpage";
import ProductDetailPage from "./pages/ProductDetailPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Authpage />} />
        <Route
          path="/home/product"
          element={
            <Homepage>
              <Productpage />
            </Homepage>
          }
        />
        <Route
          path="/home/product/detail"
          element={
            <Homepage>
              <ProductDetailPage />
            </Homepage>
          }
        />
        <Route
          path="/home/upload"
          element={
            <Homepage>
              <UploadCarPage />
            </Homepage>
          }
        />{" "}
      </Routes>
    </>
  );
}

export default App;
