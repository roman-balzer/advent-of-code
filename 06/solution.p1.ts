const input = await Deno.readTextFile("./06/input.txt")

const start = input.split("").findIndex((curr, idx, arr) => {
  if (idx < 3) return false
  const prev1 = arr[idx - 1]
  const prev2 = arr[idx - 2]
  const prev3 = arr[idx - 3]
  return (
    curr !== prev1 &&
    curr !== prev2 &&
    curr !== prev3 &&
    prev1 !== prev2 &&
    prev1 !== prev3 &&
    prev2 !== prev3
  )
})
console.log(`🚀TCL ~ file: solution.ts:17 ~ start ~ start`, start + 1)
