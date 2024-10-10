import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js"; // Updated imports
import axios from "axios";

// Register the necessary components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const PriceDistributionChart = ({ month }) => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Number of Items",
        data: [],
        backgroundColor: "rgba(75, 192, 192, 0.6)"
      }
    ]
  });

  useEffect(() => {
    axios
      .get("https://roxilerassignment-3.onrender.com/api/price-distribution", {
        params: { month }
      })
      .then((res) => {
        const labels = res.data.map((bucket) => bucket._id);
        const data = res.data.map((bucket) => bucket.count);

        setChartData({
          labels,
          datasets: [
            {
              label: "Number of Items",
              data,
              backgroundColor: "rgba(75, 192, 192, 0.6)"
            }
          ]
        });
      })
      .catch((err) => console.error(err));
  }, [month]);

  return (
    <div>
      <h2>Price Distribution</h2>
      {chartData.labels.length > 0 ? <Bar data={chartData} /> : <p>Loading...</p>}
      <hr>
      </hr>
    </div>
  );
};

export default PriceDistributionChart;
