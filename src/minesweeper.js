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

//console.log(generatePlayerBoard(2,3));

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
    //add the random bombs for rows and columns to board variable
    board[randomRowIndex][randomColumnIndex] = 'B';
    //increment the count to the number of bombs placed so the total increments up to eventually match number of bombs and not run forever
    numberOfBombsPlaced++;
  }
  //outside the last for loop return the board value
  return board;
};


//after creating the board element created a constant for print board, it will print off the three nested elements and join a | with spaces to act as a game board
const printBoard = board => {
  //took the board value and used map to get all values. Map requires a callback function.
  //So we used row as a paramenter and we join that one line of row and joib it togethre like below
  //then we chain another join on the oustide to add a new line for each row
  console.log(board.map(row => row.join(' | ')).join('\n'));
};

//create a variable for player board that is equal to the generate Player board wtih two two parameters
let playerBoard = generatePlayerBoard(3,4);
//create a variable for the bomb board and set it to equal the generate bomb board function take three parameters
let bombBoard = generateBombBoard(3,4,5);

//log to consol the words player board
console.log('Player Board: ');
//call the print board function and pass through the playerBoard variable as an argument
printBoard(playerBoard);

//same as the two above comments
console.log('Bomb Board: ');
printBoard(bombBoard);
