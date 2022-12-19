const input = await Deno.readTextFile("./12/input.txt")

interface Position {
  x: number
  y: number
  height: number
  dist: number | null
}
interface Path extends Omit<Position, "dist"> {
  dist: number
}

let startPosition: Position | undefined = undefined
let endPosition: Position | undefined = undefined
const map: Position[][] = input.split(/\r?\n/).map((row, y) => {
  return row
    .trim()
    .split("")
    .map((char, x) => {
      if (char === "S") {
        startPosition = { x, y, height: 0, dist: 0 }
        return startPosition
      }
      if (char === "E") {
        endPosition = { x, y, height: 25, dist: null }
        return endPosition
      }
      return { x, y, height: char.charCodeAt(0) - 97, dist: null }
    })
})

if (!startPosition || !endPosition)
  throw new Error("No start or end position found")

let paths: Path[] = [startPosition as Path]
console.log("paths", paths, "startPosition", startPosition, "endPosition", endPosition)

let foundEnd = false
while (!foundEnd) {
  const newPaths: typeof paths = []
  paths.forEach((path) => {
    const directions = [
      map[path.y - 1]?.[path.x],
      map[path.y + 1]?.[path.x],
      map[path.y][path.x - 1],
      map[path.y][path.x + 1],
    ]
    directions.forEach((dir) => {
      // console.log("path", path, `dir`, dir)
      // console.log(
      //   !!dir,
      //   !!dir && path.height >= dir.height - 1,
      //   !!dir && (dir.dist === null || path.dist + 1 < dir.dist)
      // )
      if (
        dir &&
        path.height >= dir.height - 1 &&
        (dir.dist === null || path.dist + 1 < dir.dist)
      ) {
        if (dir && dir.x === endPosition!.x && dir.y === endPosition!.y) {
          foundEnd = true
        }
        dir.dist = path.dist + 1
        newPaths.push(dir as Path)
      }
    })
  })
  paths = newPaths
  console.log("paths", paths)
}
