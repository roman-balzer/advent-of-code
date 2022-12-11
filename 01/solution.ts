const input = await Deno.readTextFile("./01/input.txt")

const caloriesPerElf = input
  .split(/\r?\n/)
  .map((x) => parseInt(x))
  .reduce<number[]>(
    (acc, curr) => {
      if (Number.isNaN(curr)) return acc.push(0), acc
      const add = acc.pop() ?? 0
      acc.push(add + curr)
      return acc
    },
    [0]
  )
const mostCalories = Math.max(...caloriesPerElf)

console.log("Solution 1 - Calories of Elve with most calories", mostCalories)

const sortedCalories = caloriesPerElf.sort((a, b) => b - a)
const sumOfTop3 = sortedCalories[0] + sortedCalories[1] + sortedCalories[2]

console.log("Solution 2 - Sum of calories of top 3 elves", sumOfTop3)
