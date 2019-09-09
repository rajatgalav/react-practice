import React from 'react';
import _ from 'lodash';
import Modal, { Body, Footer } from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import './App.scss';

const initialState = {
  matrix: ['', '', '', '', '', '', '', '', ''],
  patternX: [],
  patternO: [],
  winner: '',
};

class App extends React.Component {
  constructor(props){
    super(props);
    this.player1 = 'X';
    this.player2 = 'O';
    this.winningPattern = ['012', '345', '678', '036', '147', '258', '048', '246'];
    this.chance = 1;
    this.firstPlayerTurn = true;
    this.state = {
      matrix: [...initialState.matrix],
      patternX: [...initialState.patternX],
      patternO: [...initialState.patternO],
      winner: initialState.winner,
    };
  }
  divClicked = (e) => {
    var { matrix, patternX, patternO } = this.state;
    const matrixId = parseInt(e.target.id.substr(-1));
    
    const winner = this.checkWinner(matrixId);
    if (this.chance === 1) {
      patternX.push(matrixId);
      matrix[matrixId] = this.player1;
    } else {
      patternO.push(matrixId);
      matrix[matrixId] = this.player2;
    }
    this.setState({ matrix });
    if (winner) {
      if (this.chance === 1) {
        this.setState({ winner: 'player1 wins' })
      } else {
        this.setState({ winner: 'player2 wins' });
      }
    } else {
      this.setState({ patternX, patternO });
      this.chance = this.chance === 1 ? 0 : 1;
    }
  }
  checkWinner = (matrixId) => {
    const player1Array = this.state.patternX.sort();
    const player2Array = this.state.patternO.sort();

    if (player1Array.length >= 2 && this.chance === 1) {
      for (var i = 0 ; i < player1Array.length-1; i++) {
        for ( var j = i+1; j < player1Array.length; j++) {
          const stringformat = this.convertTostring(player1Array[i], player1Array[j], matrixId);
          const flag = _.includes(this.winningPattern, stringformat);
          if (flag) {
            return flag;
          }
        }
      }
    }
    if (player2Array.length >= 2 && this.chance === 0) {
      for (var i = 0 ; i < player2Array.length-1; i++) {
        for ( var j = i+1; j < player2Array.length; j++) {
          const stringformat = this.convertTostring(player2Array[i], player2Array[j], matrixId);
          const flag = _.includes(this.winningPattern, stringformat);
          if (flag) {
            return flag;
          }
        }
      }
    }
    return false;
  }
  convertTostring = (a, b, c) => {
    let arrayFormat = [a, b, c].sort();
    return ''+arrayFormat[0]+arrayFormat[1]+arrayFormat[2];
  }
  closeModel = () => {
    if(this.firstPlayerTurn)
      this.chance = 0;
    else
      this.chance = 1;
    this.setState({ winner: initialState.winner, patternX: [...initialState.patternX], patternO: [...initialState.patternO], matrix: [...initialState.matrix] });
    this.firstPlayerTurn = !this.firstPlayerTurn;
  }
  playAgain = () => {
    this.closeModel();
  }
  newGame = () => {
    this.closeModel();
  }
  render() {
    const { matrix } = this.state;
    return (
      <div>
        <div >
          <div style={{ display: 'flex' }}>
            <div className="game-box" id="first-row-0" onClick={this.divClicked} >{matrix[0]}</div>
            <div className="game-box" id="first-row-1" onClick={this.divClicked} >{matrix[1]}</div>
            <div className="game-box" id="first-row-2" onClick={this.divClicked} >{matrix[2]}</div>
          </div>
          <div style={{ display: 'flex' }}>
            <div className="game-box" id="second-row-3" onClick={this.divClicked} >{matrix[3]}</div>
            <div className="game-box" id="second-row-4" onClick={this.divClicked} >{matrix[4]}</div>
            <div className="game-box" id="second-row-5" onClick={this.divClicked} >{matrix[5]}</div>
          </div>
          <div style={{ display: 'flex' }}>
            <div className="game-box" id="third-row-6" onClick={this.divClicked} >{matrix[6]}</div>
            <div className="game-box" id="third-row-7" onClick={this.divClicked} >{matrix[7]}</div>
            <div className="game-box" id="third-row-8" onClick={this.divClicked} >{matrix[8]}</div>
          </div>
        </div>
        {
          this.state.winner !== '' && (
            <Modal show={this.state.winner !== ''}>
              <Body>
                <p><span>player1:</span><span>player2:</span></p>
                <p><span>1</span><span>0</span></p>
              </Body>
              <Footer>
                <Button variant="secondary" onClick={this.playAgain}>Play Again</Button>
                <Button variant="primary" onClick={this.newGame}>Restart</Button>
              </Footer>
            </Modal>
          )
        }
      </div>
    )
  }
}

export default App;