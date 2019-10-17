export default (state = [], action) => {
    const {type, payload} = action
    switch (type) {
        case "GET_FAVORITE":
            return payload;

        case "DELETE_FAVORITE":
            console.log("film for deleting",payload)
            const newState = state.filter(items=> items.id !== items.id)
            return newState

        case "ADD_FAVORITE":
            console.log("ID FILMA ",payload)
            const newFavorites = state.concat({
                id: payload,

            })
            return newFavorites

        default:
            return state
    }
}
