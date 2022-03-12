import React from "react";
import Joi from "joi-browser";
import { toast } from "react-toastify";
import withRouter from "./../../utils/routesComponentHelper";
import Form from "./form";
import { login } from "../../services/authService";

class LoginForm extends Form {
  state = {
    data: {
      username: "",
      password: "",
    },
    errors: {},
  };

  schema = {
    username: Joi.string().email().min(5).required().label("Username"),
    password: Joi.string().min(5).required().label("Password"),
  };

  doSubmit = async () => {
    try {
      const { data } = this.state;
      const { data: token } = await login(data.username, data.password);
      localStorage.setItem("jwt", token);
      window.location = "/";
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error(error.response.data);
        const { ...errors } = this.state;
        errors.username = error.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export default withRouter(LoginForm);
