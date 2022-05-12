import _ from "lodash";

import {
  GET_WATCHLIST,
  ADD_TO_WATCHLIST,
  REMOVE_FROM_WATCHLIST,
} from "../Action/types";

const watchlistReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_WATCHLIST:
      return { ...state, ..._.mapKeys(action.payload, "id") };
    case ADD_TO_WATCHLIST:
      console.log(action.payload);
      return { ...state, [action.payload.id]: action.payload };
    case REMOVE_FROM_WATCHLIST:
      return _.omit(state, action.payload);
    default:
      return state;
  }
};

export default watchlistReducer;
