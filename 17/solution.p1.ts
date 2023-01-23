import { getInput } from './testcases.ts'

type Field = Array<FieldRow>
type FieldRow = [Cell, Cell, Cell, Cell, Cell, Cell, Cell]
type Cell = '◽' | '◾' | '⬜'

const EMPTY = '◾'
const FALLING = '◽'
const STONE = '⬜'
const FIELD_WIDTH = 7
const GAP_LEFT = 2
const GAP_BOTTOM = 3
const SIMULATE_ROCKS = 2022
const SIMULATE_ROCKS_2 = 1_000_000_000_000
const SHAPES: Cell[][][] = [
  [['◽', '◽', '◽', '◽']],
  [
    ['◾', '◽', '◾'],
    ['◽', '◽', '◽'],
    ['◾', '◽', '◾'],
  ],
  [
    ['◾', '◾', '◽'],
    ['◾', '◾', '◽'],
    ['◽', '◽', '◽'],
  ],
  [['◽'], ['◽'], ['◽'], ['◽']],
  [
    ['◽', '◽'],
    ['◽', '◽'],
  ],
]
const EMPTY_ROW: FieldRow = [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY]

const wind = getInput(!true) as Array<'<' | '>'>
const field: Field = []

let ticks = 0
let height = 0
const rockCountToHeightMap = new Map<number, number>()

const checkArrayForCycle = (arr: Field) => {
  if (arr.length < 2) {
    return false
  }
  let cycleLen = 1
  while (cycleLen * 2 <= arr.length) {
    const first = arr.slice(0, cycleLen).map((row) => row.join(''))
    const second = arr.slice(cycleLen, cycleLen * 2).map((row) => row.join(''))
    const comp1 = first.join('-')
    const comp2 = second.join('-')
    if (comp1 === comp2) {
      return cycleLen
    }
    cycleLen++
  }
}

for (let rockCount = 1; rockCount <= SIMULATE_ROCKS_2; rockCount++) {
  console.log(`🚀TCL ~ rockCount`, rockCount)
  const rockShape = SHAPES[(rockCount - 1) % 5].map(
    (row) =>
      [
        ...new Array(GAP_LEFT).fill(EMPTY),
        ...row,
        ...new Array(FIELD_WIDTH - row.length - GAP_LEFT).fill(EMPTY),
      ] as FieldRow
  )

  while (field.length < 3 || !field[GAP_BOTTOM - 1].every((c) => c === EMPTY)) {
    field.unshift(EMPTY_ROW)
  }
  field.unshift(...rockShape)

  while (true) {
    const heightOfRock = field.findLastIndex((row) =>
      row.some((cell) => cell === FALLING)
    )
    let checkArea = field.splice(0, heightOfRock + 2)
    const windDir = wind[ticks % wind.length]
    ticks++

    const indexOffset = windDir === '>' ? 1 : -1

    try {
      checkArea = checkArea.map((row) => {
        return row.map((cell, idx) => {
          const moveTo = row[idx + indexOffset] as Cell | undefined
          const behind = row[idx - indexOffset] as Cell | undefined
          if (cell === FALLING && (moveTo === STONE || !moveTo)) {
            throw 'Cant move sideways'
          }
          switch (true) {
            case (cell === FALLING || cell === EMPTY) && behind === FALLING:
              return FALLING
            case cell === FALLING:
              return EMPTY
            default:
              return cell
          }
        }) as FieldRow
      })
    } catch (_) {
      /* no-op */
    }

    const canFall = checkArea.every((row, rowIdx, rowArr) => {
      return !row.some((cell, cellIdx) => {
        const below = rowArr[rowIdx + 1]?.[cellIdx]
        return cell === FALLING && (below === STONE || !below)
      })
    })
    if (!canFall) {
      checkArea = checkArea.map((row) => {
        return row.map((cell) => {
          return cell === FALLING ? STONE : cell
        }) as FieldRow
      })
      field.unshift(...checkArea)
      break
    }

    checkArea = checkArea
      .map((row, rowIdx, rowArr) => {
        return row.map((cell, cellIdx) => {
          const above = rowArr[rowIdx - 1]?.[cellIdx] as Cell | undefined
          switch (true) {
            case (cell === FALLING || cell === EMPTY) && above === FALLING:
              return FALLING
            case cell === FALLING:
              return EMPTY
            default:
              return cell
          }
        }) as FieldRow
      })
      .filter((row) => row.some((cell) => cell !== EMPTY))

    field.unshift(...checkArea)
  }

  rockCountToHeightMap.set(field.length, rockCount)
  if (rockCount > 9000) {
    const isCyclic = checkArrayForCycle(field)
    
    if (isCyclic && isCyclic > 1) {
      console.log(`🚀TCL ~ isCyclic`, isCyclic)
      const start = field.length - isCyclic * 2
      console.log(`🚀TCL ~ start`, start, rockCount)
      const rocksBeforeCycle = rockCountToHeightMap.get(start)!
      console.log('Rocks before cycle', rocksBeforeCycle)
      const rocksPerCycle =
        rockCountToHeightMap.get(start + isCyclic)! - rocksBeforeCycle!
      console.log('Rocks per cycle', rocksPerCycle)
      const cycleAmount = (SIMULATE_ROCKS_2 - rocksBeforeCycle!) / rocksPerCycle
      console.log(`🚀TCL ~ cycleAmount`, cycleAmount)
      rockCount = cycleAmount * rocksPerCycle + rocksBeforeCycle!
      console.log(`🚀TCL ~ rockCount`, rockCount)
      height = cycleAmount * isCyclic + start - 1
      break
    }
  }
}

// console.log(
//   field
//     .map((row, idx) => [field.length - idx, ...row])
//     .map((row) => row.join(''))
//     .join('\n')
// )
console.log('Field is', height, 'high')
console.log('Field is', field.length, 'high')
