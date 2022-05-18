import React from "react";
import TimeInterval from "./TimeInterval";
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
  macd,
  macdSignal,
  upperband,
  middleband,
  lowerband,
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

  const y = data.map((y) => y);
  const yAxisRange = y.sort(function (a, b) {
    return a - b;
  });
  const yMin = yAxisRange[0];
  const yMax = yAxisRange[yValues.length - 1];

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

  return (
    <>
      <h3 style={{ display: "flex", justifyContent: "center" }}>
        Stock Chart for {String(stock).toUpperCase()}
      </h3>
      <TimeInterval timeInterval={timeInterval} />
      <ComposedChart width={1500} height={700} data={data}>
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
    </>
  );
};

export default Graph;
