import { data } from "../data";

const collectiveData = data.reduce(
  (acc, crr) => {
    //console.log(acc);
    acc = acc.map((feat) => {
      // console.log(feat);
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

//console.log(collectiveData);

const initialState = {
  data: data,
  collectiveData: collectiveData,
};

export const dashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
