export default (state = [], action) => {
    const {type, payload} = action
    switch (type) {
        case "SET_GENRIES":
            return payload.genres;

        default:
            return state
    }
}
