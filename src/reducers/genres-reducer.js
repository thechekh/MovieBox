const initialState = [];
export default (state = initialState, action) => {
    const {type, payload} = action;
    switch (type) {
        case "SET_GENRES":
            return payload.genres;
        default:
            return state
    }
}
