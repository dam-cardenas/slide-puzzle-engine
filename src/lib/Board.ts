
interface boardDimension { width: number, height:number }
type movement  = "up" | "down" | "left" | "right"
type puzzlePiece = number | null

function getRandomInt(min:number, max:number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}


export default class Board {
  private board:any
  private dimension:boardDimension

  constructor(dimensions:boardDimension) {
    const { width, height } = dimensions
    this.dimension = dimensions
    this.board = {}
    const pieces = this.generateBoardPieces()
    for (let heightCursor = 0; heightCursor < height; heightCursor++) {
      for (let widthCursor = 0; widthCursor < width; widthCursor++) {
        this.board[`${heightCursor}-${widthCursor}`] = this.getRandomPiece(pieces)
      }
    }
    console.log('board >>>', JSON.stringify({board: this.board, pieces}, null, 2))
  }

  generateBoardPieces():puzzlePiece[] {
    const { width, height } = this.dimension
    const totalPieces = width * height -1
    const pool:puzzlePiece[] = [ null ]
    for (let index = 1; index <= totalPieces; index++ ) pool.push(index)
    return pool
  }

  getRandomPiece(piecesPool:puzzlePiece[]):puzzlePiece {
    const piecePosition = getRandomInt( 0, piecesPool.length)
    const piece = piecesPool[piecePosition]
    piecesPool.splice(piecePosition,1)
    return piece
  }
  // TODO: check if puzzle is solved
  // TODO: move up
  // TODO: move down
  // TODO: move right
  // TODO: move left
}