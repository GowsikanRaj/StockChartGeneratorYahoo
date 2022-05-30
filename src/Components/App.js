import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "./SearchBar";
import Graph from "./Graph";
import Watchlist from "./Watchlist";
import Snackbar from "./Alert";
import Indicators from "./Indicators";
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
  const [macd, setMacd] = useState([]);
  const [macdsignal, setMacdsignal] = useState([]);
  const [macdhistogram, setMacdhistogram] = useState([]);
  const [upperBB, setUpperBB] = useState([]);
  const [middleBB, setMiddleBB] = useState([]);
  const [lowerBB, setLowerBB] = useState([]);
  const [error, setError] = useState(false);
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    if (stock && !xValues.length) {
      search();
      getWatchlist();
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
      if (macd.length !== 0) {
        getMacd();
      }
      if (upperBB.length !== 0) {
        getBollingerBands();
      }
    } else {
      const timeoutId = setTimeout(() => {
        if (stock) {
          search();
          getWatchlist();
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
          if (macd.length !== 0) {
            getMacd();
          }
          if (upperBB.length !== 0) {
            getBollingerBands();
          }
        }
      }, 500);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [stock, range, interval]);

  const getWatchlist = async () => {
    const { data } = await axios.get("http://localhost:3001/getWatchlist");
    setWatchlist(data);
  };

  const removeFromWatchlist = async (id) => {
    await axios.post("http://localhost:3001/deleteStock", {
      id: id,
    });
    getWatchlist();
  };

  const addToWatchlist = async (stock) => {
    await axios.post("http://localhost:3001/addStock", {
      Stock: stock,
    });
    getWatchlist();
  };

  const search = async () => {
    const { data } = await axios.get(`https://api.twelvedata.com/time_series`, {
      params: {
        symbol: stock,
        interval: interval,
        apikey: API_KEY,
        outputsize: range,
      },
    });

    if (data["code"] === 429) {
      setError(true);
    } else {
      setError(false);
      let x = data["values"].map((item) => item["datetime"]);
      let y = data["values"].map((item) => Number(item["close"]).toFixed(2));
      setXValues([...x].reverse());
      setYValues([...y].reverse());
    }
  };

  const changeStock = (value) => {
    setStock(value);
  };

  const timeInterval = (r, i) => {
    setInterval(i);
    setRange(r);
  };

  const getEMA = async (timePeriod) => {
    const { data } = await axios.get(`https://api.twelvedata.com/ema`, {
      params: {
        symbol: stock,
        interval: interval,
        apikey: API_KEY,
        outputsize: range,
        time_period: timePeriod,
      },
    });

    if (data["code"] === 429) {
      setError(true);
    } else {
      let values = data["values"].map((item) => Number(item["ema"]).toFixed(2));

      if (timePeriod === 21) {
        setTwentyOneEMA(values.reverse());
      } else if (timePeriod === 50) {
        setFiftyEMA(values.reverse());
      } else if (timePeriod === 100) {
        setHundredEMA(values.reverse());
      } else if (timePeriod === 200) {
        setTwoHundredEMA(values.reverse());
      }
    }
  };

  const removeEMA = async (timePeriod) => {
    if (timePeriod === 21) {
      setTwentyOneEMA([]);
    } else if (timePeriod === 50) {
      setFiftyEMA([]);
    } else if (timePeriod === 100) {
      setHundredEMA([]);
    } else if (timePeriod === 200) {
      setTwoHundredEMA([]);
    }
  };

  const getSMA = async (timePeriod) => {
    const { data } = await axios.get(`https://api.twelvedata.com/sma`, {
      params: {
        symbol: stock,
        interval: interval,
        apikey: API_KEY,
        outputsize: range,
        time_period: timePeriod,
      },
    });

    if (data["code"] === 429) {
      setError(true);
    } else {
      let values = data["values"].map((item) => Number(item["sma"]).toFixed(2));

      if (timePeriod === 50) {
        setFiftySMA(values.reverse());
      } else if (timePeriod === 100) {
        setHundredSMA(values.reverse());
      } else if (timePeriod === 200) {
        setTwoHundredSMA(values.reverse());
      }
    }
  };

  const removeSMA = async (timePeriod) => {
    if (timePeriod === 50) {
      setFiftySMA([]);
    } else if (timePeriod === 100) {
      setHundredSMA([]);
    } else if (timePeriod === 200) {
      setTwoHundredSMA([]);
    }
  };

  const getRSI = async () => {
    const { data } = await axios.get(`https://api.twelvedata.com/rsi`, {
      params: {
        symbol: stock,
        interval: interval,
        apikey: API_KEY,
        outputsize: range,
        time_period: 14,
      },
    });

    if (data["code"] === 429) {
      setError(true);
    } else {
      let values = data["values"].map((item) => item["rsi"]);
      setRSI(values.reverse());
    }
  };

  const removeRSI = () => {
    setRSI([]);
  };

  const getMacd = async () => {
    const { data } = await axios.get(`https://api.twelvedata.com/macd`, {
      params: {
        symbol: stock,
        interval: interval,
        apikey: API_KEY,
        outputsize: range,
        fast_period: 12,
        series_type: "close",
        signal_period: 9,
        slow_period: 26,
      },
    });

    if (data["code"] === 429) {
      setError(true);
    } else {
      let macD = data["values"].map((item) => Number(item["macd"]).toFixed(2));
      let signal = data["values"].map((item) =>
        Number(item["macd_signal"]).toFixed(2)
      );
      let hist = data["values"].map((item) =>
        Number(item["macd_hist"]).toFixed(2)
      );
      setMacd(macD.reverse());
      setMacdsignal(signal.reverse());
      setMacdhistogram(hist.reverse());
    }
  };

  const removeMACD = () => {
    setMacd([]);
    setMacdsignal([]);
  };

  const getBollingerBands = async () => {
    const { data } = await axios.get(`https://api.twelvedata.com/bbands`, {
      params: {
        symbol: stock,
        interval: interval,
        apikey: API_KEY,
        outputsize: range,
        ma_type: "SMA",
        series_type: "close",
        sd: 2,
        time_period: 20,
      },
    });

    if (data["code"] === 429) {
      setError(true);
    } else {
      let upperband = data["values"].map((item) =>
        Number(item["upper_band"]).toFixed(2)
      );
      let middleband = data["values"].map((item) =>
        Number(item["middle_band"]).toFixed(2)
      );
      let lowerband = data["values"].map((item) =>
        Number(item["lower_band"]).toFixed(2)
      );

      setUpperBB(upperband.reverse());
      setMiddleBB(middleband.reverse());
      setLowerBB(lowerband.reverse());
    }
  };

  const removeBollingerBands = () => {
    setUpperBB([]);
    setMiddleBB([]);
    setLowerBB([]);
  };

  const closeMessage = () => {
    setError(false);
  };

  return (
    <>
      <div className="ui center aligned header" style={{ margin: "20px" }}>
        <h1 className="ui block header">Stock Chart Generator</h1>
      </div>

      <div className="ui grid" style={{ margin: "10px", width: "100%" }}>
        <div className="sixteen wide stretched column">
          {error ? <Snackbar closeMessage={closeMessage} /> : ""}
        </div>

        <div className="fourteen wide stretched centered column">
          <SearchBar
            stock={stock}
            changeStock={changeStock}
            addToWatchlist={addToWatchlist}
          />
          <div className="ui center aligned field">
            <Graph
              stock={stock}
              xValues={xValues}
              yValues={yValues}
              twentyOneEMA={twentyOneEMA}
              fiftyEMA={fiftyEMA}
              hundredEMA={hundredEMA}
              twoHundredEMA={twoHundredEMA}
              fiftySMA={fiftySMA}
              hundredSMA={hundredSMA}
              twoHundredSMA={twoHundredSMA}
              timeInterval={timeInterval}
              rsi={RSI}
              macd={macd}
              macdSignal={macdsignal}
              macdHistogram={macdhistogram}
              upperband={upperBB}
              middleband={middleBB}
              lowerband={lowerBB}
            />
            <Indicators
              getEMA={getEMA}
              getSMA={getSMA}
              getRSI={getRSI}
              getMacd={getMacd}
              getBollingerBands={getBollingerBands}
              removeEMA={removeEMA}
              removeSMA={removeSMA}
              removeRSI={removeRSI}
              removeMACD={removeMACD}
              removeBollingerBands={removeBollingerBands}
            />
          </div>
        </div>
        <div className="two wide column">
          <Watchlist
            changeStock={changeStock}
            watchlist={watchlist}
            removeFromWatchlist={removeFromWatchlist}
          />
        </div>
      </div>
    </>
  );
};

export default App;
