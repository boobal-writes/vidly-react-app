import React, { Component } from "react";
import { getMovies, deleteMovie } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/listGroup";
import MoviesTable from "./moviesTable";
import _ from "lodash";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 2,
    currentPageNumber: 1,
    selectedGenre: null,
    sortColumn: {
      path: "title",
      order: "asc",
    },
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
    this.setState({ selectedGenre: genre, currentPageNumber: 1 });
  };

  handleSort = (sortColumn) => {
    this.setState({
      sortColumn,
    });
  };

  getPagedData() {
    const {
      movies: allMovies,
      currentPageNumber,
      pageSize,
      selectedGenre,
      sortColumn,
    } = this.state;

    const filteredMovies = selectedGenre
      ? allMovies.filter((movie) => movie.genre._id === selectedGenre._id)
      : allMovies;

    const sorted = _.orderBy(
      filteredMovies,
      [sortColumn.path],
      [sortColumn.order]
    );

    const movies = paginate(sorted, currentPageNumber, pageSize);
    return {
      totalCount: filteredMovies.length,
      data: movies,
    };
  }

  render() {
    const {
      movies: allMovies,
      currentPageNumber,
      pageSize,
      genres,
      sortColumn,
    } = this.state;

    if (allMovies.length === 0)
      return <p>There are no movies in the database.</p>;

    const { totalCount, data: movies } = this.getPagedData();

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
            <p>Showing {totalCount} movies in the database.</p>
            <MoviesTable
              movies={movies}
              onLikeToggle={this.handleLikeToggle}
              onDelete={this.handleDelete}
              onSort={this.handleSort}
              sortColumn={sortColumn}
            />
            <Pagination
              totalItems={totalCount}
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
