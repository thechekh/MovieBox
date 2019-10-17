export const addFavorites = (id) => {
    return (dispatch) => {
        dispatch(
            {
                type: "ADD_FAVORITE",
               payload: id
            })
    }
}

export const removeFavorites = (id) => {
    return (dispatch) => {
        dispatch(
            {
                type: "DELETE_FAVORITE",
                payload: id
            })
    }
}
