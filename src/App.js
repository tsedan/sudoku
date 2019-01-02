import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    sudoku: null
  }

  render() {
    return (
      <div className="App">
        {this.drawSudoku()}
      </div>
    );
  }

  drawSudoku() {
    if (this.state.sudoku !== null) {
      let final = [];
      for (let i = 0; i < 9; i++) {
        let nextLine = [];
        for (let j = 0; j < 9; j++) {
          if (this.state.sudoku[i * 9 + j] !== 0) {
            nextLine.push(
              <td key={"Cell " + i + " " + j}>{this.state.sudoku[i * 9 + j]}</td>
            );
          } else {
            nextLine.push(
              <td key={"Cell " + i + " " + j} />
            );
          }
        }
        final.push(
          <tr key={"Row " + i}>{nextLine}</tr>
        );
      }
      return <table><tbody>{final}</tbody></table>;
    } else {
      return <button className="btn GenerateButton" onClick={() => {
        this.setState({ sudoku: unsolve(scrambleSudoku()) });
      }}>Generate Sudoku</button>;
    }
  }

}


function turnTo1D(board) {
  let vboard = [];
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      vboard[vboard.length] = board[i][j];
    }
  }

  return vboard;
}

function scrambleSudoku() {
  const boards = [
    [
      [5,3,4,6,7,8,9,1,2],
      [6,7,2,1,9,5,3,4,8],
      [1,9,8,3,4,2,5,6,7],
      [8,5,9,7,6,1,4,2,3],
      [4,2,6,8,5,3,7,9,1],
      [7,1,3,9,2,4,8,5,6],
      [9,6,1,5,3,7,2,8,4],
      [2,8,7,4,1,9,6,3,5],
      [3,4,5,2,8,6,1,7,9]
    ],
    [
      [5,3,9,6,7,4,1,8,2],
      [7,1,6,2,8,9,3,4,5],
      [8,2,4,5,3,1,7,6,9],
      [6,9,5,8,1,7,4,2,3],
      [1,4,7,3,9,2,8,5,6],
      [2,8,3,4,5,6,9,7,1],
      [9,6,1,7,4,5,2,3,8],
      [4,5,8,1,2,3,6,9,7],
      [3,7,2,9,6,8,5,1,4]
    ],
    [
      [4,5,2,3,9,1,8,7,6],
      [3,1,8,6,7,5,2,9,4],
      [6,7,9,4,2,8,3,1,5],
      [8,3,1,5,6,4,7,2,9],
      [2,4,5,9,8,7,1,6,3],
      [9,6,7,2,1,3,5,4,8],
      [7,9,6,8,5,2,4,3,1],
      [1,8,3,7,4,9,6,5,2],
      [5,2,4,1,3,6,9,8,7]
    ]
  ];

  let board = boards[Math.floor(Math.random() * boards.length)];
  const lineflips = Math.floor(Math.random() * 100);
  for (let i = 0; i < lineflips; i++)
    board = flipLines(board);
  const blockflips = Math.floor(Math.random() * 20);
  for (let i = 0; i < blockflips; i++)
    board = flipBlocks(board);
  const rotations = Math.floor(Math.random() * 5);
  for (let i = 0; i < rotations; i++)
    board = rotateBoard(board);
  const perms = Math.floor(Math.random() * 10);
  board = ceasarCipher(board,perms);

  return turnTo1D(board);
}

function ceasarCipher(board,times) {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      board[i][j] = board[i][j] + times;
      if (board[i][j] > 9) {
        board[i][j] = board[i][j] - 9;
      }
    }
  }
  return board;
}

