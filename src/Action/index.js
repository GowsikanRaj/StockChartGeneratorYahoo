import watchlist from "../APIs/watchlist";

import {
  GET_WATCHLIST,
  ADD_TO_WATCHLIST,
  REMOVE_FROM_WATCHLIST,
} from "./types";

export const addToWatchlist = (Stock) => async (dispatch) => {
  const response = await watchlist.post("/watchlist", { Stock });
  dispatch({
    type: ADD_TO_WATCHLIST,
    payload: response.data,
  });
};

export const removeFromWatchlist = (id) => async (dispatch) => {
  await watchlist.delete(`/watchlist/${id}`);
  dispatch({
    type: REMOVE_FROM_WATCHLIST,
    payload: id,
  });
};

export const getWatchlist = () => async (dispatch) => {
  const response = await watchlist.get("/watchlist");
  dispatch({
    type: GET_WATCHLIST,
    payload: response.data,
  });
};
