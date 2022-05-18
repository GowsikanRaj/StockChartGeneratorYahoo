import React from "react";
const Snackbar = ({ closeMessage }) => {
  return (
    <div className="ui message transition">
      <i className="close icon" onClick={() => closeMessage()}></i>
      <div className="header" style={{ color: "red" }}>
        Error
      </div>
      <p>Maximum attempts exceeded, please try again in one minute</p>
    </div>
  );
};

export default Snackbar;
