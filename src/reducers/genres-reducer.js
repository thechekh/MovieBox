import Constants from "../utils/constants";

const initialState = [];

const { GENRES_REQUEST, GENRES_SUCCESS, GENRES_FAILURE } = Constants;

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GENRES_REQUEST:
    case GENRES_SUCCESS:
      return {
        ...payload
      };
    case GENRES_FAILURE:
      return payload;
    default:
      return state;
  }
};
