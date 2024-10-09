import React, { useState, useEffect } from "react";
import axios from "axios";

const TransactionsTable = ({ month, search, setSearch }) => {
  const [transactions, setTransactions] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false); // Added loading state

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Start loading
      try {
        const res = await axios.get("http://localhost:3000/api/transaction", {
          params: { month, search, page, limit: 10 }
        });
        setTransactions(res.data.transactions);
        setTotalPages(res.data.totalPages);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchData();
  }, [month, search, page]);

  return (
    <div>
      <h2>Transactions</h2>
      <h3>Search by title, description, price...</h3>
      <input
        type="text"
        placeholder="Search by title, description, price..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Price</th>
            <th>Category</th>
            <th>Sold</th>
            <th>Date of Sale</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="5">Loading...</td>
            </tr>
          ) : transactions.length > 0 ? (
            transactions.map((item) => (
              <tr key={item.id}>
                <td>{item.title}</td>
                <td>{item.price}</td>
                <td>{item.category}</td>
                <td>{item.sold ? "Yes" : "No"}</td>
                <td>{new Date(item.dateOfSale).toLocaleDateString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No transactions found.</td>
            </tr>
          )}
        </tbody>
      </table>
      <button onClick={() => setPage((prev) => Math.max(prev - 1, 1))} disabled={page === 1}>
        Previous
      </button>
      <button onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))} disabled={page === totalPages}>
        Next
      </button>
      <hr></hr>
    </div>
  );
};

export default TransactionsTable;
