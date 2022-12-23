// deno-lint-ignore-file
// @deno-types="npm:@types/terminal-kit"
import terminalKit from "npm:terminal-kit"
import { createScreenBuffer, sleep } from "../utils/screenbuffer.ts"
const term = terminalKit.terminal

const input = await Deno.readTextFile("./14/input.txt")

const ROW_NUMBER_LENGTH = 4
const COL_NUMBER_LENGTH = 3

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
term.clear()
console.log(`bounds`, bounds)
bounds.xmax += 80
bounds.ymax += 3
bounds.xmin = Math.max(bounds.xmin - 180, 0)
bounds.ymin = 0

const field: string[][] = Array(bounds.ymax - bounds.ymin)
  .fill(null)
  .map(() => new Array(bounds.xmax - bounds.xmin).fill("."))

const sandOrigin = { x: 500 - bounds.xmin, y: 0 }
field[0][500 - bounds.xmin] = "+"
field[field.length - 1] = new Array(bounds.xmax - bounds.xmin).fill("#")

const baseScreenBuffer = createScreenBuffer({
  dst: term,
  width: bounds.xmax - bounds.xmin + ROW_NUMBER_LENGTH,
  height: bounds.ymax - bounds.ymin + COL_NUMBER_LENGTH,
  y: 3,
})
const debugBuffer = createScreenBuffer({
  dst: term,
  width: term.width - baseScreenBuffer.width - 3,
  height: bounds.ymax - bounds.ymin + COL_NUMBER_LENGTH,
  y: 3,
  x: baseScreenBuffer.width,
})
debugBuffer.moveTo(1, 1)

const rowNumbers = new terminalKit.ScreenBuffer({
  dst: baseScreenBuffer,
  width: ROW_NUMBER_LENGTH,
  height: bounds.ymax - bounds.ymin,
  x: 2,
  y: COL_NUMBER_LENGTH + 1,
})
const colNumbers = new terminalKit.ScreenBuffer({
  dst: baseScreenBuffer,
  width: bounds.xmax - bounds.xmin,
  height: COL_NUMBER_LENGTH,
  x: ROW_NUMBER_LENGTH + 2,
  y: 1,
})
const simulationScreen = new terminalKit.ScreenBuffer({
  dst: baseScreenBuffer,
  blending: true,
  width: bounds.xmax - bounds.xmin,
  height: bounds.ymax - bounds.ymin,
  x: ROW_NUMBER_LENGTH + 2,
  y: COL_NUMBER_LENGTH + 1,
})

colNumbers.fill({ attr: { bgColor: 0 } })
rowNumbers.fill({ attr: { bgColor: 0 } })
simulationScreen.fill({
  attr: { bgColor: "blue", charTransparency: true, underline: true },
})

for (let i = bounds.xmin; i <= bounds.xmax; i++) {
  if (i % 5 === 0 || i === bounds.xmin || i === bounds.xmax - 1) {
    colNumbers.put(
      { newLine: true, direction: "down" } as any,
      String(i).padStart(3, "0") + "\n"
    )
  } else {
    colNumbers.put({ newLine: true, direction: "down" } as any, "\n")
  }
}

field.forEach((row, index) => {
  rowNumbers.put(
    { newLine: true } as any,
    String(bounds.ymin + index).padStart(3, "0") + "\n"
  )
  simulationScreen.put({ newLine: true } as any, row.join("") + "\n")
})

colNumbers.draw()
rowNumbers.draw()

const drawCell = (cell: string) => {
  switch (cell) {
    case ".":
      return "^-" + cell
    case "#":
      return cell
    case "+":
      return "^#^y" + cell
    case "o":
      return "^#^Y" + cell
    default:
      return "^K" + cell
  }
}

const drawSimulation = () => {
  simulationScreen.moveTo(0, 0)
  field.forEach((row, index) => {
    row.forEach((cell, idx) => {
      ;(index < 30 || index % 3 === 0) &&
        simulationScreen.put(
          { wrap: true, markup: true } as any,
          drawCell(cell)
        )
    })
  })
  simulationScreen.draw({ delta: true })
  baseScreenBuffer.draw({ delta: true })
}
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
drawSimulation()

let i = 0
let fallingSand = { ...sandOrigin }
while (i++ < 20000000) {
  // setTimeout(function () {
  const { x, y } = fallingSand
  try {
    if (
      field[1][sandOrigin.x] === "o" &&
      field[1][sandOrigin.x - 1] === "o" &&
      field[1][sandOrigin.x + 1] === "o" &&
      field[2][sandOrigin.x + 2] === "o"
    ) {
      drawSimulation()
      break
    }
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

    i % 10000 === 0 && drawSimulation()
  } catch (e) {
    drawSimulation()
    break
  }
  // }, i * 100)
}

debugBuffer.put({ newLine: true } as any, "done")
const countOfSand = field.reduce((acc, row) => {
  return acc + row.filter((cell) => cell === "o").length
}, 0)
debugBuffer.put({ newLine: true } as any, countOfSand.toString())

baseScreenBuffer.draw()
debugBuffer.draw()
