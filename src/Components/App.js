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
  const [macd, setMacd] = useState([]);
  const [macdsignal, setMacdsignal] = useState([]);
  const [upperBB, setUpperBB] = useState([]);
  const [middleBB, setMiddleBB] = useState([]);
  const [lowerBB, setLowerBB] = useState([]);

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

    let values = data.map((item) => Number(item["ema"]).toFixed(2));

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

    let values = data.map((item) => Number(item["sma"]).toFixed(2));

    if (timePeriod === 50) {
      setFiftySMA(values.reverse());
    } else if (timePeriod === 100) {
      setHundredSMA(values.reverse());
    } else if (timePeriod === 200) {
      setTwoHundredSMA(values.reverse());
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

  const removeRSI = () => {
    setRSI([]);
  };

  const getMacd = async () => {
    const data = await axios
      .get(`https://api.twelvedata.com/macd`, {
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
      })
      .then((response) => JSON.parse(JSON.stringify(response.data.values)));
    let macD = data.map((item) => Number(item["macd"]).toFixed(2));
    let signal = data.map((item) => Number(item["macd_signal"]).toFixed(2));
    setMacd(macD.reverse());
    setMacdsignal(signal.reverse());
  };

  const removeMACD = () => {
    setMacd([]);
    setMacdsignal([]);
  };

  const getBollingerBands = async () => {
    const data = await axios
      .get(`https://api.twelvedata.com/bbands`, {
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
      })
      .then((response) => JSON.parse(JSON.stringify(response.data.values)));

    let upperband = data.map((item) => Number(item["upper_band"]).toFixed(2));
    let middleband = data.map((item) => Number(item["middle_band"]).toFixed(2));
    let lowerband = data.map((item) => Number(item["lower_band"]).toFixed(2));

    setUpperBB(upperband.reverse());
    setMiddleBB(middleband.reverse());
    setLowerBB(lowerband.reverse());
  };

  const removeBollingerBands = () => {
    setUpperBB([]);
    setMiddleBB([]);
    setLowerBB([]);
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
              macd={macd}
              macdSignal={macdsignal}
              getMacd={getMacd}
              upperband={upperBB}
              middleband={middleBB}
              lowerband={lowerBB}
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
          <Watchlist changeStock={changeStock} />
        </div>
      </div>
    </>
  );
};

export default App;
