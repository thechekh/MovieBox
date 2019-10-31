/** REVIEW: т.е. у тебя сейчас favorite фильмы хранятся до первой перезагрузки страницу? Почитай про redux-persist */

const initialState = [];
export default (state = initialState, action) => {
    const {type, payload} = action;
    switch (type) {
        case "DELETE_FAVORITE":
            return state.filter(items => items.id !== payload);

        case "ADD_FAVORITE":
            return [
                payload,
                ...state
            ];

        default:
            return state
    }
}
