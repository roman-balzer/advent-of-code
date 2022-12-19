const input = await Deno.readTextFile("./09/input.example2.txt")

const instructions = input.split(/\r?\n/)

const visitedPositions = new Set()
const head = { x: 0, y: 0 }
const tail = { x: 0, y: 0 }

const move = (dir: "U" | "D" | "L" | "R", steps: number) => {
  while (steps > 0) {
    switch (dir) {
      case "U":
        head.y++
        if (head.y === tail.y + 2) {
          tail.y++
          if (head.x !== tail.x) {
            tail.x += head.x - tail.x
          }
        }
        break
      case "D":
        head.y--
        if (head.y === tail.y - 2) {
          tail.y--
          if (head.x !== tail.x) {
            tail.x += head.x - tail.x
          }
        }
        break
      case "L":
        head.x--
        if (head.x === tail.x - 2) {
          tail.x--
          if (head.y !== tail.y) {
            tail.y += head.y - tail.y
          }
        }
        break
      case "R":
        head.x++
        if (head.x === tail.x + 2) {
          tail.x++
          if (head.y !== tail.y) {
            tail.y += head.y - tail.y
          }
        }
        break
    }
    visitedPositions.add(`${tail.x},${tail.y}`)
    steps--
  }
}

instructions.forEach((line) => {
  const [dir, steps] = line.split(" ")
  move(dir as "U" | "D" | "L" | "R", Number(steps))
})
console.log("visitedPos", visitedPositions, visitedPositions.size)
