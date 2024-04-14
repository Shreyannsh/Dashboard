import { ResponsiveBar } from "@nivo/bar";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

export default function MyResponsiveBar({ data }) {
  const filterData = useSelector((state) => state.filteredData);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = (event) => {
    const feature = event.data.feature;
    navigate(`/lineChartPage/${feature}`);
  };

  useEffect(() => {
    dispatch({ type: "collectiveData" });
  }, [filterData]);

  return (
    <ResponsiveBar
      data={data}
      keys={["hoursUsed"]}
      indexBy="feature"
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      padding={0.5}
      valueScale={{ type: "linear" }}
      layout="horizontal"
      indexScale={{ type: "band", round: true }}
      colors={{ scheme: "category10" }}
      onClick={(e) => handleClick(e)}
      enableGridX={true}
      enableGridY={false}
      borderColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "hours",
        legendPosition: "middle",
        legendOffset: 42,
        truncateTickAt: 0,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "features",
        legendPosition: "middle",
        legendOffset: -40,
        truncateTickAt: 0,
      }}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{
        from: "inherit",
        modifiers: [["brighter", 1]],
      }}
      legends={[
        {
          dataFrom: "keys",
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 120,
          translateY: 0,
          itemsSpacing: 2,
          itemWidth: 100,
          itemHeight: 20,
          itemDirection: "left-to-right",
          itemOpacity: 0.85,
          symbolSize: 20,
          effects: [
            {
              on: "hover",
              style: {
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
      role="application"
      ariaLabel="Nivo bar chart demo"
      barAriaLabel={(e) =>
        e.id + ": " + e.formattedValue + " in country: " + e.indexValue
      }
    />
  );
}
