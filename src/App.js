import React from 'react';
import _ from 'lodash';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import './App.scss';

const initialState = {
  matrix: ['', '', '', '', '', '', '', '', ''],
  patternX: [],
  patternO: [],
  winner: [0, 0],
  winStatus: '',
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
      winStatus: initialState.winStatus,
      winner: [...initialState.winner],
    };
  }
  divClicked = (e) => {
    var { matrix, patternO, winner } = this.state;
    const matrixId = parseInt(e.target.id.substr(-1));
    if(matrix[matrixId] === '') {
      var patternX = [...this.state.patternX];
      var patternO = [...this.state.patternO];
      
      if (this.chance === 1) {
        patternX.push(matrixId);
        matrix[matrixId] = this.player1;
      } else {
        patternO.push(matrixId);
        matrix[matrixId] = this.player2;
      }
      this.setState({ matrix });
      const winStatus = this.checkWinner(matrixId);
      this.setState({ winStatus });
      if (winStatus === 'win') {
        if (this.chance === 1) {
          winner[0] += 1;
          // this.setState({ winner: [...this.state.winner, this.state.winner[0] + 1] })
        } else {
          winner[1] += 1;
          // this.setState({ winner: [...this.state.winner, this.state.winner[1] + 1] });
        }
      } else if ([...patternO, ...patternX].length === 9) {
          this.setState({winStatus: 'draw'});
      } else{
        this.setState({ patternX, patternO });
        this.chance = this.chance === 1 ? 0 : 1;
      }
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
            return 'win';
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
            return 'win';
          }
        }
      }
    }
    return '';
  }
  convertTostring = (a, b, c) => {
    let arrayFormat = [a, b, c].sort();
    return ''+arrayFormat[0]+arrayFormat[1]+arrayFormat[2];
  }
  playAgain = () => {
    if(this.firstPlayerTurn)
      this.chance = 0;
    else
      this.chance = 1;
    this.setState({ patternX: [...initialState.patternX], patternO: [...initialState.patternO], matrix: [...initialState.matrix], winStatus: initialState.winStatus });
    this.firstPlayerTurn = !this.firstPlayerTurn;
  }
  newGame = () => {
    this.chance = 1;
    this.firstPlayerTurn = true;
    this.setState({ winner: initialState.winner, patternX: [...initialState.patternX], patternO: [...initialState.patternO], matrix: [...initialState.matrix], winStatus: initialState.winStatus });
  }
  render() {
    const { matrix, winner } = this.state;
    return (
      <div className="game-container">
        <div className="player-container">
          <span className={this.chance === 1 ? 'active' : null}>X</span>
          <span className={this.chance === 0 ? 'active' : null}>O</span>
        </div>
        <div className="tic-tac-toe">
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
          this.state.winStatus === 'win' && (
            <Modal show={this.state.winStatus === 'win'} className="score-board">
              <Modal.Body>
                <p><span>X:</span><span>O</span></p>
                <p><span>{winner[0]}</span><span>{winner[1]}</span></p>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={this.playAgain}>Play Again</Button>
                <Button variant="primary" onClick={this.newGame}>Restart</Button>
              </Modal.Footer>
            </Modal>
          )
        }
        {
          this.state.winStatus === 'draw' && (
            <Modal show={this.state.winStatus === 'draw'}>
            <Modal.Body>
                <span>Draw</span>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={this.playAgain}>Play Again</Button>
              </Modal.Footer>
            </Modal>
          )
        }
      </div>
    )
  }
}

export default App;