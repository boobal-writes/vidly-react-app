import React, { Component } from "react";
import { getMovies, deleteMovie } from "../services/fakeMovieService";
import Like from "./common/like";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";

class Movies extends Component {
  state = {
    movies: getMovies(),
    pageSize: 5,
    currentPageNumber: 1,
  };

  handleDelete = (movie) => {
    deleteMovie(movie._id);
    this.setState({
      movies: getMovies(),
    });
  };

  handleLikeToggle = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movie };
    movies[index].liked = !movie.liked;
    this.setState({ movies });
  };

  handlePageChange = (pageNumber) => {
    this.setState({ currentPageNumber: pageNumber });
  };

  render() {
    const { movies, currentPageNumber, pageSize } = this.state;
    const { length: count } = movies;

    if (count === 0) return <p>There are no movies in the database.</p>;
    const moviesInCurrentPage = paginate(movies, currentPageNumber, pageSize);
    return (
      <React.Fragment>
        <p>Showing {count} movies in the database.</p>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Genre</th>
              <th>Stock</th>
              <th>Rate</th>
            </tr>
          </thead>
          <tbody>
            {moviesInCurrentPage.map((movie) => (
              <tr key={movie._id}>
                <td>{movie.title}</td>
                <td>{movie.genre.name}</td>
                <td>{movie.numberInStock}</td>
                <td>{movie.dailyRentalRate}</td>
                <td>
                  <Like
                    liked={movie.liked}
                    movie={movie}
                    onLikeToggle={() => this.handleLikeToggle(movie)}
                  ></Like>
                </td>
                <td>
                  <button
                    onClick={() => this.handleDelete(movie)}
                    className="btn btn-danger btn-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          totalItems={count}
          pageSize={pageSize}
          onPageChange={this.handlePageChange}
          currentPageNumber={currentPageNumber}
        ></Pagination>
      </React.Fragment>
    );
  }
}

export default Movies;
