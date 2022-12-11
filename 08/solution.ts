const input = await Deno.readTextFile("./08/input.example.txt")

const trees = input
  .split(/\r?\n/)
  .filter((v) => v.length > 0)
  .map((line) => line.split("").map(Number))

console.log(`Trees`, trees)

const WIDTH = trees[0].length
const indexing = {} as Record<string, Array<readonly [number, number]>>

trees.forEach((row, y) => {
  indexing["y" + y] = row.map((v, i) => [v, i] as const)
})
Array(WIDTH)
  .fill("")
  .forEach((_, i) => {
    indexing["x" + i] = trees
      .map((row) => row[i])
      .map((v, i) => [v, i] as const)
  })
console.log(`🚀TCL ~ file: solution_index.ts:15 ~ indexing`, indexing)

const visTrees = trees.reduce((prev, row, y) => {
  const rowVis = row.reduce((prevRow, cell, x) => {
    const hiddenLeft = indexing["y" + y].some(([v, i]) => v >= cell && i < x)
    const hiddenRight = indexing["y" + y].some(([v, i]) => v >= cell && i > x)
    const hiddenTop = indexing["x" + x].some(([v, i]) => v >= cell && i < y)
    const hiddenBottom = indexing["x" + x].some(([v, i]) => v >= cell && i > y)
    return hiddenLeft && hiddenRight && hiddenBottom && hiddenTop
      ? prevRow
      : prevRow + 1
  }, 0)
  return prev + rowVis
}, 0)
console.log(
  `🚀TCL ~ file: solution_index.ts:38 ~ visTrees ~ visTrees`,
  visTrees
)
