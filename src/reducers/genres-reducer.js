import Constants from "../utils/constants";

const initialState = [];
const { SET_GENRES } = Constants;

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_GENRES:
      return payload.genres;
    default:
      return state;
  }
};
