import React, { Component } from "react";
import { connect } from "react-redux";
import { getWatchlist, removeFromWatchlist } from "../Action";

class Watchlist extends Component {
  componentDidMount() {
    this.props.getWatchlist();
  }
  render() {
    const { changeStock } = this.props;
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
          {this.props.watchlist.map((item) => (
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
                  onClick={() => this.props.removeFromWatchlist(item.id)}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    watchlist: Object.values(state.watchlist),
  };
};

export default connect(mapStateToProps, { getWatchlist, removeFromWatchlist })(
  Watchlist
);
