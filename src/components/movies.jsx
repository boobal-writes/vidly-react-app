import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getMovies, deleteMovie } from "../services/movieService";
import { getGenres } from "../services/genreService";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/listGroup";
import MoviesTable from "./moviesTable";
import SearchBox from "./common/searchBox";
import _ from "lodash";
import { toast } from "react-toastify";
import logger from "../services/logService";

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
    searchKey: "",
  };

  componentDidMount = async () => {
    this.setState({
      movies: await getMovies(),
      genres: await getGenres(),
    });
  };

  handleDelete = async (movie) => {
    const originalMovies = [...this.state.movies];
    const movies = originalMovies.filter((m) => m._id !== movie._id);
    this.setState({ movies });
    try {
      await deleteMovie(movie._id);
      toast("Deleted successfully!");
    } catch (error) {
      if (error.response && error.response.status === 404) {
        toast.error("This movie is already deleted!");
      }
    }
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
    this.setState({
      selectedGenre: genre,
      currentPageNumber: 1,
      searchKey: "",
    });
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
      searchKey,
    } = this.state;

    let filteredMovies = selectedGenre
      ? allMovies.filter((movie) => movie.genre._id === selectedGenre._id)
      : allMovies;

    filteredMovies = filteredMovies.filter((movie) =>
      movie.title.toLowerCase().includes(searchKey.toLowerCase())
    );

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

  handleSearch = (searchKey) => {
    this.setState({
      searchKey: searchKey,
      selectedGenre: null,
      currentPageNumber: 1,
    });
  };

  render() {
    const {
      movies: allMovies,
      currentPageNumber,
      pageSize,
      genres,
      sortColumn,
    } = this.state;

    const { user } = this.props;

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
            {user && (
              <Link to="movies/new">
                <button
                  className="btn btn-primary"
                  style={{ marginBottom: "20px" }}
                >
                  New Movie
                </button>
              </Link>
            )}
            <p>Showing {totalCount} movies in the database.</p>
            <SearchBox
              style={{ width: "100%" }}
              value={this.state.searchKey}
              onSearch={this.handleSearch}
            ></SearchBox>
            <MoviesTable
              movies={movies}
              onLikeToggle={this.handleLikeToggle}
              onDelete={this.handleDelete}
              onSort={this.handleSort}
              sortColumn={sortColumn}
              user={user}
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
