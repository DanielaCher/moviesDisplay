import { takeLatest, put, call } from "redux-saga/effects";
import {
  FETCH_MOVIES_REQUEST,
  fetchMoviesSuccess,
  fetchMoviesFailure,
} from "../actions/movieActions";

function* fetchMoviesAsync() {
  const apiKey = "f78a29ca41f945580f00ecd19a11d476";
  const apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`;

  try {
    const response = yield call(fetch, apiUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = yield response.json();
    yield put(fetchMoviesSuccess(data.results));
  } catch (error) {
    yield put(fetchMoviesFailure(error.message));
  }
}

export function* watchFetchMovies() {
  yield takeLatest(FETCH_MOVIES_REQUEST, fetchMoviesAsync);
}
