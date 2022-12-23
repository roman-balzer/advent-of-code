const input = await Deno.readTextFile("./15/input.txt")

const RESTRICT_LOW = 0
const RESTRICT_HIGH = 4_000_000

const pairs = input.split(/\r?\n/).map((x) => {
  const [msx, msy, mbx, mby] = Array.from(x.matchAll(/-?\d+/g))
  const sx = Number(msx)
  const sy = Number(msy)
  const bx = Number(mbx)
  const by = Number(mby)
  return { sx, sy, bx, by, mh: Math.abs(sx - bx) + Math.abs(sy - by) }
})
console.log(`🚀 ~ pairs ~ pairs`, pairs)

const intersectionForRow = (row: number) => {
  const intersections: any[] = []
  pairs.forEach(({ sx, sy, mh }) => {
    if (Math.abs(row - sy) <= mh) {
      // intersection found
      const deltaY = Math.abs(sy - row)
      const deltaX = mh - deltaY
      intersections.push([
        Math.max(sx - deltaX, RESTRICT_LOW),
        Math.min(sx + deltaX, RESTRICT_HIGH),
      ])
    }
  })
  intersections.sort((a, b) => a[0] - b[0])
  const result: Array<[number, number]> = intersections.reduce(
    (acc, interval, idx, arr) => {
      let currentInterval = acc.curr

      if (acc.curr === null) {
        currentInterval = interval
      } else if (acc.curr[1] >= interval[1]) {
        currentInterval = acc.curr
      } else if (interval[0] <= acc.curr[1] + 1 && interval[1] > acc.curr[1]) {
        currentInterval = [acc.curr[0], interval[1]]
      }

      if (acc.curr !== null && interval[0] > acc.curr[1] + 1) {
        return { curr: interval, fin: [...acc.fin, acc.curr] }
      } else if (idx === arr.length - 1) {
        return { curr: null, fin: [...acc.fin, currentInterval] }
      } else {
        return { curr: currentInterval, fin: acc.fin }
      }
    },
    { curr: null, fin: [] }
  ).fin
  return result
}

let y = -1
while (y++ < 4_000_000) {
  const intersections = intersectionForRow(y)
  if (intersections.length > 1) {
    const x = intersections[0][1] + 1
    console.log(x, y)
    console.log("tuning frequency", x * 4_000_000 + y)
  }
}
