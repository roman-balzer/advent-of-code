const input = await Deno.readTextFile("./05/input.txt")
const [head, ...tail] = input.split("move ")

const stackVis = head
  .split(/\r?\n/)
  .filter((curr) => curr !== "")
  .reverse()
const [stackNumbers, ...stackTail] = stackVis
const stackAmount = stackVis[0].replaceAll(" ", "").length

const stacks = {} as Record<string, string[]>
stackNumbers.split("").forEach((char, idx) => {
  if (char === "" || char === " ") return
  stacks[char] = stackTail.map((row) => row[idx]).filter((curr) => curr !== " ")
})

console.log(`stacks`, stacks)

const commands = tail.map((command) => {
  const [amount, rest1] = command.replace(/\r?\n/, "").split(" from ")
  const [from, to] = rest1.split(" to ")
  return { amount: Number(amount), from: Number(from), to: Number(to) }
})
console.log(`🚀TCL ~ file: solution.ts:24 ~ commands ~ commands`, commands)

const moveStacks = (
  stacks: Record<string, string[]>,
  command: typeof commands[0]
) => {
  const { amount, from, to } = command
  const fromStack = stacks[from]
  const toStack = stacks[to]
  const moved = fromStack.splice(amount * -1).reverse()
  toStack.push(...moved)
  return stacks
}

// const finalStacks = commands.reduce(moveStacks, stacks)
const finalStacks = commands.reduce((acc, curr) => {
  console.log(`🚀TCL ~ file: solution.ts:40 ~ finalStacks ~ acc`, acc)
  return moveStacks(acc, curr)
}, stacks)

console.log(
  "last object per stack",
  Object.values(finalStacks)
    .map((stack) => stack[stack.length - 1])
    .reduce((acc, curr) => acc + curr, "")
)
