const input = await Deno.readTextFile("./03/input.txt")
const dupes = input
  .split(/\r?\n/)
  .reduce<Array<[string, string, string]>>((acc, curr, idx) => {
    const accIdx = Math.floor(idx / 3)
    if (!acc[accIdx]) acc[accIdx] = ["", "", ""]
    acc[accIdx][idx % 3] = curr
    return acc
  }, [])
  .map((line) => {
    const [a, b, c] = line
    return a.split("").find((char) => b.includes(char) && c.includes(char))
  })
  .filter((curr): curr is string => curr !== undefined)

const points = dupes.map((dupe) => {
  const point = dupe.charCodeAt(0) - 96
  return point > 0 ? point : dupe.charCodeAt(0) - 38
})

console.log(`🚀TCL ~ file: solution_p2.ts:8 ~ dupes`, dupes)
console.log(`🚀TCL ~ file: solution_p2.ts:8 ~ points`, points)

console.log(
  "Sum of points: ",
  points.reduce((acc, curr) => acc + curr, 0)
)
