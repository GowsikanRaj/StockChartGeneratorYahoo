import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "./SearchBar";
import Graph from "./Graph";
import Watchlist from "./Watchlist";

const API_KEY = process.env.REACT_APP_API_KEY;

const App = () => {
  const [stock, setStock] = useState("AMZN");
  const [xValues, setXValues] = useState([]);
  const [yValues, setYValues] = useState([]);
  const [range, setRange] = useState(253);
  const [interval, setInterval] = useState("1day");
  const [twentyOneEMA, setTwentyOneEMA] = useState([]);
  const [fiftyEMA, setFiftyEMA] = useState([]);
  const [hundredEMA, setHundredEMA] = useState([]);
  const [twoHundredEMA, setTwoHundredEMA] = useState([]);
  const [fiftySMA, setFiftySMA] = useState([]);
  const [hundredSMA, setHundredSMA] = useState([]);
  const [twoHundredSMA, setTwoHundredSMA] = useState([]);
  const [RSI, setRSI] = useState([]);

  useEffect(() => {
    if (stock && !xValues.length) {
      search();
      if (twentyOneEMA.length !== 0) {
        getEMA(21);
      }
      if (fiftyEMA.length !== 0) {
        getEMA(50);
      }
      if (hundredEMA.length !== 0) {
        getEMA(100);
      }
      if (twoHundredEMA.length !== 0) {
        getEMA(200);
      }
      if (fiftySMA.length !== 0) {
        getSMA(50);
      }
      if (hundredSMA.length !== 0) {
        getSMA(100);
      }
      if (twoHundredSMA.length !== 0) {
        getSMA(200);
      }
      if (RSI.length !== 0) {
        getRSI();
      }
    } else {
      const timeoutId = setTimeout(() => {
        if (stock) {
          search();
          if (twentyOneEMA.length !== 0) {
            getEMA(21);
          }
          if (fiftyEMA.length !== 0) {
            getEMA(50);
          }
          if (hundredEMA.length !== 0) {
            getEMA(100);
          }
          if (twoHundredEMA.length !== 0) {
            getEMA(200);
          }
          if (fiftySMA.length !== 0) {
            getSMA(50);
          }
          if (hundredSMA.length !== 0) {
            getSMA(100);
          }
          if (twoHundredSMA.length !== 0) {
            getSMA(200);
          }
          if (RSI.length !== 0) {
            getRSI();
          }
        }
      }, 500);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [stock, range, interval]);

  const search = async () => {
    setTwentyOneEMA([]);
    setFiftyEMA([]);
    setHundredEMA([]);
    setTwoHundredEMA([]);
    setFiftySMA([]);
    setHundredSMA([]);
    setTwoHundredSMA([]);
    setRSI([]);
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

  const getRSI = async () => {
    const data = await axios
      .get(`https://api.twelvedata.com/rsi`, {
        params: {
          symbol: stock,
          interval: interval,
          apikey: API_KEY,
          outputsize: range,
          time_period: 14,
        },
      })
      .then((response) => JSON.parse(JSON.stringify(response.data.values)));

    let values = data.map((item) => item["rsi"]);
    setRSI(values.reverse());
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
              rsi={RSI}
              getRSI={getRSI}
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
