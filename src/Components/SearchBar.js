import React, { Component } from "react";
import { connect } from "react-redux";
import { addToWatchlist } from "../Action";

class SearchBar extends Component {
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
