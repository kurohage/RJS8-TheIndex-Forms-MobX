import React, { Component } from "react";
import { observer } from "mobx-react";

import bookStore from "../stores/bookStore";

class BookForm extends Component {
  state = {
    title: "",
    color: [
      "white",
      "yellow",
      "green",
      "red",
      "blue",
      "purple",
      "black",
      "grey",
      "orange"
    ],
    colorSelected: ""
  };

  submitBook = async event => {
    event.preventDefault();
    await bookStore.addBook(this.state, [this.props.author.id]);
    if (!bookStore.errors) {
      this.props.closeModal();
    }
  };

  textChangeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    return (
      <div className="mt-5 p-2">
        <form onSubmit={this.submitBook}>
          {bookStore.errors && (
            <div className="alert alert-danger" role="alert">
              {bookStore.errors.map(error => (
                <p key={error}>{error}</p>
              ))}
            </div>
          )}
          <div className="input-group mb-2">
            <div className="input-group-prepend">
              <span className="input-group-text">Book Title</span>
            </div>
            <input
              type="text"
              className="form-control"
              name="title"
              onChange={this.textChangeHandler}
              value={this.state.title}
            />
          </div>
          <div className="input-group mb-2">
            <div className="input-group-prepend">
              <span className="input-group-text">Book Color</span>
            </div>
            <select
              id="dropdown-basic-button"
              title="Book Color"
              name="colorSelected"
              onChange={this.textChangeHandler}
              value={this.state.colorSelected}
            >
              <option value="">Select a Color</option>
              {this.state.color.map(variant => (
                <option value={variant} key={variant}>
                  {variant}
                </option>
              ))}
            </select>
          </div>
          <input type="submit" />
        </form>
      </div>
    );
  }
}

export default observer(BookForm);
