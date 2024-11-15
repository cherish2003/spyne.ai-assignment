import React from "react";
import { Authpage } from "./pages/Authpage";
import { Routes, Route } from "react-router";
import Homepage from "./pages/Homepage";
import UploadCarPage from "./pages/UploadCarPage";
import Productpage from "./pages/Productpage";
import ProductDetailPage from "./pages/ProductDetailPage";
import Discoverpage from "./pages/Discoverpage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Authpage />} />
        <Route
          path="/home/discover"
          element={
            <Homepage first={"home"} second={"discover"}>
              <Discoverpage />
            </Homepage>
          }
        />
        <Route
          path="/home/product"
          element={
            <Homepage first={"home"} second={"product"}>
              <Productpage />
            </Homepage>
          }
        />
        <Route
          path="/home/product/detail"
          element={
            <Homepage first={"product"} second={"detail"}>
              <ProductDetailPage />
            </Homepage>
          }
        />
        <Route
          path="/home/upload"
          element={
            <Homepage first={"home"} second={"upload"}>
              <UploadCarPage />
            </Homepage>
          }
        />{" "}
      </Routes>
    </>
  );
}

export default App;
