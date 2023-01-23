import { getInput } from './testcases.ts'

const cubes = getInput(!true)

const wallsSet = new Set<string>()

cubes.forEach(([x, y, z]) => {
  const walls = [
    `${x - 0.5}-${y}-${z}`,
    `${x + 0.5}-${y}-${z}`,
    `${x}-${y - 0.5}-${z}`,
    `${x}-${y + 0.5}-${z}`,
    `${x}-${y}-${z - 0.5}`,
    `${x}-${y}-${z + 0.5}`,
  ]
  walls.forEach((wall) =>
    wallsSet.has(wall) ? wallsSet.delete(wall) : wallsSet.add(wall)
  )
})

console.log(`🚀TCL ~ wallsSet`, wallsSet, wallsSet.size)
