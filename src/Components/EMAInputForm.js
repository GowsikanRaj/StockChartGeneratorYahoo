import React, { useState } from "react";

const EMAInputForm = ({ getEMA }) => {
  const [timePeriod, setTimePeriod] = useState(21);
  return (
    <form className="ui form" onSubmit={getEMA(timePeriod)}>
      <div className="field">
        <div className="fields">
          <div className="four wide field">
            <label className="ui header required-field">Time Period</label>
            <input
              type="number"
              className="form-control"
              onChange={(e) => setTimePeriod(e.target.value)}
              value={timePeriod}
            />
          </div>
        </div>
      </div>
    </form>
  );
};

export default EMAInputForm;
