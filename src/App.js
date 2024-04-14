import "./App.css";

import { useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";

import MyResponsiveBar from "./pages/homePage/chart";
import MyResponsiveLine from "./pages/lineChartPage/lineChartPage";

import React, { useEffect, useState } from "react";
import * as csv from "csvtojson";

import "./assets/csvData.csv";

function App() {
  const data = useSelector((state) => state.data);
  const collectiveData = useSelector((state) => state.collectiveData);

  const [jsonData, setJsonData] = useState(null);

  useEffect(() => {
    // const fetchCSVAndConvert = async () => {
    //   try {
    //     const response = await fetch("./assets/csvData.csv");
    //     const text = await response.text();
    //     const convertedData = await csv().fromString(text);
    //     console.log(convertedData);
    //     setJsonData(convertedData);
    //   } catch (error) {
    //     console.error("Error fetching or converting CSV:", error);
    //   }
    // };
    // fetchCSVAndConvert();
    // const csvFilePath = "./assets/csvData.csv";
    // const csv = require("csvtojson");
    // csv()
    //   .fromFile(csvFilePath)
    //   .then((jsonObj) => {
    //     console.log(jsonObj);
    //     /**
    //      * [
    //      * 	{a:"1", b:"2", c:"3"},
    //      * 	{a:"4", b:"5". c:"6"}
    //      * ]
    //      */
    //   });
    // const jsonArray = async () => await csv().fromFile(csvFilePath);
    // setJsonData(jsonArray());
    // let csvToJson = require("convert-csv-to-json");
    // let json = csvToJson.getJsonFromCsv("./assets/csvData.csv");
    // for (let i = 0; i < json.length; i++) {
    //   console.log(json[i]);
    // }
  }, []);

  // console.log(jsonData);

  return (
    <div className="App">
      <h1>Hello</h1>
      <Routes>
        <Route path="/" element={<MyResponsiveBar data={collectiveData} />} />
        <Route path="/lineChartPage/:feature" element={<MyResponsiveLine />} />
      </Routes>
    </div>
  );
}

export default App;
