import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Movies from "./components/movies";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NavaBar from "./components/NavBar";
import NotFound from "./components/notFound";
import MovieForm from "./components/movieForm";

function App() {
  return (
    <React.Fragment>
      <NavaBar></NavaBar>
      <main className="container">
        <Routes>
          <Route path="/movies/:id" element={<MovieForm />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/rentals" element={<Rentals />} />

          <Route path="/not-found" element={<NotFound />} />
          <Route path="/" element={<Movies />} />
          <Route path="/*" element={<Navigate to="/not-found" />} />
        </Routes>
      </main>
    </React.Fragment>
  );
}

export default App;
