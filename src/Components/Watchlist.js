import axios from "axios";
import React, { useState, useEffect } from "react";

const Watchlist = ({ changeStock }) => {
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get(
        "https://stockchartgeneratortwelvedata.herokuapp.com/getWatchlist"
      );
      setWatchlist(data);
    };

    getData();
  }, [watchlist]);

  const removeFromWatchlist = async (id) => {
    await axios.post(
      "https://stockchartgeneratortwelvedata.herokuapp.com/deleteStock",
      {
        id: id,
      }
    );
  };

  return (
    <table className="ui celled table">
      <thead>
        <tr>
          <th style={{ display: "flex", justifyContent: "center" }}>
            Stock Watchlist
          </th>
        </tr>
      </thead>
      <tbody>
        {watchlist.map((item) => (
          <tr>
            <td>
              <button
                className="ui tiny button"
                onClick={() => changeStock(item.Stock)}
              >
                {item.Stock}
              </button>
              <button
                className="negative ui right floated tiny button"
                onClick={() => removeFromWatchlist(item.id)}
              >
                Remove
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Watchlist;
