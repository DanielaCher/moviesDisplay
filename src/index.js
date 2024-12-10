import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import Homepage from "./components/Homepage";
import MovieDetails from "./components/MovieDetails";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      {" "}
      {/* Wrap with BrowserRouter */}
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/movie/:movieId" element={<MovieDetails />} />{" "}
      
        </Routes>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
