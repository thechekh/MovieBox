/** REVIEW: выровняй нормально код */
const initialState = [];
export default (state = initialState
    , action) => {
    const {type, payload} = action;
    switch (type) {
        case "SET_FILMS":
            return payload;
        default:
            return state
    }
}
