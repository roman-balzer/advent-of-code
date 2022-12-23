import React from "npm:react@17"
import { render } from "npm:ink"
import { Base } from "./visualization.tsx"

const input = await Deno.readTextFile("./14/input.example.txt")

const data = input
  .split(/\r?\n/)
  .filter((line) => line.length > 0)
  .map((block) =>
    block.split(" -> ").map((coord) => coord.split(",").map(Number))
  )

const initBounds = {
  xmin: Number.MAX_VALUE,
  xmax: Number.MIN_VALUE,
  ymin: Number.MAX_VALUE,
  ymax: Number.MIN_VALUE,
}
const bounds = data.reduce(
  (prevB, block) => {
    const blockBounds = block.reduce(
      (prevC, coord) => {
        if (coord[0] < prevC.xmin) prevC.xmin = coord[0]
        if (coord[0] > prevC.xmax) prevC.xmax = coord[0]
        if (coord[1] < prevC.ymin) prevC.ymin = coord[1]
        if (coord[1] > prevC.ymax) prevC.ymax = coord[1]
        return prevC
      },
      { ...initBounds }
    )
    return {
      xmin: Math.min(prevB.xmin, blockBounds.xmin),
      xmax: Math.max(prevB.xmax, blockBounds.xmax),
      ymin: Math.min(prevB.ymin, blockBounds.ymin),
      ymax: Math.max(prevB.ymax, blockBounds.ymax),
    }
  },
  { ...initBounds }
)

console.log(`bounds`, bounds)
bounds.xmax += 5
bounds.ymax += 5
bounds.xmin = Math.max(bounds.xmin - 5, 0)
bounds.ymin = Math.max(bounds.ymin - 5, 0)

const field: ("." | "+" | "o" | "#")[][] = Array(bounds.ymax - bounds.ymin)
  .fill(null)
  .map(() => new Array(bounds.xmax - bounds.xmin).fill("."))

const sandOrigin = { x: 500 - bounds.xmin, y: 0 }
field[0][500 - bounds.xmin] = "+"

data.forEach((block, outIdx) => {
  block.forEach(([x, y], index, arr) => {
    // setTimeout(function () {
    if (!arr[index + 1]) return
    const [x2, y2] = arr[index + 1]
    if (x === x2) {
      const yLow = Math.min(y, y2)
      const yHigh = Math.max(y, y2)
      for (let i = yLow; i <= yHigh; i++) {
        field[i - bounds.ymin][x - bounds.xmin] = "#"
      }
    }
    if (y === y2) {
      const xLow = Math.min(x, x2)
      const xHigh = Math.max(x, x2)
      for (let i = xLow; i <= xHigh; i++) {
        field[y - bounds.ymin][i - bounds.xmin] = "#"
      }
    }
    // }, index * 100)
  })
})

render(<Base board={bounds} field={field} />)

let i = 0
let fallingSand = { ...sandOrigin }
while (i++ < 100000000) {
  // setTimeout(function () {
  const { x, y } = fallingSand
  try {
    if (field[y + 1][x] === ".") {
      field[y + 1][x] = "o"
      field[y][x] = field[y][x] === "+" ? "+" : "."
      fallingSand = { x, y: y + 1 }
    } else if (field[y + 1][x - 1] === ".") {
      field[y + 1][x - 1] = "o"
      field[y][x] = "."
      fallingSand = { x: x - 1, y: y + 1 }
    } else if (field[y + 1][x + 1] === ".") {
      field[y + 1][x + 1] = "o"
      field[y][x] = "."
      fallingSand = { x: x + 1, y: y + 1 }
    } else {
      fallingSand = sandOrigin
    }
    i % 50 === 0 && render(<Base board={bounds} field={field} />)
    i % 50 === 0 && console.log(`field`)
  } catch (e) {
    render(<Base board={bounds} field={field} />)
    break
  }
  // }, i * 100)
}
