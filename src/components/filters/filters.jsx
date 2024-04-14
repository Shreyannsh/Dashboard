import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import TimeRangePicker from "@wojtekmaj/react-timerange-picker";

function Filters() {
  const dispatch = useDispatch();
  const ageFilter = useSelector((state) => state.ageFilter);
  const genderFilter = useSelector((state) => state.genderFilter);

  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");

  const [value, onChange] = useState(["10:00", "11:00"]);

  const ageFunction = (value) => {
    setAge(() => value);
    dispatch({ type: "ageFilter", payload: value });
    Cookies.set("age", value);
  };

  const genderFunction = (value) => {
    setGender(() => value);
    dispatch({ type: "genderFilter", payload: value });
    Cookies.set("gender", value);
  };

  //   useEffect(() => {
  //     console.log("hi", age);
  //     Cookies.set("agee", 999);
  //     Cookies.set("age", age);
  //   }, [age]);

  //   useEffect(() => {
  //     console.log("hii", gender);
  //     Cookies.set("gender", gender);
  //   }, [gender]);

  useEffect(() => {
    dispatch({ type: "filter" });
  }, [ageFilter, genderFilter]);

  useEffect(() => {
    const value1 = Cookies.get("age");
    const value2 = Cookies.get("gender");
    setAge(value1);
    setGender(value2);
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
      <div>
        <TimeRangePicker onChange={onChange} value={value} />
      </div>
    </div>
  );
}

export default Filters;
