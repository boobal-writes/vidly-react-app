import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import withRouter from "../utils/routesComponentHelper";
import { getGenres } from "./../services/genreService";
import { getMovie, createMovie, updateMovie } from "./../services/movieService";
import { toast } from "react-toastify";

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

  populateGenres = async () => {
    const genres = await getGenres();
    this.setState({ genres });
  };

  populateMovie = async () => {
    try {
      const movieId = this.props.match.params.id;
      if (movieId === "new") return;

      const movie = await getMovie(movieId);
      this.setState({
        data: this.mapToViewModel(movie),
      });
    } catch (error) {
      if (error.response && error.response.status === 404) {
        this.props.navigate("/not-found");
      }
    }
  };

  mapToViewModel = (movie) => {
    const { title, dailyRentalRate, numberInStock } = movie;
    const viewModel = {
      title,
      dailyRentalRate,
      numberInStock,
      genreId: movie.genre._id,
    };
    return viewModel;
  };

  componentDidMount = async () => {
    await this.populateGenres();
    await this.populateMovie();
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

  doSubmit = async () => {
    const movie = this.state.data;
    const movieIdParameter = this.props.match.params.id;
    if (movieIdParameter == "new") {
      await createMovie(movie);
      toast("Created successfully!");
    } else {
      await updateMovie(movie, movieIdParameter);
      toast("Updated successfully!");
    }
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
