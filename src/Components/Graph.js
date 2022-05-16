import React from "react";
import Plot from "react-plotly.js";

const Graph = ({ xValues, yValues, stock, timeInterval }) => {
  const xMin = xValues[0];
  const xMax = xValues[xValues.length - 1];

  const y = yValues.map((y) => y);
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
      <div style={{ marginLeft: "3vw" }}>
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
      <Plot
        data={[
          {
            x: xValues,
            y: yValues,
            type: "scatter",
            mode: "lines+markers",
            marker: { color: "blue", size: 2 },
          },
        ]}
        layout={{
          width: 1500,
          height: 750,
          xaxis: {
            title: stock,
            showline: true,
            mirror: true,
            range: [xMin, xMax],
          },
          yaxis: {
            title: "Price",
            showline: true,
            mirror: true,
            range: [yMin, yMax],
          },
        }}
        config={{
          displayModeBar: false,
        }}
      />
    </>
  );
};

export default Graph;
