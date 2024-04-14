// install (please try to align the version of installed @nivo packages)
// yarn add @nivo/bar
import { ResponsiveBar } from "@nivo/bar";
import { data } from "../../data";
import { useNavigate } from "react-router-dom";

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
export default function MyResponsiveBar({ data /* see data tab */ }) {
  const navigate = useNavigate();

  const handleClick = (event) => {
    const feature = event.data.feature;
    //console.log(feature);
    navigate(`/lineChartPage/${feature}`);
  };

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
