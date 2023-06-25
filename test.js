const { Board, Direction } = require('./dist/index.js')
const { createInterface  } = require('readline');
const gameBoard = new Board({ 
  dimensions: { width: 3, height: 3 }
})

const puzzleString = (board) => {
  const boardArray = board.to2dArray()
  let prompt = ''
  boardArray.forEach(row => {
    prompt = prompt + row.join(', ') + '\n'
  })
  return prompt
}

const getPrompt = (movement = false) => {
  return `
${puzzleString(gameBoard)}
${movement ? 'movement>\n' : ''}`
}

const readline = createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: `
${puzzleString(gameBoard)}
movement>
`
});

console.log(`
Puzzler!

controls...

press:
   ,---,
   | W |
,--',--',---,
| A | S | D |
'---'---'---'

then enter
`)
readline.prompt()

readline.on("line", line => {
  switch (line.trim()) {
    case 'up':
    case 'w':
      gameBoard.move([Direction.up])
      break;
    case 'down':
    case 's':
      gameBoard.move([Direction.down])
      break;
    case 'left':
    case 'a':
      gameBoard.move([Direction.left])
      break;
    case 'right':
    case 'd':
      gameBoard.move([Direction.right])
      break;
    default:
      console.log(`options available: up [w] , down [s], left [a]  & right [d]`);
      break;
  }
  if (gameBoard.solved) {
    console.log(getPrompt())
    console.log('puzzle solved, thanks for playing')
    return readline.close()
  }
  readline.setPrompt(getPrompt(true))
  readline.prompt(true)
}).on('close', () => {
  process.exit(0);
})