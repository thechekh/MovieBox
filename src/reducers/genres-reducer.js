import Constants from "../utils/constants";

const initialState = [];

const { GENRES_SUCCESS, GENRES_FAILURE } = Constants;

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GENRES_SUCCESS:
      return {
        ...payload.genres
      };
    case GENRES_FAILURE:
      return payload.msg;
    default:
      return state;
  }
};
