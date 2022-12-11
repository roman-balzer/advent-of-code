const input = await Deno.readTextFile("./09/input.txt")

const instructions = input.split(/\r?\n/)

const visitedPositions = new Set()
const head = { x: 0, y: 0 }
const knots = [
  { x: 0, y: 0 }, // head
  { x: 0, y: 0 },
  { x: 0, y: 0 },
  { x: 0, y: 0 },
  { x: 0, y: 0 },
  { x: 0, y: 0 },
  { x: 0, y: 0 },
  { x: 0, y: 0 },
  { x: 0, y: 0 },
  { x: 0, y: 0 },
]

const move = (dir: "U" | "D" | "L" | "R", steps: number) => {
  while (steps > 0) {
    switch (dir) {
      case "U":
        head.y++
        break
      case "D":
        head.y--
        break
      case "L":
        head.x--
        break
      case "R":
        head.x++
        break
    }
    knots[0] = head
    visitedPositions.add(`${0},${0}`)
    knots.forEach((knot, idx) => {
      if (idx === 0) return
      const { x: px, y: py } = knots[idx - 1]
      const { x, y } = knot
      switch (true) {
        case py === y + 2 || py === y - 2:
          knot.y += py > y ? 1 : -1
          if (px !== x) knot.x += px > x ? 1 : -1
          break
        case px === x + 2 || px === x - 2:
          knot.x += px > x ? 1 : -1
          if (py !== y) knot.y += py > y ? 1 : -1
          break
      }
      if (idx === 9) visitedPositions.add(`${knot.x},${knot.y}`)
    })
    steps--
  }
}

instructions.forEach((line) => {
  const [dir, steps] = line.split(" ")
  move(dir as "U" | "D" | "L" | "R", Number(steps))
})
console.log("visitedPos", visitedPositions, visitedPositions.size)
