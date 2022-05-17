import React, { useState } from "react";
import {
  LineChart,
  ComposedChart,
  Line,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  ReferenceLine,
} from "recharts";

const Graph = ({
  xValues,
  yValues,
  getEMA,
  getSMA,
  twentyOneEMA,
  fiftyEMA,
  hundredEMA,
  twoHundredEMA,
  fiftySMA,
  hundredSMA,
  twoHundredSMA,
  stock,
  timeInterval,
  rsi,
  getRSI,
  macd,
  macdSignal,
  getMacd,
  upperband,
  middleband,
  lowerband,
  getBollingerBands,
  removeEMA,
  removeSMA,
  removeRSI,
  removeMACD,
  removeBollingerBands,
}) => {
  const [openTwentyOneEMA, setOpenTwentyOneEMA] = useState(false);
  const [openFiftyEMA, setOpenFiftyEMA] = useState(false);
  const [openHundredEMA, setOpenHundredEMA] = useState(false);
  const [openTwoHundredEMA, setOpenTwoHundredEMA] = useState(false);
  const [openFiftySMA, setOpenFiftySMA] = useState(false);
  const [openHundredSMA, setOpenHundredSMA] = useState(false);
  const [openTwoHundredSMA, setOpenTwoHundredSMA] = useState(false);
  const [openRSI, setOpenRSI] = useState(false);
  const [openMACD, setOpenMACD] = useState(false);
  const [openBB, setOpenBB] = useState(false);

  const data = xValues.map((item, index) => ({
    name: item,
    stockValues: yValues[index],
    twentyOneEMA: twentyOneEMA[index],
    fiftyEMA: fiftyEMA[index],
    hundredEMA: hundredEMA[index],
    twoHundredEMA: twoHundredEMA[index],
    fiftySMA: fiftySMA[index],
    hundredSMA: hundredSMA[index],
    twoHundredSMA: twoHundredSMA[index],
    upperBand: upperband[index],
    middleBand: middleband[index],
    lowerBand: lowerband[index],
  }));

  const rsiData = xValues.map((item, index) => ({
    name: item,
    rsiValues: rsi[index],
    overSold: 30,
    overBought: 70,
  }));

  const macdData = xValues.map((item, index) => ({
    name: item,
    macdValues: macd[index],
    macdsignalValues: macdSignal[index],
  }));

  const md = macd.map((y) => y);
  const mdAxisRange = md.sort(function (a, b) {
    return a - b;
  });

  const macdMin = mdAxisRange[0];
  const macdMax = mdAxisRange[macd.length - 1];

  const y = data.map((y) => y);
  const yAxisRange = y.sort(function (a, b) {
    return a - b;
  });
  const yMin = yAxisRange[0];
  const yMax = yAxisRange[yValues.length - 1];

  const addema = (timeperiod) => {
    if (timeperiod === 21) {
      setOpenTwentyOneEMA(true);
      getEMA(21);
    } else if (timeperiod === 50) {
      setOpenFiftyEMA(true);
      getEMA(50);
    } else if (timeperiod === 100) {
      setOpenHundredEMA(true);
      getEMA(100);
    } else if (timeperiod === 200) {
      setOpenTwoHundredEMA(true);
      getEMA(200);
    }
  };

  const removeema = (timeperiod) => {
    if (timeperiod === 21) {
      setOpenTwentyOneEMA(false);
      removeEMA(21);
    } else if (timeperiod === 50) {
      setOpenFiftyEMA(false);
      removeEMA(50);
    } else if (timeperiod === 100) {
      setOpenHundredEMA(false);
      removeEMA(100);
    } else if (timeperiod === 200) {
      setOpenTwoHundredEMA(false);
      removeEMA(200);
    }
  };

  const addsma = (timeperiod) => {
    if (timeperiod === 50) {
      setOpenFiftySMA(true);
      getSMA(50);
    } else if (timeperiod === 100) {
      setOpenHundredSMA(true);
      getSMA(100);
    } else if (timeperiod === 200) {
      setOpenTwoHundredSMA(true);
      getSMA(200);
    }
  };

  const removesma = (timeperiod) => {
    if (timeperiod === 50) {
      setOpenFiftySMA(false);
      removeSMA(50);
    } else if (timeperiod === 100) {
      setOpenHundredSMA(false);
      removeSMA(100);
    } else if (timeperiod === 200) {
      setOpenTwoHundredSMA(false);
      removeSMA(200);
    }
  };

  const addrsi = () => {
    setOpenRSI(true);
    getRSI();
  };

  const removersi = () => {
    setOpenRSI(false);
    removeRSI();
  };

  const addmacd = () => {
    setOpenMACD(true);
    getMacd();
  };

  const removemacd = () => {
    setOpenMACD(false);
    removeMACD();
  };

  const addbb = () => {
    setOpenBB(true);
    getBollingerBands();
  };

  const removebb = () => {
    setOpenBB(false);
    removeBollingerBands();
  };

  return (
    <>
      <h3 style={{ display: "flex", justifyContent: "center" }}>
        Stock Chart for {String(stock).toUpperCase()}
      </h3>
      <div style={{ marginBottom: "2vh" }}>
        <button
          className="ui tiny button"
          onClick={() => timeInterval(390, "1min")}
        >
          1d
        </button>
        <button
          className="ui tiny button"
          onClick={() => timeInterval(390, "5min")}
        >
          1w
        </button>
        <button
          className="ui tiny button"
          onClick={() => timeInterval(21, "1day")}
        >
          1m
        </button>
        <button
          className="ui tiny button"
          onClick={() => timeInterval(63, "1day")}
        >
          3m
        </button>
        <button
          className="ui tiny button"
          onClick={() => timeInterval(126, "1day")}
        >
          6m
        </button>
        <button
          className="ui tiny button"
          onClick={() => timeInterval(253, "1day")}
        >
          1y
        </button>
      </div>

      <ComposedChart width={1500} height={750} data={data}>
        {upperband.length !== 0 ? (
          <>
            <Area
              type="monotone"
              dataKey="upperBand"
              name="Upper Bollinger Band"
              stroke="blue"
              fill="blue"
              fillOpacity={0.05}
            />
            <Area
              type="monotone"
              dataKey="middleBand"
              name="Middle Bollinger Band"
              stroke="orange"
              fill="blue"
              fillOpacity={0.05}
            />
            <Area
              type="monotone"
              dataKey="lowerBand"
              name="Lower Bollinger Band"
              stroke="blue"
              fill="white"
              fillOpacity={1}
            />
          </>
        ) : (
          ""
        )}
        <Line
          type="monotone"
          dataKey="stockValues"
          name={stock}
          stroke="blue"
          strokeWidth={2}
          dot={false}
        />
        {twentyOneEMA.length !== 0 ? (
          <Line
            type="monotone"
            dataKey="twentyOneEMA"
            name="21 EMA"
            stroke="black"
            strokeWidth={2}
            dot={false}
          />
        ) : (
          ""
        )}
        {fiftyEMA.length !== 0 ? (
          <Line
            type="monotone"
            dataKey="fiftyEMA"
            name="50 EMA"
            stroke="red"
            strokeWidth={2}
            dot={false}
          />
        ) : (
          ""
        )}
        {hundredEMA.length !== 0 ? (
          <Line
            type="monotone"
            dataKey="hundredEMA"
            name="100 EMA"
            stroke="yellow"
            strokeWidth={2}
            dot={false}
          />
        ) : (
          ""
        )}
        {twoHundredEMA.length !== 0 ? (
          <Line
            type="monotone"
            dataKey="twoHundredEMA"
            name="200 EMA"
            stroke="purple"
            strokeWidth={2}
            dot={false}
          />
        ) : (
          ""
        )}
        {fiftySMA.length !== 0 ? (
          <Line
            type="monotone"
            dataKey="fiftySMA"
            name="50 SMA"
            stroke="green"
            strokeWidth={2}
            dot={false}
          />
        ) : (
          ""
        )}
        {hundredSMA.length !== 0 ? (
          <Line
            type="monotone"
            dataKey="hundredSMA"
            name="100 SMA"
            stroke="orange"
            strokeWidth={2}
            dot={false}
          />
        ) : (
          ""
        )}
        {twoHundredSMA.length !== 0 ? (
          <Line
            type="monotone"
            dataKey="twoHundredSMA"
            name="200 SMA"
            stroke="pink"
            strokeWidth={2}
            dot={false}
          />
        ) : (
          ""
        )}

        <CartesianGrid stroke="#ccc" />
        {rsi.length === 0 && macd.length === 0 ? <XAxis dataKey="name" /> : ""}
        <YAxis type="number" domain={[yMin, yMax]} />
        <Legend />
      </ComposedChart>

      {rsi.length !== 0 ? (
        <LineChart
          width={1500}
          height={150}
          data={rsiData}
          margin={{
            top: 20,
          }}
        >
          <Line
            type="monotone"
            dataKey="rsiValues"
            stroke="purple"
            strokeWidth={2}
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="overSold"
            stroke="green"
            strokeWidth={2}
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="overBought"
            stroke="red"
            strokeWidth={2}
            dot={false}
          />
          {macd.length === 0 ? <XAxis dataKey="name" /> : ""}
          <YAxis type="number" />
          <ReferenceLine y={0} />
        </LineChart>
      ) : (
        ""
      )}

      {macd.length !== 0 ? (
        <ComposedChart
          width={1500}
          height={150}
          data={macdData}
          margin={{
            top: 20,
          }}
        >
          <Line
            type="monotone"
            dataKey="macdValues"
            stroke="blue"
            strokeWidth={2}
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="macdsignalValues"
            stroke="orange"
            strokeWidth={2}
            dot={false}
          />
          <XAxis dataKey="name" />
          <YAxis type="number" domain={[macdMin - 0.5, macdMax + 0.5]} />
          <ReferenceLine y={0} stroke="#000" />
        </ComposedChart>
      ) : (
        ""
      )}
      <div className="row" style={{ marginTop: "5vh" }}>
        {openTwentyOneEMA ? (
          <button className="negative ui button" onClick={() => removeema(21)}>
            Remove 21 EMA
          </button>
        ) : (
          <button className="positive ui button" onClick={() => addema(21)}>
            Add 21 EMA
          </button>
        )}
        {openFiftyEMA ? (
          <button className="negative ui button" onClick={() => removeema(50)}>
            Remove 50 EMA
          </button>
        ) : (
          <button className="positive ui button" onClick={() => addema(50)}>
            Add 50 EMA
          </button>
        )}
        {openHundredEMA ? (
          <button className="negative ui button" onClick={() => removeema(100)}>
            Remove 100 EMA
          </button>
        ) : (
          <button className="positive ui button" onClick={() => addema(100)}>
            Add 100 EMA
          </button>
        )}
        {openTwoHundredEMA ? (
          <button className="negative ui button" onClick={() => removeema(200)}>
            Remove 200 EMA
          </button>
        ) : (
          <button className="positive ui button" onClick={() => addema(200)}>
            Add 200 EMA
          </button>
        )}
        {openFiftySMA ? (
          <button className="negative ui button" onClick={() => removesma(50)}>
            Remove 50 SMA
          </button>
        ) : (
          <button className="positive ui button" onClick={() => addsma(50)}>
            Add 50 SMA
          </button>
        )}
        {openHundredSMA ? (
          <button className="negative ui button" onClick={() => removesma(100)}>
            Remove 100 SMA
          </button>
        ) : (
          <button className="positive ui button" onClick={() => addsma(100)}>
            Add 100 SMA
          </button>
        )}
        {openTwoHundredSMA ? (
          <button className="negative ui button" onClick={() => removesma(200)}>
            Remove 200 SMA
          </button>
        ) : (
          <button className="positive ui button" onClick={() => addsma(200)}>
            Add 200 SMA
          </button>
        )}
        {openRSI ? (
          <button className="negative ui button" onClick={() => removersi()}>
            Remove RSI
          </button>
        ) : (
          <button className="positive ui button" onClick={() => addrsi()}>
            Add RSI
          </button>
        )}
        {openMACD ? (
          <button className="negative ui button" onClick={() => removemacd()}>
            Remove MACD
          </button>
        ) : (
          <button className="positive ui button" onClick={() => addmacd()}>
            Add MACD
          </button>
        )}
        {openBB ? (
          <button className="negative ui button" onClick={() => removebb()}>
            Remove Bollinger Bands
          </button>
        ) : (
          <button className="positive ui button" onClick={() => addbb()}>
            Add Bollinger Bands
          </button>
        )}
      </div>
    </>
  );
};

export default Graph;
