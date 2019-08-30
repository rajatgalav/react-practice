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
      winningPattern: ['012', '345', '678', '036', '147', '257', '047', '246'],
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
    this.checkWinner(matrixId);
    this.setState({ matrix, patternX, patternO, chance: this.state.chance === 1 ? 0 : 1});
  }
  checkWinner = (matrixId) => {
    const { chance } = this.state;
    const player1Array = this.state.patternX.sort();
    const player2Array = this.state.patternO.sort();
    var firstMoves = [];
    var secondMoves = [];
    if (player1Array.length > 2 && chance === 1) {
      for (var i = 0 ; i < player1Array.length-2; i++) {
        for ( var j = i+1; j < player1Array.length-1; i++) {
          const flag = _.includes(this.state.winningPattern, ''+player1Array[i]+player1Array[j]+matrixId);
          console.log('flag is', flag);
        }
      }
    }
    if (player2Array.length > 2 && chance === 0){
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