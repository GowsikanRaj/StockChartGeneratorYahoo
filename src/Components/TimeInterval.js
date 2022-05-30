import React from "react";

const TimeInterval = ({ timeInterval }) => {
  return (
    <div style={{ marginBottom: "2vh", marginLeft: "3vw" }}>
      <button
        className="ui tiny button"
        onClick={() => timeInterval(390, "1min")}
      >
        1D
      </button>
      <button
        className="ui tiny button"
        onClick={() => timeInterval(390, "5min")}
      >
        1W
      </button>
      <button
        className="ui tiny button"
        onClick={() => timeInterval(21, "1day")}
      >
        1M
      </button>
      <button
        className="ui tiny button"
        onClick={() => timeInterval(63, "1day")}
      >
        3M
      </button>
      <button
        className="ui tiny button"
        onClick={() => timeInterval(126, "1day")}
      >
        6M
      </button>
      <button
        className="ui tiny button"
        onClick={() => timeInterval(253, "1day")}
      >
        1Y
      </button>
    </div>
  );
};

export default TimeInterval;
