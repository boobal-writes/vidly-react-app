import React, { Component } from "react";
import { getMovies, deleteMovie } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/listGroup";
import MoviesTable from "./moviesTable";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 2,
    currentPageNumber: 1,
    selectedGenre: null,
  };

  componentDidMount() {
    this.setState({
      movies: getMovies(),
      genres: getGenres(),
    });
  }

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

  handleGenreChange = (genre) => {
    if (!genre) {
      this.setState({ selectedGenre: null, currentPageNumber: 1 });
      return;
    }
    this.setState({ selectedGenre: genre, currentPageNumber: 1 });
  };

  render() {
    const {
      movies: allMovies,
      currentPageNumber,
      pageSize,
      genres,
      selectedGenre,
    } = this.state;

    const filteredMovies = selectedGenre
      ? allMovies.filter((movie) => movie.genre._id === selectedGenre._id)
      : allMovies;

    const { length: count } = filteredMovies;

    if (allMovies.length === 0)
      return <p>There are no movies in the database.</p>;

    const moviesInCurrentPage = paginate(
      filteredMovies,
      currentPageNumber,
      pageSize
    );
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-4">
            <ListGroup
              items={genres}
              // keyProperty="_id"
              // textProperty="name"
              allItemsLabel="All Genres"
              onItemSelect={this.handleGenreChange}
              selectedItem={this.state.selectedGenre}
            ></ListGroup>
          </div>
          <div className="col-8">
            <p>Showing {count} movies in the database.</p>
            <MoviesTable
              movies={moviesInCurrentPage}
              onLikeToggle={this.handleLikeToggle}
              onDelete={this.handleDelete}
            />
            <Pagination
              totalItems={count}
              pageSize={pageSize}
              onPageChange={this.handlePageChange}
              currentPageNumber={currentPageNumber}
            ></Pagination>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Movies;
