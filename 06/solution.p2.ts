const input = await Deno.readTextFile("./06/input.txt")

const start = input.split("").findIndex((_, idx, arr) => {
  if (idx < 13) return false
  const prevArr = arr.slice(idx - 13, idx + 1)
  return new Set(prevArr).size === 14
})
console.log(`🚀TCL ~ file: solution.ts:17 ~ start ~ start`, start + 1)
