import React from "react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Legend } from "recharts";

const Graph = ({ xValues, yValues, stock, timeInterval }) => {
  const xMin = xValues[0];
  const xMax = xValues[xValues.length - 1];

  const y = yValues.map((y) => y);
  const yAxisRange = y.sort(function (a, b) {
    return a - b;
  });
  const yMin = yAxisRange[0];
  const yMax = yAxisRange[yValues.length - 1];

  const data = xValues.map((item, index) => ({
    name: item,
    stockValues: yValues[index],
  }));

  return (
    <>
      <h3 style={{ display: "flex", justifyContent: "center" }}>
        Stock Chart for {String(stock).toUpperCase()}
      </h3>
      <div style={{ marginLeft: "3vw" }}>
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
      <LineChart width={1500} height={750} data={data}>
        <Line
          type="monotone"
          dataKey="stockValues"
          name={stock}
          stroke="blue"
          strokeWidth={1}
          dot={false}
        />
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="name" domain={[xMin, xMax]} />
        <YAxis type="number" domain={[yMin, yMax]} />
        <Legend />
      </LineChart>
    </>
  );
};

export default Graph;
