import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"; // Updated imports
import axios from "axios";

// Register the necessary components
ChartJS.register(ArcElement, Tooltip, Legend);

const CategoryDistributionChart = ({ month }) => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Categories",
        data: [],
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)"
        ]
      }
    ]
  });

  useEffect(() => {
    axios
      .get("https://roxilerassignment-3.onrender.com/api/category-distribution", {
        params: { month }
      })
      .then((res) => {
        const labels = res.data.map((item) => item._id);
        const data = res.data.map((item) => item.itemCount);

        setChartData({
          labels,
          datasets: [
            {
              label: "Categories",
              data,
              backgroundColor: [
                "rgba(255, 99, 132, 0.6)",
                "rgba(54, 162, 235, 0.6)",
                "rgba(255, 206, 86, 0.6)"
              ]
            }
          ]
        });
      })
      .catch((err) => console.error(err));
  }, [month]);

  return (
    <div>
      <h2>Category Distribution</h2>
      {chartData.labels.length > 0 ? <Pie data={chartData} /> : <p>Loading...</p>}
      <hr></hr>
    </div>
  );
};

export default CategoryDistributionChart;
