const input = await Deno.readTextFile("./02/input.txt");

// A X Rock 1p
// B Y Paper 2p
// C Z Scissors 3p

const POINTS = [1, 2, 3];

const points = input
  .split(/\r?\n/)
  .filter((round) => round.length !== 0)
  .map((round) => round.split(" "))
  .map((curr) => {
    const [enemy, roundResult] = curr;
    const roundPoint = roundResult === "X" ? 0 : roundResult === "Y" ? 3 : 6;
    const enemyShapePoint = enemy === "A" ? 0 : enemy === "B" ? 1 : 2;
    const shapePoint =
      roundResult === "Y"
        ? POINTS[enemyShapePoint]
        : roundResult === "X"
        ? POINTS[(enemyShapePoint + 2) % 3]
        : POINTS[(enemyShapePoint + 1) % 3];
    return shapePoint + roundPoint;
  })
  .reduce((acc, curr) => acc + curr, 0);

const points2 = input
  .split(/\r?\n/)
  .map((curr) => {
    switch (curr) {
      case "A X":
        return 3 + 0;
      case "A Y":
        return 1 + 3;
      case "A Z":
        return 2 + 6;
      case "B X":
        return 1 + 0;
      case "B Y":
        return 2 + 3;
      case "B Z":
        return 3 + 6;
      case "C X":
        return 2 + 0;
      case "C Y":
        return 3 + 3;
      case "C Z":
        return 1 + 6;
      default:
        return 0;
    }
  })
  .reduce((acc, curr) => acc + curr, 0);

console.log("Points", points);
console.log("Points 2", points2);
