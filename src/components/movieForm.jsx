import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import withRouter from "../utils/routesComponentHelper";
import { getGenres } from "./../services/fakeGenreService";
import { getMovie, saveMovie } from "./../services/fakeMovieService";

class MovieForm extends Form {
  state = {
    data: {
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: "",
    },
    errors: {},
    genres: [],
  };

  componentDidMount = () => {
    const genres = getGenres();
    this.setState({ genres });

    const movieId = this.props.match.params.id;
    if (movieId === "new") return;

    const movie = getMovie(movieId);
    // if (!movie) this.props.navigate("/not-found");

    const { title, dailyRentalRate, numberInStock } = movie;
    this.setState({
      data: { title, dailyRentalRate, numberInStock, genreId: movie.genre._id },
    });
  };

  schema = {
    title: Joi.string().required().label("Title"),
    genreId: Joi.string().required().label("Genre"),
    numberInStock: Joi.number()
      .min(1)
      .max(100)
      .required()
      .label("Number in Stock"),
    dailyRentalRate: Joi.number().min(0.5).max(5).required().label("Rate"),
  };

  doSubmit = () => {
    const movie = this.state.data;
    const movieIdParameter = this.props.match.params.id;
    movie._id = movieIdParameter === "new" ? null : movieIdParameter;
    saveMovie(movie);
    this.props.navigate("/movies", { replace: true });
  };

  render() {
    return (
      <React.Fragment>
        <h1>Movie Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderSelect("genreId", "Genre", this.state.genres)}
          {this.renderInput("numberInStock", "Number in Stock", "number")}
          {this.renderInput("dailyRentalRate", "Rate", "text")}
          {this.renderButton("Save")}
        </form>
      </React.Fragment>
    );
  }
}

export default withRouter(MovieForm);
