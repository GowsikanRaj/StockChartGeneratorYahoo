import React from "react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Legend } from "recharts";

const Graph = ({ data, stock, timeInterval }) => {
  return (
    <>
      <h3 style={{ display: "flex", justifyContent: "center" }}>
        Stock Chart for {String(stock).toUpperCase()}
      </h3>
      <div style={{ marginBottom: "2vh", marginLeft: "3vw" }}>
        <button
          className="ui tiny button"
          onClick={() => timeInterval("1d", "1m")}
        >
          1d
        </button>
        <button
          className="ui tiny button"
          onClick={() => timeInterval("5d", "5m")}
        >
          1w
        </button>
        <button
          className="ui tiny button"
          onClick={() => timeInterval("1mo", "1d")}
        >
          1m
        </button>
        <button
          className="ui tiny button"
          onClick={() => timeInterval("3mo", "1d")}
        >
          3m
        </button>
        <button
          className="ui tiny button"
          onClick={() => timeInterval("6mo", "1d")}
        >
          6m
        </button>
        <button
          className="ui tiny button"
          onClick={() => timeInterval("1y", "1d")}
        >
          1y
        </button>
      </div>
      <LineChart width={1500} height={750} data={data}>
        <Line
          type="monotone"
          dataKey="stockValues"
          name={String(stock).toUpperCase()}
          stroke="blue"
          strokeWidth={1}
          dot={false}
        />
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="name" />
        <YAxis type="number" />
        <Legend />
      </LineChart>
    </>
  );
};

export default Graph;
