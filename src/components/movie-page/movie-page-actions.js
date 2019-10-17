export const addFavorites = (film) => {
    return (dispatch) => {
        dispatch(
            {
                type: "ADD_FAVORITE",
               payload: film
            })
    }
}

export const removeFavorites = (film) => {
    return (dispatch) => {
        dispatch(
            {
                type: "DELETE_FAVORITE",
                payload: film
            })
    }
}
