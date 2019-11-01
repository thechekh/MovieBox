const initialState = [];
export default (state = initialState
    , action) => {
    const {type, payload} = action;
    switch (type) {
        case 'GET_FILMS_REQUEST':
            return {...state, loading: true};
        case 'GET_FILMS_SUCCESS':
            return {...state, ...payload, loading: false};
        /*        case 'GET_FILMS_FAILURE':
                    return { ...state, isFetching: false, errorMessage: action.payload.message };*/
        default:
            return state;
    }
}
/*        case "SET_FILMS":
            return [
                ...payload,
            loading:false,
        ]

        default:
            return state*/
