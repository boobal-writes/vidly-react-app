import React, { Component } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Movies from "./components/movies";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NavaBar from "./components/NavBar";
import NotFound from "./components/notFound";
import MovieForm from "./components/movieForm";
import LoginForm from "./components/common/loginForm";
import RegisterForm from "./components/register";
import RequireAuth from "./components/common/requireAuth";
import Logout from "./components/common/logout";
import logger from "./services/logService";
import auth from "./services/authService";
import "react-toastify/dist/ReactToastify.css";

logger.init();

class App extends Component {
  state = {};

  componentDidMount() {
    this.setState({ user: auth.getCurrentUser() });
  }

  render() {
    const { user } = this.state;
    return (
      <React.Fragment>
        <ToastContainer />
        <NavaBar user={user} />
        <main className="container">
          <Routes>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route
              path="/movies/:id"
              element={
                <RequireAuth>
                  <MovieForm />
                </RequireAuth>
              }
            />
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
}

export default App;
