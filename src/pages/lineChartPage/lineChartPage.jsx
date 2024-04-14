// install (please try to align the version of installed @nivo packages)
// yarn add @nivo/line
import "./lineChartPage.css";
import { ResponsiveLine } from "@nivo/line";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { ZoomPan } from "react-zoom-pan-pinch";
import LineChart from "./lineChartPan";
//import { ReactSVGPanZoom } from "react-svg-pan-zoom";
// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.

export default function MyResponsiveLine() {
  const { feature } = useParams();
  console.log(feature, "feature");
  const data = useSelector((state) => state.data);
  console.log(data);
  const requiredFeature = data.reduce((acc, crr) => {
    const existingDayIndex = acc.findIndex((obj) => obj?.day === crr.Day);

    if (existingDayIndex !== -1) {
      acc[existingDayIndex] = {
        ...acc[existingDayIndex],
        hoursUsed: acc[existingDayIndex].hoursUsed + crr[feature],
      };
    } else {
      acc.push({ day: crr.Day, hoursUsed: crr[feature] });
    }

    return acc;
  }, []);

  const transformedData = requiredFeature.map((item) => {
    const [day, month, year] = item?.day.split("/");

    // Create a Date object
    const date = new Date(`${year}-${month}-${day}`);

    // Get the month name
    const monthName = date.toLocaleString("en-US", { month: "short" });

    // Format the date as "DD Mon"
    const formattedDate = `${day} ${monthName}`;
    return {
      day: formattedDate,
      hoursUsed: item.hoursUsed,
    };
  });

  return (
    <div className="lineChartPage">
      {/* <ReactSVGPanZoom
        width={800}
        height={600}
        toolbarPosition="none"
        detectAutoPan={false}
        detectWheel={false}
        onClick={(event) => console.log(event.x, event.y, event.originalEvent)}
      > */}
      {/* <TransformWrapper>
        <TransformComponent>
          <ResponsiveLine
            data={[{ id: "hoursUsed", data: transformedData }]}
            margin={{ top: 50, right: 110, bottom: 50, left: 90 }}
            yScale={{ type: "linear" }}
            xScale={{ type: "point" }}
            axisTop={null}
            axisRight={null}
            axisBottom={{
              orient: "bottom",
              tickSize: 5,
              tickPadding: 5,
              tickRotation: -45,
              legend: "Dates",
              legendOffset: 46,
              legendPosition: "middle",
              legendTextStyle: {
                fontSize: 18, // Customize font size here
                fontWeight: "bold", // Customize font weight here
                fill: "red",
              },
            }}
            axisLeft={{
              orient: "left",
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: "Hours used",
              legendOffset: -50,
              legendPosition: "middle",
            }}
            enableGridX={false}
            enableGridY={true}
            enablePoints={true}
            enableCrosshair={false}
            useMesh={true}
          />
        </TransformComponent>
      </TransformWrapper> */}
      {/* </ReactSVGPanZoom> */}
      <LineChart data={transformedData} />
    </div>
  );
}
