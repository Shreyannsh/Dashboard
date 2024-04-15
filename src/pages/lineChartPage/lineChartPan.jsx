import React from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import "chartjs-plugin-zoom";
import "chartjs-adapter-moment";
import zoomPlugin from "chartjs-plugin-zoom";
import { useSelector } from "react-redux";

Chart.register(...registerables, zoomPlugin);

export default function LineChart({ data }) {
  const dateRange = useSelector((state) => state.dateFilter);

  const transformedData = dateRange?.map((item) => {
    const date = new Date(item);
    const options = { month: "short", day: "numeric" };
    const formattedDate = date.toLocaleDateString("en-US", options);
    return formattedDate;
  });
  //console.log(transformedData);
  const chartData = {
    labels: data.map((item) => item.day),
    datasets: [
      {
        label: "Hours Used",
        data: data.map((item) => item.hoursUsed),
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: "time",
        time: {
          unit: "day",
        },
        min: transformedData?.length > 0 && transformedData[0], // Minimum date
        max: transformedData?.length > 0 && transformedData[1], // Maximum date
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Hours Used",
        },
      },
    },
    plugins: {
      zoom: {
        zoom: {
          wheel: {
            enabled: true,
          },
          mode: "x",
        },
        pan: {
          enabled: true,
          mode: "xy",
        },
      },
    },
    // interaction: {
    //   axis: "x",
    //   mode: "x",
    //   intersect: false,
    // },
  };

  return <Line options={options} data={chartData} />;
}
