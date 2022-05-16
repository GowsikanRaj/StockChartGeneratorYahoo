import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "./SearchBar";
import Graph from "./Graph";
import Watchlist from "./Watchlist";

const API_KEY = process.env.REACT_APP_API_KEY;

const App = () => {
  const [stock, setStock] = useState("AAPL");
  const [xValues, setXValues] = useState([]);
  const [yValues, setYValues] = useState([]);
  const [range, setRange] = useState(365);
  const [interval, setInterval] = useState("1day");
  const [twentyOneEMA, setTwentyOneEMA] = useState([]);
  const [fiftyEMA, setFiftyEMA] = useState([]);
  const [hundredEMA, setHundredEMA] = useState([]);
  const [twoHundredEMA, setTwoHundredEMA] = useState([]);
  const [fiftySMA, setFiftySMA] = useState([]);
  const [hundredSMA, setHundredSMA] = useState([]);
  const [twoHundredSMA, setTwoHundredSMA] = useState([]);

  useEffect(() => {
    if (stock && !xValues.length) {
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

  const search = async () => {
    const data = await axios
      .get(`https://api.twelvedata.com/time_series`, {
        params: {
          symbol: stock,
          interval: interval,
          apikey: API_KEY,
          outputsize: range,
        },
      })
      .then((response) => JSON.parse(JSON.stringify(response.data.values)));

    let x = data.map((item) => item["datetime"]);
    let y = data.map((item) => Number(item["close"]).toFixed(2));

    setXValues([...x].reverse());
    setYValues([...y].reverse());
  };

  const changeStock = (value) => {
    setStock(value);
  };

  const timeInterval = (r, i) => {
    setInterval(i);
    setRange(r);
  };

  const getEMA = async (timePeriod) => {
    const data = await axios
      .get(`https://api.twelvedata.com/ema`, {
        params: {
          symbol: stock,
          interval: interval,
          apikey: API_KEY,
          outputsize: range,
          time_period: timePeriod,
        },
      })
      .then((response) => JSON.parse(JSON.stringify(response.data.values)));

    let values = data.map((item) => item["ema"]);

    if (timePeriod === 21) {
      setTwentyOneEMA(values.reverse());
    } else if (timePeriod === 50) {
      setFiftyEMA(values.reverse());
    } else if (timePeriod === 100) {
      setHundredEMA(values.reverse());
    } else if (timePeriod === 200) {
      setTwoHundredEMA(values.reverse());
    }
  };

  const getSMA = async (timePeriod) => {
    const data = await axios
      .get(`https://api.twelvedata.com/sma`, {
        params: {
          symbol: stock,
          interval: interval,
          apikey: API_KEY,
          outputsize: range,
          time_period: timePeriod,
        },
      })
      .then((response) => JSON.parse(JSON.stringify(response.data.values)));

    let values = data.map((item) => item["sma"]);

    if (timePeriod === 50) {
      setFiftySMA(values.reverse());
    } else if (timePeriod === 100) {
      setHundredSMA(values.reverse());
    } else if (timePeriod === 200) {
      setTwoHundredSMA(values.reverse());
    }
  };

  return (
    <>
      <div className="ui center aligned header" style={{ margin: "20px" }}>
        <h1 className="ui block header">Stock Chart Generator</h1>
      </div>
      <div className="ui grid" style={{ margin: "10px" }}>
        <div className="fourteen wide stretched centered column">
          <SearchBar stock={stock} changeStock={changeStock} />
          <div className="ui center aligned field">
            <Graph
              stock={stock}
              xValues={xValues}
              yValues={yValues}
              getEMA={getEMA}
              getSMA={getSMA}
              twentyOneEMA={twentyOneEMA}
              fiftyEMA={fiftyEMA}
              hundredEMA={hundredEMA}
              twoHundredEMA={twoHundredEMA}
              fiftySMA={fiftySMA}
              hundredSMA={hundredSMA}
              twoHundredSMA={twoHundredSMA}
              timeInterval={timeInterval}
            />
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
