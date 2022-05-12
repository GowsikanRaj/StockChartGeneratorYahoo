import React, { Component } from "react";
import { connect } from "react-redux";
import { addToWatchlist } from "../Action";

class SearchBar extends Component {
  render() {
    const { stock, changeStock } = this.props;
    return (
      <div className="ui form">
        <div className="fields">
          <div className="thirteen wide field">
            <label>Enter Stock Name </label>
            <input
              value={stock}
              onChange={(e) => changeStock(e.target.value)}
              type="text"
              className="input"
              style={{ marginLeft: "2px", width: "10vw" }}
            />
          </div>
          <div className="three wide field">
            <button
              className="positive ui small button"
              style={{ marginTop: "2vh" }}
              onClick={(e) =>
                this.props.addToWatchlist(String(stock).toUpperCase())
              }
            >
              Add to watchlist
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, { addToWatchlist })(SearchBar);
