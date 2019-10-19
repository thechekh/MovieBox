export default (state = [], action) => {
    const {type, payload} = action
    switch (type) {
        case "l":
            return payload.genres;

        default:
            return state
    }
}
