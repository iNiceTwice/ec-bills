"use client"

import { Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js"

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler)

// Mock data for the chart
const data = {
  labels: ["Ene 24", "Feb 24", "Mar 24", "Abr 24", "May 24", "Jun 24", "Jul 24", "Ago 24", "Sep 24", "Oct 24", "Nov 24", "Dic 24", "Ene 25", "Feb 25", "Mar 25", "Abr 25", "May 25", "Jun 25"],
  datasets: [
    {
      label: "Gasto Actual",
      data: [
        207458.15,
        547828.22,
        554322.18,
        428777.25,
        451543.80,
        505860.63,
        420490.70,
        500604.82,
        431794.25,
        294414.5, // This represents the dash in the image
        157035.75,
        441464.10,
      ],
      borderColor: "rgba(24, 144, 255, 1)",
      backgroundColor: "rgba(24, 144, 255, 0.1)",
      fill: true,
      tension: 0.4,
    },
    {
      label: "Predicción",
      data: [null, null, null, null, null, null, null, null, null, null, null, 441464.10,
        211300.15,
        524310.22,
        578944.18,
        499089.25,
        464601.80,
        579392.63],
      borderColor: "rgba(250, 173, 20, 1)",
      backgroundColor: "rgba(250, 173, 20, 0.1)",
      borderDash: [5, 5],
      fill: true,
      tension: 0.4,
    },
    {
      label: "Límite Presupuesto",
      data: [    484080.83, 484080.83, 484080.83, 484080.83, 484080.83, 484080.83,
        484080.83, 484080.83, 484080.83, 484080.83, 484080.83, 484080.83,
        484080.83, 484080.83, 484080.83, 484080.83, 484080.83, 484080.83],
      borderColor: "rgba(245, 34, 45, 1)",
      backgroundColor: "transparent",
      borderWidth: 2,
      pointRadius: 0,
      fill: false,
    },
  ],
}

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top",
    },
    tooltip: {
      callbacks: {
        label: (context) => {
          if (context.dataset.label === "Límite Presupuesto") {
            return `Límite: $100`
          }
          return `${context.dataset.label}: $${context.parsed.y}`
        },
      },
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        callback: (value) => "$" + value,
      },
    },
  },
}

const PredictionChart = () => {
  return <Line data={data} options={options} />
}

export default PredictionChart
