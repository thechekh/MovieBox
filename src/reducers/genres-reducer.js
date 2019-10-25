export default (state = [], action) => {
    const {type, payload} = action
    if (type === "SET_GENRES") {
        return payload.genres;
    } else {
        return state
    }
}
