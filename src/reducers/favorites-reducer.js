export default (state = [], action) => {
    const {type, payload} = action
    switch (type) {
        case "GET_FAVORITE":
            return payload;

        case "DELETE_FAVORITE":
            console.log("film for deleting",payload)
            return state.filter(items => items.id !== payload)

        case "ADD_FAVORITE":

            return state.concat({
                ...payload,

            })

        default:
            return state
    }
}
