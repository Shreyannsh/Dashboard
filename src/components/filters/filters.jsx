import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { DateRangePicker } from "rsuite";
import "rsuite/DateRangePicker/styles/index.css";
import { useLocation } from "react-router-dom";
function Filters() {
  const location = useLocation();

  const dispatch = useDispatch();
  const ageFilter = useSelector((state) => state.ageFilter);
  const genderFilter = useSelector((state) => state.genderFilter);
  const dateFilter = useSelector((state) => state.dateFilter);
  const { allowedRange } = DateRangePicker;

  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");

  const [value, setValue] = useState([
    new Date(2022, 9, 4),
    new Date(2022, 9, 29),
  ]);

  const [filters, setFilters] = useState({});

  // console.log(filters, "filters");

  const ageFunction = (value) => {
    setAge(value);
    setFilters({ ...filters, age: value });
    dispatch({ type: "ageFilter", payload: value });
    Cookies.set("age", value);
  };

  const genderFunction = (value) => {
    setGender(value);
    setFilters({ ...filters, gender: value });
    dispatch({ type: "genderFilter", payload: value });
    Cookies.set("gender", value);
  };

  const handleChange = (value) => {
    console.log(value);
    setValue(value);
    setFilters({ ...filters, filterDates: value });
    dispatch({ type: "dateFilter", payload: value });
    if (value) {
      Cookies.set("dates", value);
    }
  };

  const closeFunction = () => {
    //console.log("kkkkkk");
    setValue([new Date(2022, 9, 4), new Date(2022, 9, 29)]);
  };

  const [generatedUrl, setGeneratedUrl] = useState("");

  // to copy the url with filters
  const handleGenerateUrl = () => {
    // Convert filters to URL parameters
    const urlParams = new URLSearchParams(filters).toString();
    // Generate the URL
    const url = `${window.location.origin}${window.location.pathname}?${urlParams}`;
    // Set the generated URL to state
    setGeneratedUrl(url);
    // Copy the generated URL to clipboard
    navigator.clipboard.writeText(url);
  };

  //to apply filters
  useEffect(() => {
    dispatch({ type: "filter" });
  }, [ageFilter, genderFilter, dateFilter]);

  //to update filter object to be used to generate url link
  useEffect(() => {
    setFilters({ age: age, gender: gender, filterDates: value });
  }, [age, gender, value]);

  // to retrive filters from url
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params) {
      const queryParams = {};

      for (const [key, value] of params.entries()) {
        queryParams[key] = value;
      }
      console.log(queryParams);
      console.log(queryParams.age);
      console.log(queryParams.gender);
      console.log(queryParams.filterDates);
      setAge(queryParams?.age);
      setGender(queryParams?.gender);
      setValue(queryParams?.filterDates?.split(","));
    }
  }, [location.search]);

  // to update initial values on first render
  useEffect(() => {
    const value1 = Cookies.get("age");
    const value2 = Cookies.get("gender");
    const value3 = Cookies.get("dates");

    const dateStrings = decodeURIComponent(value3).split(",");
    const dates = dateStrings.map((dateStr) => new Date(dateStr));

    setAge(value1);
    setGender(value2);

    if (dates.length > 1) {
      setValue(dates);
      handleChange(dates);
    } else {
      handleChange(value);
    }
  }, []);

  return (
    <div>
      <label>
        Age
        <select value={age} onChange={(e) => ageFunction(e.target.value)}>
          <option value="">Select</option>
          <option value="15-25">15-25</option>
          <option vaue=">25">{`>25`}</option>
        </select>
      </label>
      <label>
        Gender
        <select value={gender} onChange={(e) => genderFunction(e.target.value)}>
          <option value="">Select</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </label>
      <DateRangePicker
        placeholder="Select Date Range"
        value={value}
        onChange={handleChange}
        onClose={closeFunction}
        shouldDisableDate={allowedRange("2022-10-04", "2022-10-29")}
        // defaultValue={[new Date(2022, 10, 4), new Date(2022, 10, 29)]}
      />
      <button onClick={() => handleGenerateUrl()}>
        {generatedUrl ? "Url copied" : "Copy Url"}
      </button>
    </div>
  );
}

export default Filters;
