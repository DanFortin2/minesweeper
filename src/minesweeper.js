//after creating the board element created a constant for print board, it will print off the three nested elements and join a | with spaces to act as a game board
const printBoard = board => {
  console.log('Current Board:');
  console.log(board[0].join(' | '));
  console.log(board[1].join(' | '));
  console.log(board[2].join(' | '));
};

//create a variable called board and created three nested arrays to act like a game board
let board = [
  [' ',' ',' '],
  [' ',' ',' '],
  [' ',' ',' ']
];

//call function and passed off the board array as an argument
printBoard(board);

//hard coding a users guess and bomb in place
board[0][1] = 1;
board[2][2] = 'B';

printBoard(board);
