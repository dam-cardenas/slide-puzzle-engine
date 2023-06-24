import Board, { Direction } from "./lib/Board";
const gameBoard = new Board({ width: 3, height: 3 })

console.log({
  position: gameBoard.position,
  solved: gameBoard.solved,
})

gameBoard.move([
  Direction.up,
  Direction.left,
])

console.log({
  position: gameBoard.position,
  solved: gameBoard.solved,
})