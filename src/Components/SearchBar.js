import React, { Component } from "react";
import { connect } from "react-redux";
import { addToWatchlist } from "../Action";

class SearchBar extends Component {
  render() {
    const { stock, changeStock } = this.props;
    return (
      <div className="ui form" style={{ marginLeft: "3vw" }}>
        <div className="fields">
          <div className="eleven wide field">
            <label>Enter Stock Name </label>
            <input
              value={stock}
              onChange={(e) => changeStock(e.target.value)}
              type="text"
              className="input"
              style={{ marginLeft: "2px", width: "10vw" }}
            />
          </div>
          <div className="five wide field">
            <button
              className="positive ui small button"
              style={{ marginTop: "2vh", marginLeft: "3vw" }}
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
