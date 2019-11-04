import {createSelector} from "reselect";

const isFavorite = (state, props) =>
    state.favorites.some(item => item.id === props.id);

const getFavoritesState = () => createSelector(
    [isFavorite],
    (isFav) => isFav
);
export const makeMapStateToProps = () => {
    const isFavorite = getFavoritesState();
    return (state, props) => {
        return {
            isFavorite: isFavorite(state, props),
            loading: state.movie.loading,
            movie: state.movie.payload,
        }
    }
};
