import { getInput } from './testcases.ts'

type Coord = [number, number, number]
const cubes = getInput(!true) as Coord[]
console.log(`🚀TCL ~ cubes`, cubes)
const bounds = { minX: 1, maxX: 1, minY: 1, maxY: 1, minZ: 1, maxZ: 1 }

const wallsSet = new Set<string>()
const cubeSet = new Set<string>()

cubes.forEach(([x, y, z]) => {
  const { minX, maxX, minY, maxY, minZ, maxZ } = bounds
  cubeSet.add(`${x}-${y}-${z}`)
  bounds.minX = minX < x ? minX : x
  bounds.maxX = maxX > x ? maxX : x
  bounds.minY = minY < y ? minY : y
  bounds.maxY = maxY > y ? maxY : y
  bounds.minZ = minZ < z ? minZ : z
  bounds.maxZ = maxZ > z ? maxZ : z
})

console.log(`🚀TCL ~ minMax`, bounds)

const checkedCoords = new Set<string>()
let wallCount = 0
const dijkstra = (coord: Coord) => {
  const queue = [coord]

  while (queue.length > 0) {
    const [x, y, z] = queue.shift() as Coord

    if (checkedCoords.has([x, y, z].join('-'))) continue
    const xPrev = x > bounds.minX - 1 ? [x - 1, y, z] : null
    const xNext = x < bounds.maxX + 1 ? [x + 1, y, z] : null
    const yPrev = y > bounds.minY - 1 ? [x, y - 1, z] : null
    const yNext = y < bounds.maxY + 1 ? [x, y + 1, z] : null
    const zPrev = z > bounds.minZ - 1 ? [x, y, z - 1] : null
    const zNext = z < bounds.maxZ + 1 ? [x, y, z + 1] : null

    checkedCoords.add(`${x}-${y}-${z}`)

    const nextCubes = [xPrev, xNext, yPrev, yNext, zPrev, zNext] as Coord[]
    nextCubes.forEach((cube, idx) => {
      if (!cube) return
      if (checkedCoords.has(cube.join('-'))) return
      if (cubeSet.has(cube.join('-'))) wallCount++
      else queue.push(cube)
    })
  }
}

dijkstra([bounds.minX - 1, bounds.minY - 1, bounds.minZ - 1])
console.log(`🚀TCL ~ wallCount`, wallCount)
