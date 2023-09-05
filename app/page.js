'use client';
import React from "react";

import "./page.css";

var inf = 999999999

class Square extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      row: props.row,
      column: props.column,
      board: props.board,
      setBoard: props.setBoard,
      dbord: props.dbord
    };
  }

  render() {
    return (
      <div className="square" style={
        ((this.props.row < this.props.board.length) && (this.props.column < this.props.board[this.props.row].length) && (this.props.board[this.props.row][this.props.column] == true)) ?
          ((this.props.row + this.props.column) % 2 == 0 ? { backgroundColor: "red" } : { backgroundColor: "white" }) :
          { backgroundColor: "green" }
      }
        onClick={() => {
          var brd = this.props.board;

          if (this.props.row >= this.props.board.length) {
            brd.push([]);
            for (var i = 0; i < this.props.board[0].length; i++) {
              brd[this.props.row].push(false);
            }
          }
          if (this.props.column >= this.props.board[this.props.row].length) {
            for (var i = 0; i < this.props.board.length; i++) {
              brd[i].push(false);
            }
          }

          if (this.props.board[this.props.row][this.props.column] === true)
            brd[this.props.row][this.props.column] = false;
          else
            brd[this.props.row][this.props.column] = true;

          while (!brd[brd.length - 1].includes(true)) {
            brd.pop();
          }

          for (var i = 0; i < brd.length; i++) {
            while (!brd[i][brd[i].length - 1] && !brd[i][brd[i].length]) {
              brd[i].pop();
            }
          }

          this.props.setBoard(brd);
          this.forceUpdate();
          this.props.dbord.forceUpdate();

          console.log(this.props.row, this.props.column)
          console.log(this.props.board);

        }}></div>
    )
  }
}

class Dboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      board: props.board,
      setBoard: props.setBoard
    };
  }

  render() {
    let board = this.props.board
    var displayBoard = [];

    for (var i = 0; i < board.length; i++) {
      var row = [];
      for (var j = 0; j < board[i].length; j++) {
        row.push(<Square key={i + "-" + j} row={i} column={j} dbord={this} {...this.props} />)
      }
      row.push(<Square key={i + "-" + j} color={"green"} row={i} column={j} dbord={this} {...this.props} />)
      displayBoard.push(<div key={i} className="row">{row}</div>)
    }

    for (var i = 0; i < board[board.length - 1].length; i++) {
      displayBoard.push(<Square key={i + "-" + board.length} color={"green"} row={board.length} column={i} dbord={this} {...this.props} />)
    }

    return (
      <div>{displayBoard}</div>
    )
  }
}

function textSetBoard(setBoard) {
  var txtbrd = document.getElementById("setBoardTextArea").value;
  txtbrd = txtbrd.split("\n");
  var reboard = [];
  for (var i = 0; i < txtbrd.length - 1; i++) {
    reboard.push(JSON.parse(txtbrd[i].slice(0, -1)));
  }
  reboard.push(JSON.parse(txtbrd[txtbrd.length - 1]));
  if (reboard.length > 0) {
    return (setBoard(reboard));
  }
  return;
}

function BuildBoard({ setStep, board, setBoard }) {
  return (
    <div className="board">
      <Dboard board={board} setBoard={setBoard} />
      <br />
      click on a green square to add it to the board
      <br />
      click on an already existing square to remove it from the board
      <br />
      or enter a board in the text area below
      <br />
      exemple:
      <br />
      <br />
      [true, false, false, false, false, false, false, true],
      <br />
      [true, true, false, false, false, false, true, true],
      <br />
      [true, true, false, true, true, false, true, true],
      <br />
      [true, true, true, true, true, true, true, true],
      <br />
      [true, true, true, true, true, true, true, true],
      <br />
      [true, true, true, false, false, true, true, true],
      <br />
      [true, true, true, false, false, true, true, true]
      <br />
      <br />
      <textarea title="gameMap" id="setBoardTextArea" style={{ backgroundColor: "white", color: "black" }}></textarea>  <button onClick={() => { textSetBoard(setBoard) }}>SET</button>
      <br />
      <br />
      <button onClick={() => { setStep("menu") }}>menu</button>
      <br />
      <button onClick={() => { setStep("buildPieces") }}>buildPieces</button>
      <br />
      <button onClick={() => { setStep("placePieces") }}>placePieces</button>
    </div>
  )
}

