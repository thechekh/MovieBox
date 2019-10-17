export default (state = [], action) => {
    const {type, payload} = action
    switch (type) {
        case "GET_FAVORITE":
            return payload;

        case "DELETE_FAVORITE":
            const newState = state.filter(task => task._id !== payload.taskid)
            return newState

        case "ADD_FAVORITE":

            const newFavorites = state.concat({

                id: payload.id,

            })
            return newFavorites

        default:
            return state
    }
}
