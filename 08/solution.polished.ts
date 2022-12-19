const input = await Deno.readTextFile("./08/input.txt")

const trees = input
  .split(/\r?\n/)
  .filter((v) => v.length > 0)
  .map((line) => line.split("").map(Number))

console.log(`Trees`, trees)

const columns = Array(trees[0].length)
  .fill("")
  .map((_, i) => trees.map((row) => row[i]).map((v) => v))

const visibleTrees = trees.reduce(
  (prev, row, y) =>
    prev +
    row.reduce((prevRow, cell, x) => {
      const hiddenLeft = row.slice(0, x).some((v) => v >= cell)
      const hiddenRight = row.slice(x + 1).some((v) => v >= cell)
      const hiddenTop = columns[x].slice(0, y).some((v) => v >= cell)
      const hiddenBottom = columns[x].slice(y + 1).some((v) => v >= cell)
      return hiddenLeft && hiddenRight && hiddenBottom && hiddenTop
        ? prevRow
        : prevRow + 1
    }, 0),
  0
)
console.log(`Amount of Trees visible from outside is`, visibleTrees)
