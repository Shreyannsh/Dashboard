import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { DateRangePicker } from "rsuite";
import "rsuite/DateRangePicker/styles/index.css";
function Filters() {
  const dispatch = useDispatch();
  const ageFilter = useSelector((state) => state.ageFilter);
  const genderFilter = useSelector((state) => state.genderFilter);
  const dateFilter = useSelector((state) => state.dateFilter);
  const { combine, allowedRange } = DateRangePicker;

  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");

  const [value, setValue] = useState([
    new Date(2022, 9, 4),
    new Date(2022, 9, 29),
  ]);

  const ageFunction = (value) => {
    setAge(() => value);
    dispatch({ type: "ageFilter", payload: value });
    Cookies.set("age", value);
  };

  const genderFunction = (value) => {
    console.log("xxxxxxxxxx");
    setGender(() => value);
    dispatch({ type: "genderFilter", payload: value });
    Cookies.set("gender", value);
  };

  const handleChange = (value) => {
    // console.log(value);
    // let arr = [];
    // if (value) {
    //   value?.forEach((item) => {
    //     const date = new Date(item);
    //     const options = { month: "short", day: "numeric" };
    //     const formattedDate = date.toLocaleDateString("en-US", options);
    //     arr = [...arr, formattedDate];
    //   });
    // }
    console.log("hiiiii");
    console.log(value, "value");
    setValue(() => value);
    dispatch({ type: "dateFilter", payload: value });
    if (value) {
      console.log("00000");
      Cookies.set("dates", value);
    }
  };

  useEffect(() => {
    dispatch({ type: "filter" });
  }, [ageFilter, genderFilter, dateFilter]);

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
      console.log("kkkkkkkkk");
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
        shouldDisableDate={allowedRange("2022-10-04", "2022-10-29")}
        // defaultValue={[new Date(2022, 10, 4), new Date(2022, 10, 29)]}
      />
    </div>
  );
}

export default Filters;
