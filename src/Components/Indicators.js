import React, { useState } from "react";

const Indicators = ({
  getEMA,
  getSMA,
  getRSI,
  getMacd,
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
    <div className="row" style={{ marginTop: "5vh", marginLeft: "3vw" }}>
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
  );
};

export default Indicators;
