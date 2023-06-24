
interface boardDimension { width: number, height: number }
interface position { x: number, y: number }
type puzzlePiece = number | null

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

export enum Direction {
  up,
  down,
  left,
  right,
}

export enum BoardStatus {
  ready,
  solved, 
}

export default class Board{
  private board: Map<string, puzzlePiece>
  private solution: Map<string, puzzlePiece>
  private dimension: boardDimension
  private status: BoardStatus

  // TODO: agregar posibilidad de generar un tablero con un preset
  constructor(dimensions: boardDimension) {
    const { width, height } = dimensions
    this.dimension = dimensions
    this.board = new Map<string, puzzlePiece>()
    this.solution = new Map<string, puzzlePiece>()
    const pieces = this.generateBoardPieces()
    const totalPieces = pieces.length
    let solutionCount = 1
    for (let heightCursor = 0; heightCursor < height; heightCursor++) {
      for (let widthCursor = 0; widthCursor < width; widthCursor++) {
        this.board.set(`${heightCursor}-${widthCursor}`, this.getRandomPiece(pieces))
        this.solution.set(`${heightCursor}-${widthCursor}`, solutionCount !== totalPieces
          ? solutionCount++
          : null
        )
      }
    }
    this.status = BoardStatus.ready
  }

  //#region Methods
  private generateBoardPieces(): puzzlePiece[] {
    const { width, height } = this.dimension
    const totalPieces = width * height - 1
    const pool: puzzlePiece[] = [null]
    for (let index = 1; index <= totalPieces; index++) pool.push(index)
    return pool
  }

  private getRandomPiece(piecesPool: puzzlePiece[]): puzzlePiece {
    const piecePosition = getRandomInt(0, piecesPool.length)
    const piece = piecesPool[piecePosition]
    piecesPool.splice(piecePosition, 1)
    return piece
  }

  private moveUp() {
    if (!this.ableToMoveUp) return
    const actualPosition = this.position 
    const tempPiece = this.board.get(`${actualPosition.y - 1}-${actualPosition.x}`)
    if (!tempPiece) return
    this.board.set(`${actualPosition.y - 1}-${actualPosition.x}`, null)
    this.board.set(`${actualPosition.y}-${actualPosition.x}`, tempPiece)
  }
  
  private moveDown() {
    if (!this.ableToMoveDown) return
    const actualPosition = this.position 
    const tempPiece = this.board.get(`${actualPosition.y + 1}-${actualPosition.x}`)
    if (!tempPiece) return
    this.board.set(`${actualPosition.y + 1}-${actualPosition.x}`, null)
    this.board.set(`${actualPosition.y}-${actualPosition.x}`, tempPiece)
  }

  private moveLeft() {
    if (!this.ableToMoveLeft) return
    const actualPosition = this.position 
    const tempPiece = this.board.get(`${actualPosition.y}-${actualPosition.x - 1}`)
    if (!tempPiece) return
    this.board.set(`${actualPosition.y}-${actualPosition.x - 1}`, null)
    this.board.set(`${actualPosition.y}-${actualPosition.x}`, tempPiece)
  }

  private moveRight() {
    if (!this.ableToMoveRight) return
    const actualPosition = this.position 
    const tempPiece = this.board.get(`${actualPosition.y}-${actualPosition.x + 1}`)
    if (!tempPiece) return
    this.board.set(`${actualPosition.y }-${actualPosition.x + 1}`, null)
    this.board.set(`${actualPosition.y}-${actualPosition.x}`, tempPiece)
  }

  move( directions:Direction[]) {
    console.log('start moving...')
    directions.forEach( direction => {
      console.log('moving >>> ', direction)
      switch (direction) {
        case Direction.up:
          this.moveUp()
          break;
        case Direction.down:
          this.moveDown()
          break;
        case Direction.left:
          this.moveLeft()
          break;
        case Direction.right:
          this.moveRight()
      }
    })
    if (this.solved) {
      this.status = BoardStatus.solved
    }
  }
  //#endregion
  
  //#region  properties
  get solved(): boolean {
    return JSON.stringify([...this.board.entries()]) === JSON.stringify([...this.solution.entries()]) 
  }
  get position(): position {
    for (let y = 0; y < this.dimension.height; y++)
      for (let x = 0; x < this.dimension.width; x++) {
        const value = this.board.get(`${y}-${x}`)
        if (!value) return { x, y }
      }
    return { x: -1, y: -1 }
  }
  private get ableToMoveUp():boolean {
    const position = this.position
    return position.y > 0
  }
  
  private get ableToMoveDown():boolean {
    const position = this.position
    return position.y < this.dimension.height - 1
  }

  private get ableToMoveLeft():boolean {
    const position = this.position
    return position.x > 0
  }

  private get ableToMoveRight():boolean {
    const position = this.position
    return position.x < this.dimension.width - 1
  }
  //#endregion
}