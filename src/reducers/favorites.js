export default (state = [], action) => {
    const {type, payload} = action
    switch (type) {
        case "GET_FAVORITE":
            return payload;

        case "DELETE_FAVORITE":
            console.log("film for deleting",payload)
            const newState = state.filter(items=> items.id !==payload)
            return newState

        case "ADD_FAVORITE":

            const newFavorites = state.concat({
               ...payload,

            })
            return newFavorites

        default:
            return state
    }
}
