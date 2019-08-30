import React from 'react';
import _ from 'lodash';
import './App.css';

class App extends React.Component {
  constructor(props){
    super(props);
    this.player1 = 'X';
    this.player2 = 'O';
    this.state = {
      chance: 1,
      matrix: ['', '', '', '', '', '', '', '', ''],
      winningPattern: [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 7], [0, 4, 7], [2, 4, 6]],
      patternX: [],
      patternO: []
    };
  }
  divClicked = (e) => {
    let { matrix, patternX, patternO } = this.state;
    console.log('div clicked', e.target.id);
    const matrixId = parseInt(e.target.id.substr(-1));
    if (this.state.chance === 1) {
      patternX.push(matrixId);
      matrix[matrixId] = this.player1;
    } else {
      patternO.push(matrixId);
      matrix[matrixId] = this.player2;
    }
    this.checkWinner();
    this.setState({ matrix, patternX, patternO, chance: this.state.chance === 1 ? 0 : 1});
  }
  checkWinner = () => {
    const player1Array = this.state.patternX.sort();
    const player2Array = this.state.patternO.sort();
    var firstMoves = [];
    var secondMoves = [];
    if (player1Array.length > 2){
      for (var i = 0; i < player1Array.length-2; i++) {
        firstMoves.push([player1Array[i], player1Array[i+1], player1Array[i+2]]);
      }
    }
    if (player2Array.length > 2){
      for (var i = 0; i < player2Array.length-2; i++) {
        secondMoves.push([player2Array[i], player2Array[i+1], player2Array[i+2]]);
      }
    }
    return true;
  }
  render() {
    const { matrix } = this.state;
    return (
      <div onClick={this.divClicked}>
        <div style={{ display: 'flex' }}>
          <div className="game-box" id="first-row-0" >{matrix[0]}</div>
          <div className="game-box" id="first-row-1" >{matrix[1]}</div>
          <div className="game-box" id="first-row-2" >{matrix[2]}</div>
        </div>
        <div style={{ display: 'flex' }}>
          <div className="game-box" id="second-row-3" >{matrix[3]}</div>
          <div className="game-box" id="second-row-4" >{matrix[4]}</div>
          <div className="game-box" id="second-row-5" >{matrix[5]}</div>
        </div>
        <div style={{ display: 'flex' }}>
          <div className="game-box" id="third-row-6" >{matrix[6]}</div>
          <div className="game-box" id="third-row-7" >{matrix[7]}</div>
          <div className="game-box" id="third-row-8" >{matrix[8]}</div>
        </div>
      </div>
    )
  }
}

export default App;