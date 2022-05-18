import React from "react";

const TimeInterval = ({ timeInterval }) => {
  return (
    <div style={{ marginBottom: "2vh", marginLeft: "3vw" }}>
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
  );
};

export default TimeInterval;
