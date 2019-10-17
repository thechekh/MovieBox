export const addFavorites = (id) => {
    return (dispatch) => {
        dispatch(
            {
                type: "ADD_FAVORITE",
               payload: id
            })
    }
}
