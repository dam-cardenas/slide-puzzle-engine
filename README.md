# Slide Puzzle Engine

It is a library that allows you to generate a sliding puzzle board, you can control its movement and check if the puzzle has been solved.

## Imports

### ES Module
```js
import { Board } from 'slide-puzzle-engine';
```

### CommonJs Module
```cjs
const { Board } = require('slide-puzzle-engine/dist');
```

### IIFE (web)
```html
<!-- inside <head> -->
<script src='https://unpkg.com/slide-puzzle-engine@1.0.4/dist/index.iife.js' type="text/javascript"></script>
```

## CLI test
By executing this command you will start a test of the engine on the command line

```bash
npm test
```
![Test image](https://raw.githubusercontent.com/dam-cardenas/slide-puzzle-engine/main/readmeResources/resource-1.png)


## How to use it
### Create a new board

The Board is the main object of the game, it can be instantiated as follows.

```js
const { Board } = window.SlidePuzzleEngine // only for IIFE imports
const puzzle = new Board({
  dimensions: {
    width: 3,
    height: 3,
  }
})
```

### Get a 2D Array of the board

Use this function to render your board, the **"x"** indicates the empty space.

```js
console.log(puzzle.to2dArray())

// output example:
//[
//  [1, 3, 6],
//  [5, 7, 2],
//  [4, "x", 8],
//] 
```
### Move across the board

You can move across the board by swapping positions between the empty space and a token. To do this, use the **move()** function and the **Direction** enum.


#### To import direcions:

##### EsModule 
```js
import { Direction } from 'slide-puzzle-engine'; 
```
##### CommonJs
```js
const { Direction } = require('slide-puzzle-engine/dist')
```
##### IIFE (web)
```js
const { Direction } = window.SlidePuzzleEngine
```

#### To use move()

```js
puzzle.move([
  Direction.up,
  ...moreDirections // you can make more than one move at once
])
```

### Check if the puzzle is solved

```js
if (puzzle.solved) {
  // add your magic here
}
```