function BuildPieces({ setStep, pieces, setPieces }) {
  pieces = [];
  var buildPiecestxtl1 = '{ isPawn: true, name: "pawn", movesTo: [[0, 1]], captures: [[1, 1], [-1, 1]] },';
  var buildPiecestxtl2 = '{ name: "rook", movesTo: [[0, inf], [0, -inf], [inf, 0], [-inf, 0]], captures: [[0, inf], [0, -inf], [inf, 0], [-inf, 0]], flies: false },';
  var buildPiecestxtl3 = '{ name: "knight", movesTo: [[1, 2], [2, 1], [-1, 2], [-2, 1], [1, -2], [2, -1], [-1, -2], [-2, -1]], captures: [[1, 2], [2, 1], [-1, 2], [-2, 1], [1, -2], [2, -1], [-1, -2], [-2, -1]], flies: true },'
  var buildPiecestxtl4 = '{ name: "bishop", movesTo: [[inf, inf], [inf, -inf], [-inf, inf], [-inf, -inf]], captures: [[inf, inf], [inf, -inf], [-inf, inf], [-inf, -inf]], flies: false },'
  var buildPiecestxtl5 = '{ name: "queen", movesTo: [[inf, inf], [inf, -inf], [-inf, inf], [-inf, -inf], [0, inf], [0, -inf], [inf, 0], [-inf, 0]], captures: [[inf, inf], [inf, -inf], [-inf, inf], [-inf, -inf], [0, inf], [0, -inf], [inf, 0], [-inf, 0]], flies: false },'
  var buildPiecestxtl6 = '{ isKing: true, name: "king", movesTo: [[1, 1], [1, 0], [1, -1], [0, 1], [0, -1], [-1, 1], [-1, 0], [-1, -1]], captures: [[1, 1], [1, 0], [1, -1], [0, 1], [0, -1], [-1, 1], [-1, 0], [-1, -1]], flies: false }'

  return (
    <div className="pieces">
      <div>
        "BuildPieces"
      </div>
      <br />
      exemple:
      <br />
      <br />
      {buildPiecestxtl1}
      <br />
      {buildPiecestxtl2}
      <br />
      {buildPiecestxtl3}
      <br />
      {buildPiecestxtl4}
      <br />
      {buildPiecestxtl5}
      <br />
      {buildPiecestxtl6}
      <br />
      <br />
      <textarea title="gameMap" id="SetPiecesTextArea" style={{ backgroundColor: "white", color: "black" }}></textarea>  <button onClick={() => { textSetPieces(setPieces) }}>SET</button>
      <br />
      <br />
      <button onClick={() => { setStep("menu") }}>menu</button>
      <br />
      <button onClick={() => { setStep("buildBoard") }}>build a board</button>
      <br />
      <button onClick={() => { setStep("placePieces") }}>placePieces</button>
    </div>
  )
}

function PlacePieces({ setStep, board, pieces, gameMap, setGameMap }) {
  pieces = [];

  return (
    <div className="pieces">
      <div>
        "PlacePieces"
      </div>
      <br />
      <br />
      <button onClick={() => { setStep("menu") }}>menu</button>
      <br />
      <button onClick={() => { setStep("buildBoard") }}>build a board</button>
      <br />
      <button onClick={() => { setStep("buildPieces") }}>build pieces</button>
      <br />
      <button onClick={() => { setStep("game") }}>game</button>
    </div>
  )
}

