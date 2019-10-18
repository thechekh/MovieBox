export const setGenres = (genres) => {
    console.log("act",genres)
    return (dispatch) => {
        dispatch(
            {
                type: "S",
                payload: genres
            })
    }
}


