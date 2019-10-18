export const setGenres = (genres) => {

    return (dispatch) => {
        dispatch(
            {
                type: "S",
                payload: genres
            })
    }
}
export const l = (genres) => {
    console.log("actttt",genres)
    return (dispatch) => {
      dispatch(
            {
                type: "l",
                payload: genres
            })
    }
}



