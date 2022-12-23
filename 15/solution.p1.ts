const input = await Deno.readTextFile("./15/input.txt")

const pairs = input.split(/\r?\n/).map((x) => {
  const [msx, msy, mbx, mby] = Array.from(x.matchAll(/-?\d+/g))
  const sx = Number(msx)
  const sy = Number(msy)
  const bx = Number(mbx)
  const by = Number(mby)
  return { sx, sy, bx, by, mh: Math.abs(sx - bx) + Math.abs(sy - by) }
})
console.log(`🚀 ~ pairs ~ pairs`, pairs)

const rowToCheck = 2_000_000
const intersections: any[] = []

pairs.forEach(({ bx, by, sx, sy, mh }, i) => {
  if (Math.abs(rowToCheck - sy) <= mh) {
    // intersection found
    const deltaY = Math.abs(sy - rowToCheck)
    console.log(`🚀 ~ pairs.forEach ~ deltaY`, deltaY)
    const deltaX = mh - deltaY
    intersections.push([sx - deltaX, sx + deltaX])
  }
})

intersections.sort((a, b) => a[0] - b[0])
console.log(`🚀 ~ intersections`, intersections)

const result: Array<[number, number]> = intersections.reduce(
  (acc, interval, idx, arr) => {
    let currentInterval = acc.curr

    if (acc.curr === null) {
      currentInterval = interval
    } else if (acc.curr[1] >= interval[1]) {
      currentInterval = acc.curr
    } else if (interval[0] <= acc.curr[1] && interval[1] > acc.curr[1]) {
      currentInterval = [acc.curr[0], interval[1]]
    }

    if (acc.curr !== null && interval[0] > acc.curr[1]) {
      return { curr: interval, fin: [...acc.fin, acc.curr] }
    } else if (idx === arr.length - 1) {
      return { curr: null, fin: [...acc.fin, currentInterval] }
    } else {
      return { curr: currentInterval, fin: acc.fin }
    }
  },
  { curr: null, fin: [] }
).fin
console.log(`🚀 ~ result`, result)

const beaconYInRowToCheck = new Set(
  pairs.filter(({ by }) => by === rowToCheck).map(({ by, bx }) => bx + "-" + by)
)
console.log(`🚀 ~ beaconYInRowToCheck`, beaconYInRowToCheck)

const intervalLengths = result.map(([start, end]) => Math.abs(end - start) + 1)
const sumIntervalLengths = intervalLengths.reduce((acc, x) => acc + x, 0)
console.log(
  `🚀TCL ~ file: solution.p1.ts:59 ~ intervalLengths`,
  sumIntervalLengths
)

console.log(sumIntervalLengths - beaconYInRowToCheck.size)
