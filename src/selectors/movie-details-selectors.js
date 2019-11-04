import {createSelector} from "reselect";

const isFavorite = (state, props) =>
    state.films.favorites.some(item => item.id === props.id);

const getFavoritesState = () => createSelector(
    [isFavorite],
    (isFav) => isFav
);
export const makeMapStateToProps = () => {
    const isFavorite = getFavoritesState();
    return (state, props) => {
        return {
            isFavorite: isFavorite(state, props),
            loading: state.films.loading,
            movie: state.films.payload,
        }
    }
};
