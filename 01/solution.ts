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
  );

console.log("input", Math.max(...elves));
