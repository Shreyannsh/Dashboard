import { data } from "../data";

const initialState = {
  data: data,
  collectiveData: [],
  ageFilter: "",
  genderFilter: "",
  filteredData: data,
};

export const dashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ageFilter":
      return { ...state, ageFilter: action.payload };
    case "genderFilter":
      return { ...state, genderFilter: action.payload };

    case "filter":
      let data = [...state.data];

      if (state.ageFilter) {
        data = data.filter((obj) => obj.Age === state.ageFilter);
      }

      if (state.genderFilter) {
        data = data.filter((obj) => obj.Gender === state.genderFilter);
      }

      return { ...state, filteredData: data };

    case "collectiveData":
      const collectiveData = state.filteredData.reduce(
        (acc, crr) => {
          acc = acc.map((feat) => {
            if (feat?.feature === "A") {
              return { ...feat, hoursUsed: feat.hoursUsed + crr.A };
            }
            if (feat?.feature === "B") {
              return { ...feat, hoursUsed: feat.hoursUsed + crr.B };
            }
            if (feat?.feature === "C") {
              return { ...feat, hoursUsed: feat.hoursUsed + crr.C };
            }
            if (feat?.feature === "D") {
              return { ...feat, hoursUsed: feat.hoursUsed + crr.D };
            }
            if (feat?.feature === "E") {
              return { ...feat, hoursUsed: feat.hoursUsed + crr.E };
            }
            if (feat?.feature === "F") {
              return { ...feat, hoursUsed: feat.hoursUsed + crr.F };
            }
          });
          return acc;
        },
        [
          { feature: "A", hoursUsed: 0, hoursUsedColor: "#3483eb" },
          { feature: "B", hoursUsed: 0, hoursUsedColor: "#3483eb" },
          { feature: "C", hoursUsed: 0, hoursUsedColor: "#3483eb" },
          { feature: "D", hoursUsed: 0, hoursUsedColor: "#3483eb" },
          { feature: "E", hoursUsed: 0, hoursUsedColor: "#3483eb" },
          { feature: "F", hoursUsed: 0, hoursUsedColor: "#3483eb" },
        ]
      );

      return { ...state, collectiveData: collectiveData };

    default:
      return state;
  }
};
