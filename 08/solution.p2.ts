const input = await Deno.readTextFile("./08/input.txt")

const treeGrid = input
  .split(/\r?\n/)
  .filter((v) => v.length > 0)
  .map((line) => line.split("").map(Number))

const WIDTH = treeGrid[0].length

console.log(`🚀TCL ~ file: solution.ts:4 ~ treeGrid`, treeGrid)

const indexing = {} as Record<string, Array<readonly [number, number]>>

treeGrid.forEach((row, y) => {
  indexing["y" + y] = row.map((v, i) => [v, i] as const)
})
Array(WIDTH)
  .fill(-1)
  .forEach((_, i) => {
    indexing["x" + i] = treeGrid
      .map((row) => row[i])
      .map((v, i) => [v, i] as const)
  })
console.log(`🚀TCL ~ file: solution_index.ts:15 ~ indexing`, indexing)

const visTrees = treeGrid.map((row, y) => {
  return row.map((cell, x) => {
    const rowLeft = indexing["y" + y].slice(0, x).reverse()
    const viewLeft = rowLeft.findIndex(([v]) => v >= cell) + 1 || rowLeft.length

    const rowRight = indexing["y" + y].slice(x + 1)
    const viewRight =
      rowRight.findIndex(([v]) => v >= cell) + 1 || rowRight.length

    const colTop = indexing["x" + x].slice(0, y).reverse()
    const viewTop = colTop.findIndex(([v]) => v >= cell) + 1 || colTop.length

    const colBottom = indexing["x" + x].slice(y + 1)
    const viewBottom =
      colBottom.findIndex(([v]) => v >= cell) + 1 || colBottom.length

    const scenicScore = viewBottom * viewTop * viewRight * viewLeft
    console.log(`scenicScore`, scenicScore)

    return scenicScore
  }, 0)
}, 0)

console.log(
  `🚀TCL ~ file: solution_index.ts:38 ~ visTrees ~ visTrees`,
  visTrees
)
console.log(`highest scenicScore`, Math.max(...visTrees.flat()))
