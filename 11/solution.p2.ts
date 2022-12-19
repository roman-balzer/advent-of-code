const input = await Deno.readTextFile("./11/input.txt")

interface Monkey {
  items: number[]
  inspectAmount: number
  divisibleBy: number
  inspectItem: (oldValue: number) => number
  throwToWhich: (oldValue: number) => number
  throwItem: (monkey: Monkey, value: number) => void
}

const monkeyDefinitions = input
  .split(/Monkey \d{1}:\r?\n/)
  .map((m) =>
    m
      .split(/\r?\n/)
      .map((l) => l.trim())
      .filter((l) => l !== "")
  )
  .filter((m) => m.length > 0)

const monkeys: Monkey[] = monkeyDefinitions.map((m) => {
  const items = m[0].replace("Starting items: ", "").split(", ").map(Number)
  const inspectValues = m[1].replace("Operation: new = ", "").split(" ")
  const testDivisableBy = Number(m[2].replace("Test: divisible by ", ""))
  const ifTrueThrowTo = Number(m[3].replace("If true: throw to monkey ", ""))
  const ifFalseThrowTo = Number(m[4].replace("If false: throw to monkey ", ""))

  return {
    items,
    inspectAmount: 0,
    divisibleBy: testDivisableBy,
    inspectItem: function (oldValue: number) {
      this.inspectAmount++
      const [v1, op, v2] = inspectValues
      const value1 = v1 === "old" ? oldValue : Number(v1)
      const value2 = v2 === "old" ? oldValue : Number(v2)
      let afterInpspect
      switch (op) {
        case "+":
          afterInpspect = value1 + value2
          break
        case "-":
          afterInpspect = value1 - value2
          break
        case "*":
          afterInpspect = value1 * value2
          break
        case "/":
          afterInpspect = Math.floor(value1 / value2)
          break
        default:
          afterInpspect = oldValue
      }
      return afterInpspect
    },
    throwToWhich: (oldValue: number) => {
      const test = oldValue % testDivisableBy === 0
      return test ? ifTrueThrowTo : ifFalseThrowTo
    },
    throwItem: function (monkey: Monkey, value: number) {
      this.items.shift()
      monkey.items.push(value)
    },
  }
})

const ROUNDS = 10000
const LCM = monkeys.reduce((a, b) => a * b.divisibleBy, 1)

for (let i = 0; i < ROUNDS; i++) {
  monkeys.forEach((monkey, idx) => {
    // console.log(`Monkey ${idx}:`)
    const itemCopy = [...monkey.items]
    itemCopy.forEach((item) => {
      // console.log(`\tMonkey inspects an item with worry level of ${item}.`)
      const newWorry = monkey.inspectItem(item) % LCM
      // console.log(`\t\tWorry level is changed to ${newWorry}.`)
      const throwTo = monkey.throwToWhich(newWorry)
      // console.log(`\t\tMonkey throws item to monkey ${throwTo}.`)
      monkey.throwItem(monkeys[throwTo], newWorry)
    })
  })

  // console.log(`Round ${i + 1} finished.`)
  monkeys.forEach((item, itemIdx) => {
    // console.log(`Monkey ${itemIdx}: ${item.items.join(", ")}`)
  })
  // console.log(`----------------------`)
}

monkeys.sort((a, b) => b.inspectAmount - a.inspectAmount)

monkeys.forEach((monkey, idx) => {
  console.log(`Monkey ${idx} inspected items ${monkey.inspectAmount} times.`)
})

const monkeyBusinessLevel = monkeys[0].inspectAmount * monkeys[1].inspectAmount

console.log(`Monkey business level is ${monkeyBusinessLevel}.`)
