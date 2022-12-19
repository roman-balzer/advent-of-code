const input = await Deno.readTextFile("./10/input.txt")

const instructions = input.split(/\r?\n/)

let cycle = 0
let regX = 1 // sprite position - 1-indexed
let signalStrength = 0
const crt: string[] = []
let crtBuffer = ""

const drawCrt = () => {
  if (
    crtBuffer.length + 1 === regX ||
    crtBuffer.length + 1 === regX + 1 ||
    crtBuffer.length + 1 === regX + 2
  ) {
    crtBuffer += "#"
  } else {
    crtBuffer += "."
  }
  if (crtBuffer.length === 40) {
    crt.push(crtBuffer)
    crtBuffer = ""
  }
  console.log("regX", regX, "cycle", cycle, "crtBuffer", crtBuffer)
}

const nextCycle = () => {
  drawCrt()
  cycle++
  if (cycle % 40 === 20) {
    signalStrength += regX * cycle
    console.log(`signalStrength`, regX * cycle, signalStrength)
  }
}

instructions.forEach((line) => {
  const [command, valueStr] = line.split(" ")
  const value = Number(valueStr)

  switch (command) {
    case "noop":
      nextCycle()
      break
    case "addx":
      nextCycle()
      nextCycle()
      regX += value
      break
  }
})

console.log(`signalStrength`, signalStrength)
console.log(`crt\n`, crt)
