
export const setGenries = (genres) => {
    return (dispatch) => {
      dispatch(
            {
                type: "SET_GENRIES",
                payload:genres
            })
    }
};



