export default (state = [], action) => {
    const {type, payload} = action;
    switch (type) {
        case "SET_GENRES":
            console.log('trig');
            return payload;
        default:
            return state
    }
}
