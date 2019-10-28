
export const setGenres = (genres) => {
    return (dispatch) => {
        dispatch(
            {
                type: "SET_GENRES",
                payload: genres
            })
    }
};






