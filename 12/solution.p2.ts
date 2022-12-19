const input = await Deno.readTextFile("./12/input.txt")

interface Position {
  x: number
  y: number
  height: number
  dist: number | null
  consideredAsStart?: boolean
}
interface Path extends Omit<Position, "dist"> {
  startingAt: { x: number; y: number }
  dist: number
  finished?: boolean
}

let startPosition: Position | undefined = undefined
let endPosition: Position | undefined = undefined
const map: Position[][] = input.split(/\r?\n/).map((row, y) => {
  return row
    .trim()
    .split("")
    .map((char, x) => {
      if (char === "S") {
        startPosition = { x, y, height: 0, dist: 0, consideredAsStart: true }
        return startPosition
      }
      if (char === "E") {
        endPosition = { x, y, height: 25, dist: null }
        return endPosition
      }
      return {
        x,
        y,
        height: char.charCodeAt(0) - 97,
        dist: null,
      }
    })
})

const startPath = startPosition as never as Position
const endPos = endPosition as never as Position

let paths: Path[] = [
  {
    ...startPath,
    startingAt: { x: startPath.x, y: startPath.y },
  } as Path,
]
console.log(
  "paths",
  paths,
  "startPosition",
  startPosition,
  "endPosition",
  endPosition
)

while (paths.some((path) => !path.finished)) {
  const newPaths: typeof paths = []
  paths.forEach((path) => {
    if (path && path.x === endPos.x && path.y === endPos.y) {
      newPaths.push({ ...path, finished: true } as Path)
      return
    }
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
        !dir.consideredAsStart &&
        path.height >= dir.height - 1 &&
        (dir.dist === null || path.dist + 1 < dir.dist)
      ) {
        if (dir.height === 0) {
          dir.consideredAsStart = true
          newPaths.push({ ...dir, startingAt: { x: dir.x, y: dir.y }, dist: 0 })
        } else {
          dir.dist = path.dist + 1
          newPaths.push({
            ...dir,
            startingAt: { x: path.startingAt.x, y: path.startingAt.y },
            dist: dir.dist,
          })
        }
      }
    })
  })
  paths = newPaths
  console.log("paths", paths)
}
