export default (state = [], action) => {
    const {type, payload} = action
    switch (type) {
        case "S":
            console.log("genres reducer playload",payload)
            return payload;

        default:
            console.log("DEFAULT")
            return state
    }
}
