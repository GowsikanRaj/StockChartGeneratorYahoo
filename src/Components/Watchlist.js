import React from "react";

const Watchlist = ({ changeStock, watchlist, removeFromWatchlist }) => {
  return (
    <table className="ui celled table">
      <thead>
        <tr>
          <th
            style={{
              display: "flex",
              justifyContent: "center",
              fontFamily: "sans-serif",
            }}
          >
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
