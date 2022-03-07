import React, { Component } from "react";

class LoginForm extends Component {
  state = {
    account: {
      username: "",
      password: "",
    },
  };
  handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted");
  };
  handleChange = ({ currentTarget: input }) => {
    const account = { ...this.state.account };
    account[input.name] = input.value;
    this.setState({ account });
  };

  render() {
    const { account } = this.state;
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              onChange={this.handleChange}
              value={account.username}
              id="username"
              name="username"
              type="text"
              className="form-control"
            ></input>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              value={account.password}
              onChange={this.handleChange}
              name="password"
              id="password"
              type="text"
              className="form-control"
            ></input>
          </div>
          <button className="btn btn-primary m-2">Login</button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