function flipLines(board) {
  let vboard = copy(board);
  if (Math.round(Math.random()) === 0) {
    board = rotateBoard(board);
    vboard = copy(board);
    const box = Math.floor(Math.random() * 3) * 3;
    const col1 = Math.floor(Math.random() * 3) + box;
    const col2 = Math.floor(Math.random() * 3) + box;
    vboard[col1] = board[col2];
    vboard[col2] = board[col1];
  } else {
    const box = Math.floor(Math.random() * 3) * 3;
    const row1 = Math.floor(Math.random() * 3) + box;
    const row2 = Math.floor(Math.random() * 3) + box;
    vboard[row1] = board[row2];
    vboard[row2] = board[row1];
  }
  return vboard;
}

function flipBlocks(board) {
  let vboard = copy(board);
  if (Math.round(Math.random()) === 0) {
    board = rotateBoard(board);
    vboard = copy(board);
    const col1 = Math.floor(Math.random() * 3) * 3;
    const col2 = Math.floor(Math.random() * 3) * 3;
    vboard[col1] = board[col2];
    vboard[col1 + 1] = board[col2 + 1];
    vboard[col1 + 2] = board[col2 + 2];
    vboard[col2] = board[col1];
    vboard[col2 + 1] = board[col1 + 1];
    vboard[col2 + 2] = board[col1 + 2];
  } else {
    const row1 = Math.floor(Math.random() * 3) * 3;
    const row2 = Math.floor(Math.random() * 3) * 3;
    vboard[row1] = board[row2];
    vboard[row1 + 1] = board[row2 + 1];
    vboard[row1 + 2] = board[row2 + 2];
    vboard[row2] = board[row1];
    vboard[row2 + 1] = board[row1 + 1];
    vboard[row2 + 2] = board[row1 + 2];
  }
  return vboard;
}

function rotateBoard(board) {
  var vboard = [];
  for (let y = 0; y < 9; y++) {
    vboard[y] = [];
    for (let x = 0; x < 9; x++) {
      vboard[y][x] = board[x][y];
    }
  }
  for (let y = 0; y < 9; y++) {
    vboard[y].reverse();
  }
  return vboard;
}

function copy(o) {
  var output, v, key;
  output = Array.isArray(o) ? [] : {};
  for (key in o) {
    v = o[key];
    output[key] = (typeof v === "object") ? copy(v) : v;
  }
  return output;
}

function unsolve(board) {
  let listPos = shuffle(allList(81));

  for (let i = 0; i < 81; i++) {
    let pos = listPos[i];
    const original = board[pos];

    board[pos] = 0;

    const solutions = solve(board);
    if (solutions !== 1) {
      board[pos] = original;
    }
  }

  return board;
}

function allList(num) {
  const final = [];
  for (let i = 0; i < num; i++) {
    final[final.length] = i;
  }
  return final;
}

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function notConflicting(board,row,col) {
  const v = board[row * 9 + col];
  for (let r = 0; r < 9; r++)
    if (board[r * 9 + col] === v && r !== row) return 0;
  for (let c = 0; c < 9; c++)
    if (board[row * 9 + c] === v && c !== col) return 0;
  let left = 3 * Math.floor(col / 3);
  let top = 3 * Math.floor(row / 3);
  for (let r = top; r < top + 3; r++)
    for (let c = left; c < left + 3; c++)
      if (board[r * 9 + c] === v && c !== col && r !== row) return 0;
  return 1;
}

function emptyCells(board) {
  const a = [];
  for (let i = 0; i < 81; i++)
    if (board[i] === 0)
      a.push(i);
  return a;
}

function solveCell(board,index,next_cells) {
  if (next_cells.length === index) {
    return 1;
  }
  const cell = next_cells[index];
  const row = Math.floor(cell / 9) | 0;
  const col = cell % 9;
  let solutions = 0;
  for (let i = 0; i < 9; i++) {
    board[cell] = i + 1;
    if (notConflicting(board,row,col)) {
      solutions += solveCell(board,index + 1,next_cells);
    }
  }
  board[cell] = 0;
  return solutions;
}

function solve(board) {
  return solveCell(board,0,emptyCells(board));
}

export default App;
