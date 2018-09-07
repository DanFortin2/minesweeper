'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//creat game class
var Game = function () {
  function Game(numberOfRows, numberOfColumns, numberOfBombs) {
    _classCallCheck(this, Game);

    //to use board methods we have to create an insance proptery of board
    this._board = new Board(numberOfRows, numberOfColumns, numberOfBombs);
  }

  _createClass(Game, [{
    key: 'playMove',
    value: function playMove(rowIndex, columnIndex) {
      //call flip tile function
      this._board.flipTile(rowIndex, columnIndex);
      //set up if tile equal bomb you lose
      if (this._board.playerBoard[rowIndex][columnIndex] === 'B') {
        console.log('Bomb has been flipped. Game Over!');
        //when lost call print function on this board
        this._board.print();
      } else if (!this._board.hasSafeTiles()) {
        console.log('You win!');
        this._board.print();
      } else {
        console.log('Current Board:');
        this._board.print();
      }
    }
  }]);

  return Game;
}();

//Create board class that takes in the number of columns/rows/bombs to creat board


var Board = function () {
  function Board(numberOfRows, numberOfColumns, numberOfBombs) {
    _classCallCheck(this, Board);

    this._numberOfRows = numberOfRows;
    this._numberOfColumns = numberOfColumns;
    this._numberOfBombs = numberOfBombs;
    //this is used to to determine the size of the board and if the game is over or not at the end of each turn
    this._numberOfTiles = numberOfRows * numberOfColumns;
    //create playerboard/bomboard instance that will be called by the Board Class. First one takes in the board parameters as passed in the constrcuture of this class. Bomb Board takes in the final parameter.
    this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
    this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
  }

  _createClass(Board, [{
    key: 'flipTile',

    //create flip tile to check two things, if tile has been flipped and if tile has bomb in it
    value: function flipTile(rowIndex, columnIndex) {
      //checks to see if specified tile is not empty using row and column index
      if (this._playerBoard[rowIndex][columnIndex] !== ' ') {
        console.log('This tile has been flipped!');
        return;
        //of there is a bomb at that tile then set the player board to = a bomb
      } else if (this._bombBoard[rowIndex][columnIndex] === 'B') {
        this._playerBoard[rowIndex][columnIndex] = 'B';
        //will see if tile flipped or bomb if not then it will be the number of bombs function
      } else {
        this._playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighborBombs(rowIndex, columnIndex);
      }
      //decemrent number of tiles as they are clicked.
      this._numberOfTiles--;
    }
    //create new constant that will figure out how many bombs are adjacent to a tile

  }, {
    key: 'getNumberOfNeighborBombs',
    value: function getNumberOfNeighborBombs(rowIndex, columnIndex) {
      var _this = this;

      //create an empty array to look for offsets of a flipped tile. Example board is a 2d array x y axis, if flipped tile is in the middle
      //then a tile before it is -1 but a tile after it is 1 a title even with it is 0
      //made 8 nested arrays with the possible offsets
      var neighborOffSets = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
      //to deal with the edge of a board where the middle tile is on the edge we will have to take in account the dimensions of the board
      var numberOfRows = this._bombBoard.length;
      //set number of columns to be bombboard length. using [0 counts the rows]
      var numberOfColumns = this._bombBoard[0].length;
      //set variable = 0 which will be used to store the number of bumbos adjacentt o a flipped tile
      var numberOfBombs = 0;
      //need to iterate through each array in neighborOffsets using the row and column offsets
      neighborOffSets.forEach(function (offset) {
        //neighrowindex is the row index + the offset tile row index and column index represent the row and column indices
        var neighborRowIndex = rowIndex + offset[0];
        var neighborColumnIndex = columnIndex + offset[1];
        //to check if the row and column indices of neighboring tiles are valid. Ex don't want to check tiles that are off grid and don't exist
        if (neighborRowIndex >= 0 && neighborRowIndex < numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns) {
          //nested if statement to check if the tile contains a bomb we want to check for a b at the neigh row and neigh column indices
          if (_this._bombBoard[neighborRowIndex][neighborColumnIndex] === 'B') {
            //if both conditions are met then incrment the number of bombs value
            numberOfBombs++;
          }
        }
      });
      //return number of bombs iterating through function
      return numberOfBombs;
    }
    //create method to see if user has won. if the number of tiles is an exact match to bombs the have won, if not they keep playing

  }, {
    key: 'hasSafeTiles',
    value: function hasSafeTiles() {
      return this._numberOfTiles !== this._numberOfBombs;
    }
  }, {
    key: 'print',
    value: function print() {
      //took the board value and used map to get all values. Map requires a callback function.
      //So we used row as a paramenter and we join that one line of row and joib it togethre like below
      //then we chain another join on the oustide to add a new line for each row
      console.log(this._playerBoard.map(function (row) {
        return row.join(' | ');
      }).join('\n'));
    }
    //create function that takes number of rows and columns

  }, {
    key: 'playerBoard',
    get: function get() {
      return this._playerBoard;
    }
  }], [{
    key: 'generatePlayerBoard',
    value: function generatePlayerBoard(numberOfRows, numberOfColumns) {
      //create a variable for board set to empty array
      var board = [];
      //for loop that iterates through the number of rows set at the top Don't use length if a number
      for (var numberOfRowsIndex = 0; numberOfRowsIndex < numberOfRows; numberOfRowsIndex++) {
        //created an empty array variable for hold the row values will add spaces based off column count
        var row = [];
        //create another loop to count how many columns are specified Don't use length if a number
        for (var numberOfColumnsIndex = 0; numberOfColumnsIndex < numberOfColumns; numberOfColumnsIndex++) {
          //push ' ' to the row variable based off how many times it counted
          row.push(' ');
        }
        //just outside of inner for loop push the rows to the board value
        board.push(row);
      }
      //outside the last for loop return the board value
      return board;
    }
    //create a constant to generate a bombboard

  }, {
    key: 'generateBombBoard',
    value: function generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
      //create a variable for board set to empty array
      var board = [];
      //for loop that iterates through the number of rows set at the top Don't use length if a number
      for (var numberOfRowsIndex = 0; numberOfRowsIndex < numberOfRows; numberOfRowsIndex++) {
        //created an empty array variable for hold the row values will add spaces based off column count
        var row = [];
        //create another loop to count how many columns are specified Don't use length if a number
        for (var numberOfColumnsIndex = 0; numberOfColumnsIndex < numberOfColumns; numberOfColumnsIndex++) {
          //push ' ' to the row variable based off how many times it counted
          row.push(null);
        }
        //just outside of inner for loop push the rows to the board value
        board.push(row);
      }
      //create a variable for number of bombs placd
      var numberOfBombsPlaced = 0;
      //add to number of bombs placed by doing a while loop and count as long as it is less then the number of bombs specified
      while (numberOfBombsPlaced < numberOfBombs) {
        //while the loop is going add to a new variable a random number of a row, use math floor and math random to randomize
        var randomRowIndex = Math.floor(Math.random() * numberOfRows);
        var randomColumnIndex = Math.floor(Math.random() * numberOfColumns);
        //if statement to check for duplicates of bombs on a tile and prevent it
        if (board[randomRowIndex][randomColumnIndex] !== 'B') {
          //add the random bombs for rows and columns to board variable
          board[randomRowIndex][randomColumnIndex] = 'B';
          //increment the count to the number of bombs placed so the total increments up to eventually match number of bombs and not run forever
          numberOfBombsPlaced++;
        }
      }
      //outside the last for loop return the board value
      return board;
    }
  }]);

  return Board;
}();

