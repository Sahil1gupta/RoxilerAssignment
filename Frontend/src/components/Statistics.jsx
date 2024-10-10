import React, { useState, useEffect } from "react";
import axios from "axios";

const Statistics = ({ month }) => {
  const [stats, setStats] = useState({
    totalSaleAmount: 0,
    totalSoldItems: 0,
    totalUnsoldItems: 0
  });

  useEffect(() => {
    axios
      .get("https://roxilerassignment-3.onrender.com/api/statistics", {
        params: { month }
      })
      .then((res) => setStats(res.data))
      .catch((err) => console.error(err));
  }, [month]);

  return (
    <div>
      <h2>Statistics</h2>
      <p>Total Sale Amount: {stats.totalSaleAmount}</p>
      <p>Total Sold Items: {stats.totalSoldItems}</p>
      <p>Total Unsold Items: {stats.totalUnsoldItems}</p>
      <hr></hr>
    </div>
   
  );
};

export default Statistics;
