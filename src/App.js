import React, { Component } from 'react';
import Modal from './Modal.js';
import './App.css';

class App extends Component {
  state = {
    sudoku: null,
    modalPos: null
  }

  render() {
    return (
      <div className="App">
        {this.drawSudoku()}
      </div>
    );
  }

  getClass = (pos,original) => {
    if (!original) {
      let nameClass = "";
      if (this.state.modalPos !== null) {
        if (arrEqual(this.state.modalPos, pos)) {
          nameClass += "clicked";
        } else if (isNeighbor(this.state.modalPos, pos)) {
          nameClass += "neighbor";
        }
        if (!arrEqual(this.state.modalPos, pos)) {
          nameClass += " clickable";
        }
        nameClass += addBorder(this.state.modalPos, pos);
      } else {
        nameClass = "clickable";
      }
      return nameClass;
    } else {
      let nameClass = "nonclickable";
      if (this.state.modalPos !== null) {
        if (isNeighbor(this.state.modalPos, pos)) {
          nameClass += " neighbor";
          nameClass += addBorder(this.state.modalPos, pos);
        }
      }
      return nameClass;
    }
  }

  drawSudoku = () => {
    if (this.state.sudoku !== null) {
      let final = [];
      for (let i = 0; i < 9; i++) {
        let nextLine = [];
        for (let j = 0; j < 9; j++) {
          if (this.state.sudoku[i][j] !== 0) {
            nextLine.push(
              <td className={this.getClass([i,j],true)} key={"Cell " + i + " " + j}>{this.state.sudoku[i][j]}</td>
            );
          } else {
            nextLine.push(
              <td className={this.getClass([i,j],false)} key={"Cell " + i + " " + j} onClick={() => {
                console.log(i + "," + j + " cell clicked.");
                this.setState({ modalPos: [i,j] });
              }} />
            );
          }
        }
        final.push(
          <tr key={"Row " + i}>{nextLine}</tr>
        );
      }
      return <div><div className="boardTable"><table><tbody>{final}</tbody></table></div><Modal modalPos={this.state.modalPos}/></div>;
    } else {
      return <button className="btn generateButton" onClick={() => {
        this.setState({ sudoku: scrambleSudoku() });
      }}>Generate Sudoku</button>;
    }
  }

}

function addBorder(pos1, pos2) {
  let final = "";
  const above = copy(pos2);
  above[0] -= 1;
  const left = copy(pos2);
  left[1] -= 1;
  const below = copy(pos2);
  below[0] += 1;
  const right = copy(pos2);
  right[1] += 1;
  let hasAbove = true;
  let hasLeft = true;
  let hasBelow = true;
  let hasRight = true;
  if (above[0] < 0) {
    hasAbove = false;
  }
  if (left[1] < 0) {
    hasLeft = false;
  }
  if (below[0] > 8) {
    hasBelow = false;
  }
  if (right[1] > 8) {
    hasRight = false;
  }
  const notAbove = (!hasAbove || !isNeighbor(pos1,above));
  const notLeft = (!hasLeft || !isNeighbor(pos1,left));
  const notBelow = (!hasBelow || !isNeighbor(pos1,below));
  const notRight = (!hasRight || !isNeighbor(pos1,right));

  if (notAbove && notLeft) {
    final += " topLeft";
  }

  if (notAbove && notRight) {
    final += " topRight";
  }

  if (notBelow && notLeft) {
    final += " bottomLeft";
  }

  if (notBelow && notRight) {
    final += " bottomRight";
  }

  return final;
}

function scrambleSudoku() {
  const boards = [
    [
      [0,0,8,1,0,0,0,9,0],
      [0,0,9,0,0,2,0,0,0],
      [0,0,3,0,0,7,6,0,2],
      [1,7,0,8,0,0,0,0,4],
      [0,0,0,0,0,0,0,0,0],
      [5,0,0,0,0,4,0,7,8],
      [9,0,1,4,0,0,2,0,0],
      [0,0,0,2,0,0,9,0,0],
      [0,6,0,0,0,1,4,0,0]
    ],
    [
      [0,4,0,0,0,2,3,8,0],
      [0,0,0,0,6,0,0,0,0],
      [0,8,7,0,0,0,0,9,0],
      [0,9,1,0,8,0,0,0,0],
      [4,0,0,0,1,0,0,0,6],
      [0,0,0,0,2,0,8,4,0],
      [0,1,0,0,0,0,5,7,0],
      [0,0,0,0,9,0,0,0,0],
      [0,3,9,5,0,0,0,1,0]
    ],
    [
      [0,7,0,2,0,0,0,6,5],
      [0,0,0,0,0,0,0,8,0],
      [0,0,2,0,5,0,4,0,1],
      [0,8,0,0,0,5,0,0,0],
      [7,0,6,0,0,0,1,0,4],
      [0,0,0,6,0,0,0,7,0],
      [4,0,9,0,3,0,6,0,0],
      [0,2,0,0,0,0,0,0,0],
      [1,3,0,0,0,9,0,2,0]
    ],
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

  return board;
}

function ceasarCipher(board,times) {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (board[i][j] > 0) {
        board[i][j] = board[i][j] + times;
        if (board[i][j] > 9) {
          board[i][j] = board[i][j] - 9;
        }
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

function arrEqual(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  }

  for (var i = 0; i < arr1.length; i++) {
    if (arr1[i] instanceof Array && arr2[i] instanceof Array) {
      if (!arrEqual(arr1[i], arr2[i])) {
        return false;
      }
    } else if (arr1[i] !== arr2[i]) {
      return false;
    }
  }
  return true;
}

function isNeighbor(pos1, pos2) {
  if (pos1[0] === pos2[0] || pos1[1] === pos2[1]) {
    return true;
  }

  if (Math.floor(pos1[0] / 3) === Math.floor(pos2[0] / 3) && Math.floor(pos1[1] / 3) === Math.floor(pos2[1] / 3)) {
    return true;
  }

  return false;
}

export default App;
