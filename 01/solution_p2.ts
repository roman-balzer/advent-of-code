const input = await Deno.readTextFile("./01/input.txt");

const elves = input
  .split(/\r?\n/)
  .map((x) => parseInt(x))
  .reduce<number[]>(
    (acc, curr) => {
      if (Number.isNaN(curr)) return acc.push(0), acc;
      const add = acc.pop() ?? 0;
      acc.push(add + curr);
      return acc;
    },
    [0]
  )
  .sort((a, b) => b - a);

console.log("Calories of Elve with most calories", Math.max(...elves));
console.log("Sum of calories of top 3 elves", elves[0] + elves[1] + elves[2]);