function Game({ setStep, gameMap, setGameMap }) {
  return (
    <div className="game">
      <div>
        "Game"
      </div>
      <button onClick={() => { setStep("menu") }}>menu</button>
    </div>
  )
}

function Menu({ setStep }) {
  return (
    <div>
      <button onClick={() => { setStep("buildBoard") }}>build a board</button>
      <br />
      <button onClick={() => { setStep("buildPieces") }}>build pieces</button>
      <br />
      <button onClick={() => { setStep("placePieces") }}>place pieces</button>
    </div>
  )
}

export default function Home() {
  var [step, setStep] = React.useState("menu")
  var [board, setBoard] = React.useState([
    [true, true, true, true, true, true, true, true],
    [true, true, true, true, true, true, true, true],
    [true, true, true, true, true, true, true, true],
    [true, true, true, true, true, true, true, true],
    [true, true, true, true, true, true, true, true],
    [true, true, true, true, true, true, true, true],
    [true, true, true, true, true, true, true, true]
  ]);
  var [pieces, setPieces] = React.useState([
    { isPawn: true, name: "pawn", movesTo: [[0, 1]], captures: [[1, 1], [-1, 1]] },
    { name: "rook", movesTo: [[0, inf], [0, -inf], [inf, 0], [-inf, 0]], captures: [[0, inf], [0, -inf], [inf, 0], [-inf, 0]], flies: false },
    { name: "knight", movesTo: [[1, 2], [2, 1], [-1, 2], [-2, 1], [1, -2], [2, -1], [-1, -2], [-2, -1]], captures: [[1, 2], [2, 1], [-1, 2], [-2, 1], [1, -2], [2, -1], [-1, -2], [-2, -1]], flies: true },
    { name: "bishop", movesTo: [[inf, inf], [inf, -inf], [-inf, inf], [-inf, -inf]], captures: [[inf, inf], [inf, -inf], [-inf, inf], [-inf, -inf]], flies: false },
    { name: "queen", movesTo: [[inf, inf], [inf, -inf], [-inf, inf], [-inf, -inf], [0, inf], [0, -inf], [inf, 0], [-inf, 0]], captures: [[inf, inf], [inf, -inf], [-inf, inf], [-inf, -inf], [0, inf], [0, -inf], [inf, 0], [-inf, 0]], flies: false },
    { isKing: true, name: "king", movesTo: [[1, 1], [1, 0], [1, -1], [0, 1], [0, -1], [-1, 1], [-1, 0], [-1, -1]], captures: [[1, 1], [1, 0], [1, -1], [0, 1], [0, -1], [-1, 1], [-1, 0], [-1, -1]], flies: false }
  ]);
  var [gameMap, setGameMap] = React.useState([]);

  switch (step) {
    case "buildBoard":
      return (<div><BuildBoard setStep={setStep} board={board} setBoard={setBoard} /><br /><button onClick={() => { console.log("board", board, "pieces", pieces, "gameMap", gameMap) }}>Logall</button></div>);
    case "buildPieces":
      return (<div><BuildPieces setStep={setStep} pieces={pieces} setPieces={setPieces} /><br /><button onClick={() => { console.log("board", board, "pieces", pieces, "gameMap", gameMap) }}>Logall</button></div>);
    case "placePieces":
      return (<div><PlacePieces setStep={setStep} board={board} pieces={pieces} gameMap={gameMap} setGameMap={setGameMap} /><br /><button onClick={() => { console.log("board", board, "pieces", pieces, "gameMap", gameMap) }}>Logall</button></div>);
    case "game":
      return (<div><Game setStep={setStep} gameMap={gameMap} setGameMap={setGameMap} /><br /><button onClick={() => { console.log("board", board, "pieces", pieces, "gameMap", gameMap) }}>Logall</button></div>);
    default:
      return (<div><Menu setStep={setStep} /><br /><button onClick={() => { console.log("board", board, "pieces", pieces, "gameMap", gameMap) }}>Logall</button></div>);
  }
}


