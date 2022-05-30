import React, { Component } from "react";
import axios from "axios";
class SearchBar extends Component {
  addToWatchlist = async (stock) => {
    console.log(stock);
    await axios.post(
      "https://stock-chart-generator-server.vercel.app/addStock",
      {
        Stock: stock,
      }
    );
  };
  render() {
    const { stock, changeStock } = this.props;
    return (
      <div className="ui form" style={{ marginLeft: "3vw" }}>
        <div className="fields">
          <div className="fourteen wide field">
            <label>Enter Stock Name </label>
            <input
              value={stock}
              onChange={(e) => changeStock(e.target.value)}
              type="text"
              className="input"
              style={{ marginLeft: "2px", width: "10vw" }}
            />
          </div>
          <div className="two wide right floated field">
            <button
              className="positive ui small button"
              style={{ marginTop: "2vh", marginRight: "0vw" }}
              onClick={(e) => this.addToWatchlist(String(stock).toUpperCase())}
            >
              Add to watchlist
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default SearchBar;
