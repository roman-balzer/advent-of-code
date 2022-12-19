const input = await Deno.readTextFile("./04/input.txt")
const pairs = input.split(/\r?\n/)

const contains = pairs
  .map((pair) =>
    pair
      .split(",")
      .map((section) => section.split("-"))
      .flat()
      .map(Number)
  )
  .map(([a, b, c, d]) => {
    return (a <= c && b >= d) || (c <= a && d >= b)
  })

// count true in contains and print
console.log(
  "sum of contains: ",
  contains.reduce((acc, curr) => acc + (curr ? 1 : 0), 0)
)
