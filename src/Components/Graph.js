import React from "react";
import {
  LineChart,
  Line,
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
  // macd,
  // macdSignal,
  // getMacd,
  upperband,
  middleband,
  lowerband,
  getBollingerBands,
}) => {
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

  // const macdData = xValues.map((item, index) => ({
  //   name: item,
  //   macdValues: macd[index],
  //   macdsignalValues: macdSignal[index],
  // }));

  // const md = macdData.map((y) => y["macdValues"]);
  // const mdAxisRange = md.sort(function (a, b) {
  //   return a - b;
  // });
  // const macdMin = mdAxisRange[0];
  // const macdMax = mdAxisRange[macd.length - 1];

  const y = data.map((y) => y);
  const yAxisRange = y.sort(function (a, b) {
    return a - b;
  });
  const yMin = yAxisRange[0];
  const yMax = yAxisRange[yValues.length - 1];

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

      <LineChart
        width={1500}
        height={750}
        data={data}
        style={{ backgroundColor: "black" }}
      >
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
            stroke="white"
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
        {upperband.length !== 0 ? (
          <>
            <Line
              type="monotone"
              dataKey="upperBand"
              name="Upper Bollinger Band"
              stroke="white"
              strokeWidth={2}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="middleBand"
              name="Middle Bollinger Band"
              stroke="orange"
              strokeWidth={2}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="lowerBand"
              name="Lower Bollinger Band"
              stroke="white"
              strokeWidth={2}
              dot={false}
            />
          </>
        ) : (
          ""
        )}

        <CartesianGrid stroke="#fff" />
        {rsi.length === 0 ? <XAxis dataKey="name" /> : ""}
        <YAxis type="number" domain={[yMin, yMax]} />
        <Legend />
      </LineChart>
      {/* {macd.length !== 0 ? (
        <LineChart
          width={1500}
          height={150}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
          data={macdData}
          style={{ backgroundColor: "black" }}
        >
          <Line
            type="monotone"
            dataKey="macdValues"
            stroke="blue"
            strokeWidth={1}
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="macdsignalValues"
            stroke="orange"
            strokeWidth={1}
            dot={false}
          />
          <XAxis dataKey="name" />
          <YAxis type="number" domain={[macdMin, macdMax]} />
          <ReferenceLine y={0} stroke="#000" />
        </LineChart>
      ) : (
        ""
      )} */}
      {rsi.length !== 0 ? (
        <LineChart
          width={1500}
          height={150}
          data={rsiData}
          style={{ backgroundColor: "black" }}
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
          <XAxis dataKey="name" />
          <YAxis type="number" />
          <ReferenceLine y={0} />
        </LineChart>
      ) : (
        ""
      )}

      <div className="row" style={{ marginTop: "2vh" }}>
        <button className="ui button" onClick={() => getEMA(21)}>
          Add 21 EMA
        </button>
        <button className="ui button" onClick={() => getEMA(50)}>
          Add 50 EMA
        </button>
        <button className="ui button" onClick={() => getEMA(100)}>
          Add 100 EMA
        </button>
        <button className="ui button" onClick={() => getEMA(200)}>
          Add 200 EMA
        </button>
        <button className="ui button" onClick={() => getSMA(50)}>
          Add 50 SMA
        </button>
        <button className="ui button" onClick={() => getSMA(100)}>
          Add 100 SMA
        </button>
        <button className="ui button" onClick={() => getSMA(200)}>
          Add 200 SMA
        </button>
        <button className="ui button" onClick={() => getRSI()}>
          Add RSI
        </button>
        {/* <button className="ui button" onClick={() => getMacd()}>
          Add MACD
        </button> */}
        <button className="ui button" onClick={() => getBollingerBands()}>
          Add Bollinger Bands
        </button>
      </div>
    </>
  );
};

export default Graph;
