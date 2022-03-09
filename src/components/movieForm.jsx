import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import { getGenres } from "./../services/fakeGenreService";

class MovieForm extends Form {
  state = {
    data: {
      title: "",
      genre: "5b21ca3eeb7f6fbccd471814",
      numberInStock: "",
      dailyRentalRate: "",
    },
    errors: {},
    genres: [],
  };

  componentDidMount = () => {
    const genres = getGenres();
    this.setState({ genres });
  };

  schema = {
    title: Joi.string().required().label("Title"),
    genre: Joi.string().required().label("Genre"),
    numberInStock: Joi.number()
      .min(1)
      .max(100)
      .required()
      .label("Number in Stock"),
    dailyRentalRate: Joi.number().min(0.5).max(5).required().label("Rate"),
  };

  doSubmit = () => {
    console.log("Submitted");
  };

  render() {
    return (
      <React.Fragment>
        <h1>Movie Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderSelect("genre", "Genre", this.state.genres)}
          {this.renderInput("numberInStock", "Number in Stock", "number")}
          {this.renderInput("dailyRentalRate", "Rate", "text")}
          {this.renderButton("Save")}
        </form>
      </React.Fragment>
    );
  }
}

export default MovieForm;
