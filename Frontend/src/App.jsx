import React, { useState } from "react";
import TransactionsTable from "./components/TransactionsTable";
import Statistics from "./components/Statistics";
import PriceDistributionChart from "./components/PriceDistributionChart";
import CategoryDistributionChart from "./components/CategoryDistributionChart";

function App() {
  const [month, setMonth] = useState("3"); // Default to October
  const [search, setSearch] = useState("");

  return (
    <div className="App">
      <h1>Product Dashboard</h1>

      <div>
        <label>Select Month:</label>
        <select value={month} onChange={(e) => setMonth(e.target.value)}>
          <option value="1">January</option>
          <option value="2">February</option>
          <option value="3">March</option>
          <option value="4">April</option>
          <option value="5">May</option>
          <option value="6">June</option>
          <option value="7">July</option>
          <option value="8">August</option>
          <option value="9">September</option>
          <option value="10">October</option>
          <option value="11">November</option>
          <option value="12">December</option>
        </select>
      </div>
      
      <TransactionsTable month={month} search={search} setSearch={setSearch} />
      <Statistics month={month} />
      <PriceDistributionChart month={month} />
      <CategoryDistributionChart month={month} />
    </div>
  );
}

export default App;
