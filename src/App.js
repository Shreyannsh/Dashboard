import "./App.css";
import React from "react";
import { useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";

import MyResponsiveBar from "./pages/homePage/chart";
import MyResponsiveLine from "./pages/lineChartPage/lineChartPage";

import "./assets/csvData.csv";
import Filters from "./components/filters/filters";

function App() {
  const collectiveData = useSelector((state) => state.collectiveData);
  // console.log(collectiveData);
  return (
    <div className="App">
      <h1>Hello</h1>
      <Filters />
      <Routes>
        <Route path="/" element={<MyResponsiveBar data={collectiveData} />} />
        <Route path="/lineChartPage/:feature" element={<MyResponsiveLine />} />
      </Routes>
    </div>
  );
}

export default App;
