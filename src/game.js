// To play Minesweeper, we will create instances of MineSweeperGame in command line.
// For example:
// In the command line, navigate to the lib directory and run `node`
// Run `.load game.js` to load the contents of this file.
// Then create a Game instance and run commands like so:
// let game = new Game(3, 3, 3);
// game.playMove(0, 1);
// game.playMove(1, 2);
// When done run `.exit`

import { Board } from './board';


//creat game class
class Game {
  constructor(numberOfRows, numberOfColumns, numberOfBombs) {
    //to use board methods we have to create an insance proptery of board
    this._board = new Board(numberOfRows, numberOfColumns, numberOfBombs);
  }
  playMove(rowIndex, columnIndex) {
    //call flip tile function
    this._board.flipTile(rowIndex, columnIndex);
    //set up if tile equal bomb you lose
    if(this._board.playerBoard[rowIndex][columnIndex] === 'B') {
      console.log('Bomb has been flipped. Game Over!');
      //when lost call print function on this board
      this._board.print();
    } else if(!this._board.hasSafeTiles()) {
      console.log('You win!');
      this._board.print();
    } else {
      console.log('Current Board:');
      this._board.print();
    }
  }
}


/* try to add these features later on

Below is a list of some potential features to add to your Minesweeper game:

Add validation to ensure that board dimensions make sense. For example, a board should not be able to be created with more bombs than it has tiles.
Add a timer which lets players know how long it took them to win (or lose).
Add recursive flipping, when a tile is flipped that isn't touching a bomb (would have the number zero printed on it), all adjacent tiles additionally flip over.
Add a method to place flags at a tile instead of flipping that tile. If a square has a flag on it, it can't be flipped over.

*/
