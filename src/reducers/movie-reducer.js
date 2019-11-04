const initialState = [];
export default (state = initialState, action) => {
    const {type, payload} = action;
    switch (type) {
        case 'GET_MOVIE_REQUEST':
            return {loading: true};
        case 'GET_MOVIE_SUCCESS':
            return {payload, loading: false};
        case 'GET_FILMS_FAILURE':
            return {loading: false, errorMessage: payload};
        default:
            return state;
    }
}

