const input = await Deno.readTextFile("./13/input.txt")

const pairs = input.split(/\r?\n\r?\n/).map((x) =>
  x
    .split(/\r?\n/)
    .filter((x) => x !== "")
    .map((y) => JSON.parse(y))
)

const isPairInOrder = (
  leftParam: number[] | number,
  rightParam: number[] | number
): any => {
  console.group(`Compare `, leftParam, `vs`, rightParam)

  if (leftParam === rightParam) {
    console.groupEnd()
    return "check-next"
  }
  if (leftParam === undefined) {
    console.groupEnd()
    return "in-order"
  }
  if (rightParam === undefined) {
    console.groupEnd()
    return "not-in-order"
  }

  if (Array.isArray(leftParam) || Array.isArray(rightParam)) {
    const leftT = Array.isArray(leftParam) ? leftParam : [leftParam]
    const rightT = Array.isArray(rightParam) ? rightParam : [rightParam]
    console.log(
      "Convert to arrays",
      JSON.stringify(leftT),
      JSON.stringify(rightT)
    )
    let index = 0
    let order = "check-next"
    while (order === "check-next") {
      if (leftT[index] === undefined && rightT[index] === undefined) {
        console.groupEnd()
        return "check-next"
      }
      order = isPairInOrder(leftT[index], rightT[index])
      index++
    }
    console.log(`order`, order)
    console.groupEnd()
    return order
  }
  console.groupEnd()

  if (leftParam < rightParam) return "in-order"
  if (rightParam < leftParam) return "not-in-order"
  return "check-next"
}

const mappedPairs = pairs.map(([left, right]) => {
  return isPairInOrder(left, right)
})

console.log(`mappedPairs`, mappedPairs)
console.log(
  `mappedPairs`,
  mappedPairs.map((val, idx) => (val === "in-order" ? idx + 1 : 0)),
  "sum",
  mappedPairs
    .map((val, idx) => (val === "in-order" ? idx + 1 : 0))
    .reduce((a, b) => a + b, 0)
)
