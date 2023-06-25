
interface boardDimension { width: number, height: number }
interface position { x: number, y: number }
type keyValue = [ string, number | null ]
interface boardConfig { dimensions: boardDimension, board?:  keyValue[] }
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

type puzzlePiece = number | null

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

export class Board{
  private board: Map<string, puzzlePiece>
  private solution: Map<string, puzzlePiece>
  private dimension: boardDimension
  private status: BoardStatus

  constructor(config: boardConfig) {
    const { dimensions } = config
    this.dimension = dimensions
    const { solution, board } = this.generateBoard(config)
    this.board = board
    this.solution = solution
    this.move(this.getRandomMovements(20))
    this.status = BoardStatus.ready
  }

  //#region Methods
  generateBoard(config: boardConfig) {
    try {
      const pieces = this.generateBoardPieces(config.dimensions)
      const totalPieces = pieces.length
      if (config.board && totalPieces !== config.board.length)
        throw new Error(`Bad board configuration: wrong key length, length may be ${totalPieces}`)
      const keys = []
      for (let y = 0; y < config.dimensions.height; y++) for (let x = 0; x < config.dimensions.width; x++) keys.push(`${x}-${y}`)
      const board = config.board 
        ? new Map<string, puzzlePiece>(config.board)
        : new Map<string, puzzlePiece>()
      const boardKeys = [...board.keys()]
      if (config.board && JSON.stringify(boardKeys) !== JSON.stringify(keys))
        throw new Error(`Bad board configuration: keys does not match`)
      const solution = new Map<string, puzzlePiece>()
      let solutionCount = 1
      const generator = config.board 
        ? (key:string) => {
          solution.set(
            key, 
            solutionCount !== totalPieces
              ? solutionCount++
              : null
          )
        }
        : (key:string) => {
          board.set(
            key, 
            solutionCount !== totalPieces
              ? solutionCount
              : null
          )
          solution.set(
            key, 
            solutionCount !== totalPieces
              ? solutionCount++
              : null
          )
        }
      keys.forEach(key => generator(key))
      return { board, solution }
    } catch (error) {
      console.log('Generate board error >>>>', error)
      return {
        board: new Map<string, puzzlePiece>(),
        solution: new Map<string, puzzlePiece>(),
      }
    }
  }

  private generateBoardPieces(dimension:boardDimension): puzzlePiece[] {
    const { width, height } = dimension
    const totalPieces = width * height - 1
    const pool: puzzlePiece[] = [null]
    for (let index = 1; index <= totalPieces; index++) pool.push(index)
    return pool
  }

  private getRandomMovements(movementsAmount: number): Direction[] {
    const movements: Direction[] = []
    for (let index = 0; index < movementsAmount; index++)
      movements.push(getRandomInt(Direction.up, Direction.right + 1))
    return movements
  }

  private moveUp() {
    if (!this.ableToMoveUp) return
    const { x, y } = this.position 
    const key = `${x}-${y}`
    const tempKey = `${x}-${y - 1}`
    const tempPiece = this.board.get(tempKey)
    if (!tempPiece) return
    this.board.set(tempKey, null)
    this.board.set(key, tempPiece)
  }
  
  private moveDown() {
    if (!this.ableToMoveDown) return
    const { x, y } = this.position 
    const key = `${x}-${y}`
    const tempKey = `${x}-${y + 1}`
    const tempPiece = this.board.get(tempKey)
    if (!tempPiece) return
    this.board.set(tempKey, null)
    this.board.set(key, tempPiece)
  }

  private moveLeft() {
    if (!this.ableToMoveLeft) return
    const { x, y } = this.position 
    const key = `${x}-${y}`
    const tempKey = `${x - 1}-${y}`
    const tempPiece = this.board.get(tempKey)
    if (!tempPiece) return
    this.board.set(tempKey, null)
    this.board.set(key, tempPiece)
  }

  private moveRight() {
    if (!this.ableToMoveRight) return
    const { x, y } = this.position 
    const key = `${x}-${y}`
    const tempKey = `${x + 1}-${y}`
    const tempPiece = this.board.get(tempKey)
    if (!tempPiece) return
    this.board.set(tempKey, null)
    this.board.set(key, tempPiece)
  }

  move( directions:Direction[]) {
    directions.forEach( direction => {
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

  to2dArray() {
    const { width,  height } = this.dimension
    const board = []
    for (let y = 0; y < height; y++) {
      const column = []
      for (let x = 0; x < width; x++) {
        const key = `${x}-${y}`
        column.push( this.board.get(key) ?? 'x' )        
      }
      board.push(column)
    }
    return board
  }

  toString() {
    return JSON.stringify(this.to2dArray())
  }
  //#endregion
  
  //#region properties
  get solved(): boolean {
    return JSON.stringify([...this.board.entries()]) === JSON.stringify([...this.solution.entries()]) 
  }
  get position(): position {
    for (let x = 0; x < this.dimension.width; x++)
      for (let y = 0; y < this.dimension.height; y++) {
        const value = this.board.get(`${x}-${y}`)
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