export default (state = [], action) => {
    const {type, payload} = action;
    switch (type) {
        case "SET_GENRES":
            return payload.genres;

        default:
            return state
    }
}
