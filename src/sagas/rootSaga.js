import { all } from "redux-saga/effects";
import { watchFetchMovies } from "./movieSagas";

export default function* rootSaga() {
  yield all([
    watchFetchMovies(), // Start your movie saga
  ]);
}
