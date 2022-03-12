import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Movies from "./components/movies";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NavaBar from "./components/NavBar";
import NotFound from "./components/notFound";
import MovieForm from "./components/movieForm";
import LoginForm from "./components/common/loginForm";
import RegisterForm from "./components/register";
import logger from "./services/logService";
import "react-toastify/dist/ReactToastify.css";

logger.init();

function App() {
  return (
    <React.Fragment>
      <ToastContainer />
      <NavaBar></NavaBar>
      <main className="container">
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
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
