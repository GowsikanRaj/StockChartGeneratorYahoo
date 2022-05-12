import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "./SearchBar";
import Graph from "./Graph";
import Watchlist from "./Watchlist";

const API_KEY = process.env.REACT_APP_KEY;

const App = () => {
  const [stock, setStock] = useState("AAPL");
  const [xValues, setXValues] = useState([]);
  const [yValues, setYValues] = useState([]);
  const [range, setRange] = useState("1y");
  const [interval, setInterval] = useState("1d");

  useEffect(() => {
    const search = async () => {
      console.log(range);
      console.log(interval);
      const data = await axios
        .get(`https://yfapi.net/v8/finance/chart/${stock}`, {
          params: {
            range: range,
            region: "US",
            interval: interval,
            lang: "en",
          },
          headers: {
            "x-api-key": API_KEY,
          },
        })
        .then((response) =>
          JSON.parse(JSON.stringify(response.data.chart.result[0]))
        );

      console.log(data);
      let x = [];
      let y = [];
      for (let i = 0; i <= data["timestamp"].length; i++) {
        if (
          range === "1y" ||
          range === "6mo" ||
          range === "3mo" ||
          range === "1mo"
        ) {
          let date =
            String(new Date(data["timestamp"][i] * 1000).getFullYear()) +
            "-" +
            String(
              new Date(data["timestamp"][i] * 1000).getMonth() + 1
            ).padStart(2, "0") +
            "-" +
            String(new Date(data["timestamp"][i] * 1000).getDate()).padStart(
              2,
              "0"
            );

          x.push(date);
        } else if (range === "1d") {
          let date =
            String(new Date(data["timestamp"][i] * 1000).getHours()) +
            ":" +
            String(new Date(data["timestamp"][i] * 1000).getMinutes()).padStart(
              2,
              "0"
            );

          x.push(date);
        } else if (range === "5d") {
          let date =
            String(new Date(data["timestamp"][i] * 1000).getFullYear()) +
            "-" +
            String(
              new Date(data["timestamp"][i] * 1000).getMonth() + 1
            ).padStart(2, "0") +
            "-" +
            String(new Date(data["timestamp"][i] * 1000).getDate()).padStart(
              2,
              "0"
            ) +
            " " +
            String(new Date(data["timestamp"][i] * 1000).getHours()) +
            ":" +
            String(new Date(data["timestamp"][i] * 1000).getMinutes()).padStart(
              2,
              "0"
            );

          x.push(date);
        }

        y.push(Number(data["indicators"]["quote"][0]["close"][i]).toFixed(2));
      }

      x.pop();
      y.pop();

      setXValues([...x]);
      setYValues([...y]);
    };

    if (stock) {
      search();
    } else {
      const timeoutId = setTimeout(() => {
        if (stock) {
          search();
        }
      }, 500);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [stock, range, interval]);

  const data = xValues.map((x, index) => ({
    name: x,
    stockValues: yValues[index],
  }));

  const changeStock = (value) => {
    setStock(value);
  };

  const timeInterval = (r, i) => {
    setRange(r);
    setInterval(i);
  };

  return (
    <>
      <div className="ui center aligned header" style={{ margin: "10px" }}>
        <h1 className="ui block header">Stock Chart Generator</h1>
      </div>
      <div className="ui grid" style={{ margin: "10px" }}>
        <div className="fourteen wide stretched centered column">
          <SearchBar stock={stock} changeStock={changeStock} />
          <div className="ui center aligned field">
            <Graph stock={stock} data={data} timeInterval={timeInterval} />
          </div>
        </div>
        <div className="two wide column">
          <Watchlist changeStock={changeStock} />
        </div>
      </div>
    </>
  );
};

export default App;
