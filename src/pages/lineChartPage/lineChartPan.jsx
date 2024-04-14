import React from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import "chartjs-plugin-zoom";
import "chartjs-adapter-moment";
import zoomPlugin from "chartjs-plugin-zoom";

Chart.register(...registerables, zoomPlugin);

export default function LineChart({ data }) {
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
  };

  return <Line options={options} data={chartData} />;
}