var g = new Game(3, 3, 1);
g.playMove(0, 0);
g.playMove(0, 1);
g.playMove(0, 2);
g.playMove(1, 0);
g.playMove(1, 1);
g.playMove(1, 2);
g.playMove(2, 0);
g.playMove(2, 1);
g.playMove(2, 2);

/*
/////////////////////////////////////
//Create Blank board
////////////////////////////////////
//create function that takes number of rows and columns
const generatePlayerBoard = (numberOfRows, numberOfColumns) => {
  //create a variable for board set to empty array
  let board = [];
  //for loop that iterates through the number of rows set at the top Don't use length if a number
  for (let numberOfRowsIndex = 0; numberOfRowsIndex < numberOfRows; numberOfRowsIndex++) {
    //created an empty array variable for hold the row values will add spaces based off column count
    let row = [];
    //create another loop to count how many columns are specified Don't use length if a number
    for (let numberOfColumnsIndex = 0; numberOfColumnsIndex < numberOfColumns; numberOfColumnsIndex++) {
      //push ' ' to the row variable based off how many times it counted
      row.push(' ');
    }
    //just outside of inner for loop push the rows to the board value
    board.push(row);
  }
  //outside the last for loop return the board value
  return board;
};


/////////////////////
//create bombBoard
/////////////////////
//create a constant to generate a bombboard
const generateBombBoard = (numberOfRows, numberOfColumns, numberOfBombs) => {
  //create a variable for board set to empty array
  let board = [];
  //for loop that iterates through the number of rows set at the top Don't use length if a number
  for (let numberOfRowsIndex = 0; numberOfRowsIndex < numberOfRows; numberOfRowsIndex++) {
    //created an empty array variable for hold the row values will add spaces based off column count
    let row = [];
    //create another loop to count how many columns are specified Don't use length if a number
    for (let numberOfColumnsIndex = 0; numberOfColumnsIndex < numberOfColumns; numberOfColumnsIndex++) {
      //push ' ' to the row variable based off how many times it counted
      row.push(null);
    }
    //just outside of inner for loop push the rows to the board value
    board.push(row);
  }
  //create a variable for number of bombs placd
  let numberOfBombsPlaced = 0;
  //add to number of bombs placed by doing a while loop and count as long as it is less then the number of bombs specified
  while (numberOfBombsPlaced < numberOfBombs) {
    //while the loop is going add to a new variable a random number of a row, use math floor and math random to randomize
    let randomRowIndex = Math.floor(Math.random() * numberOfRows);
    let randomColumnIndex = Math.floor(Math.random() * numberOfColumns);
    //if statement to check for duplicates of bombs on a tile and prevent it
    if (board[randomRowIndex][randomColumnIndex] !== 'B') {
      //add the random bombs for rows and columns to board variable
      board[randomRowIndex][randomColumnIndex] = 'B';
      //increment the count to the number of bombs placed so the total increments up to eventually match number of bombs and not run forever
      numberOfBombsPlaced++;
    }
  }
  //outside the last for loop return the board value
  return board;
};


*/

