export default (state = [], action) => {
    const {type, payload} = action
    switch (type) {
        case "GET_FAVORITE":
            return payload;

        case "DELETE_FAVORITE":
            const newState = state.filter(task => task._id !== payload.taskid)
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
