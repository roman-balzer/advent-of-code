const input = await Deno.readTextFile("./13/input.txt")

const pairs = input
  .split(/\r?\n/)
  .filter((x) => x !== "")
  .map((y) => JSON.parse(y))

pairs.push([[2]], [[6]])
console.log(`🚀TCL ~ file: solution.p2.ts:12 ~ pairs`, pairs)

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

const sortedPairs = pairs.sort((a, b) => {
  return isPairInOrder(a, b) === "in-order" ? -1 : 1
})

const index1 = sortedPairs.findIndex((x) => JSON.stringify(x) === "[[2]]")
const index2 = sortedPairs.findIndex((x) => JSON.stringify(x) === "[[6]]")

const decoderKey = (index1 + 1) * (index2 + 1)

console.log(`decoderKey`, decoderKey)