/*
//////////////////////////////////
//create bomb count around tiles
//////////////////////////////////
//create new constant that will figure out how many bombs are adjacent to a tile
const getNumberOfNeighborBombs = (bombBoard, rowIndex, columnIndex) => {
  //create an empty array to look for offsets of a flipped tile. Example board is a 2d array x y axis, if flipped tile is in the middle
  //then a tile before it is -1 but a tile after it is 1 a title even with it is 0
  //made 8 nested arrays with the possible offsets
  const neighborOffSets = [
    [-1,-1],
    [-1,0],
    [-1,1],
    [0,-1],
    [0,1],
    [1,-1],
    [1,0],
    [1,1]
  ];
  //to deal with the edge of a board where the middle tile is on the edge we will have to take in account the dimensions of the board
  const numberOfRows = bombBoard.length;
  //set number of columns to be bombboard length. using [0 counts the rows]
  const numberOfColumns = bombBoard[0].length;
  //set variable = 0 which will be used to store the number of bumbos adjacentt o a flipped tile
  let numberOfBombs = 0;
  //need to iterate through each array in neighborOffsets using the row and column offsets
  neighborOffSets.forEach(offset => {
    //neighrowindex is the row index + the offset tile row index and column index represent the row and column indices
    const neighborRowIndex = rowIndex + offset[0];
    const neighborColumnIndex = columnIndex + offset[1];
    //to check if the row and column indices of neighboring tiles are valid. Ex don't want to check tiles that are off grid and don't exist
    if (neighborRowIndex >= 0 && neighborRowIndex < numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns) {
      //nested if statement to check if the tile contains a bomb we want to check for a b at the neigh row and neigh column indices
      if (bombBoard[neighborRowIndex][neighborColumnIndex] === 'B') {
        //if both conditions are met then incrment the number of bombs value
        numberOfBombs++;
      }
    }
  });
  //return number of bombs iterating through function
  return numberOfBombs;
};


/////////////////////////////
//create flip tile function
/////////////////////////////
//create flip tile to check two things, if tile has been flipped and if tile has bomb in it
const flipTile = (playerBoard, bombBoard, rowIndex, columnIndex) => {
  //checks to see if specified tile is not empty using row and column index
  if (playerBoard[rowIndex][columnIndex] !== ' ') {
    console.log('This tile has been flipped!');
    return;
    //of there is a bomb at that tile then set the player board to = a bomb
  } else if (bombBoard[rowIndex][columnIndex] === 'B') {
    playerBoard[rowIndex][columnIndex] = 'B';
    //will see if tile flipped or bomb if not then it will be the number of bombs function
  } else {
    playerBoard[rowIndex][columnIndex] = getNumberOfNeighborBombs(bombBoard, rowIndex, columnIndex);
  }
};

//////////////////////////////
//Print  board on Console
//////////////////////////////
//after creating the board element created a constant for print board, it will print off the three nested elements and join a | with spaces to act as a game board
const printBoard = board => {
  //took the board value and used map to get all values. Map requires a callback function.
  //So we used row as a paramenter and we join that one line of row and joib it togethre like below
  //then we chain another join on the oustide to add a new line for each row
  console.log(board.map(row => row.join(' | ')).join('\n'));
};*/

/*
/////////////
//print boards
////////////
//create variables for player and bombboard values
//create a variable for player board that is equal to the generate Player board wtih two two parameters
let playerBoard = generatePlayerBoard(3,4);
//create a variable for the bomb board and set it to equal the generate bomb board function take three parameters
let bombBoard = generateBombBoard(3,4,5);
//print the blank board and bomb board to console.
//log to consol the words player board
console.log('Player Board: ');
//call the print board function and pass through the playerBoard
//variable as an argument
printBoard(playerBoard);
//same as the two above comments
console.log('Bomb Board: ');
printBoard(bombBoard);
//test functionality, call flip tile and pass in the player board,
//bombboard and the two offet numbers as a way to pick a tile
flipTile(playerBoard, bombBoard, 0, 1);
console.log('Updated Player Board: ');
printBoard(playerBoard);
*/