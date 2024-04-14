import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";

function Filters() {
  const dispatch = useDispatch();
  const ageFilter = useSelector((state) => state.ageFilter);
  const genderFilter = useSelector((state) => state.genderFilter);

  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");

  console.log(age, gender, ageFilter);

  const ageFunction = (value) => {
    setAge(() => value);
    dispatch({ type: "ageFilter", payload: value });
  };

  const genderFunction = (value) => {
    setGender(() => value);
    dispatch({ type: "genderFilter", payload: value });
  };

  useEffect(() => {
    console.log("hi");
    Cookies.set("age", ageFilter);
  }, [ageFilter]);

  useEffect(() => {
    console.log("hii");
    Cookies.set("gender", genderFilter);
  }, [genderFilter]);

  useEffect(() => {
    dispatch({ type: "filter" });
  }, [ageFilter, genderFilter]);

  useEffect(() => {
    const value1 = Cookies.get("age");
    const value2 = Cookies.get("gender");
    // console.log(value1, value2, "cookiefilter");
    setAge(() => value1);
    setGender(() => value2);
  }, []);

  const value1 = Cookies.get("age");
  const value2 = Cookies.get("gender");
  console.log(Cookies.get("age"), value2, "cookiefilter");
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
    </div>
  );
}

export default Filters;
