const colors = require("colors");

const numbers = process.argv.slice(2);
console.log(numbers);

function getRandomNumber(min, max) {
  for (i = 0; i < 3; i++) {
    if (!Number.isInteger(min) || !Number.isInteger(max)) {
      console.log(colors.red("Your number isn't a Number"));
      return;
    } else {
      const outputNumber = Math.floor(Math.random() * (max - min + 1)) + min;
      if (outputNumber < min || outputNumber > max)
        console.log(colors.red("Your number is out of range"));

      switch (i) {
        case 0:
          console.log(colors.green(outputNumber));
          break;
        case 1:
          console.log(colors.yellow(outputNumber));
          break;
        case 2:
          console.log(colors.red(outputNumber));
          break;
      }
    }
  }
}
getRandomNumber(Number(numbers[0]), Number(numbers[1]));
