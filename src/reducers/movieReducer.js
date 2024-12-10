import {
  FETCH_MOVIES_REQUEST,
  FETCH_MOVIES_SUCCESS,
  FETCH_MOVIES_FAILURE,
  ADD_TO_FAVORITES,
  REMOVE_FROM_FAVORITES,
} from "../actions/movieActions";

//Updates the application's state based on actions dispatched to the Redux store.

const initialState = {
  loading: false,
  movies: [],
  error: null,
  favorites: [],
};

const movieReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MOVIES_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_MOVIES_SUCCESS:
      return { ...state, loading: false, movies: action.payload, error: null };
    case FETCH_MOVIES_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case ADD_TO_FAVORITES:
      return { ...state, favorites: [...state.favorites, action.payload] };
    case REMOVE_FROM_FAVORITES:
      return {
        ...state,
        favorites: state.favorites.filter((id) => id !== action.payload),
      };
    default:
      return state;
  }
};

export default movieReducer;
