import React, { Component } from "react";
import Square from "./Square";

export default class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      X_turn: true,
      winner: null,
      started: false,
    };
  }

  getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== "") {
      var cookies = document.cookie.split(";");
      for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();
        // Does this cookie string begin with the name we want?
        if (cookie.substring(0, name.length + 1) === name + "=") {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }

  async getNextMove() {
    const csrf_token = this.getCookie("csrftoken");
    // const url = "https://still-oasis-83784.herokuapp.com/api/solve/"
    const url = "/api/solve/";
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        "X-CSRFToken": csrf_token,
        Squares: JSON.stringify(this.state.squares),
        Turn: this.state.X_turn ? "X" : "O",
      },
    });
    const data = await response.json();
    return data;
  }

  processData(data) {
    const winner = data.winner;
    const move = data.move;

    const squares = this.state.squares;
    squares[move] = this.state.X_turn ? "X" : "O";
    this.setState({
      winner: winner,
      squares: squares,
      X_turn: !this.state.X_turn,
      started: true,
    });
  }

  handleClick(i) {
    if (this.state.winner || this.state.squares[i]) {
      return;
    }
    const squares = this.state.squares;
    squares[i] = this.state.X_turn ? "X" : "O";
    this.setState(
      {
        squares: squares,
        X_turn: !this.state.X_turn,
        started: true,
      },
      () => {
        this.getNextMove()
          .then((data) => this.processData(data))
          .catch((error) => {
            console.log("Error", error);
          });
      }
    );
  }

  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        index={i}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  handleClickForAI() {
    this.getNextMove()
      .then((data) => this.processData(data))
      .catch((error) => {
        console.log("Error", error);
      });
  }

  handleReset() {
    this.setState({
      squares: Array(9).fill(null),
      X_turn: true,
      winner: null,
      started: false,
    });
  }

  render() {
    const status =
      this.state.winner === null
        ? `Next player: ${this.state.X_turn ? "X" : "O"}`
        : this.state.winner === "Tie"
        ? "Its a Tie"
        : `Winner: ${this.state.winner}`;

    return (
      <div className="board">
        <div className="status" style={{}}>
          {status}
        </div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>

        {!this.state.started && (
          <button className="btn" onClick={() => this.handleClickForAI()}>
            AI First
          </button>
        )}
        <button className="btn" onClick={() => this.handleReset()}>
          {" "}
          Reset{" "}
        </button>
      </div>
    );
  }
}
