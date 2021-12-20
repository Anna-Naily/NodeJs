const colors = require("colors");

const numbers = process.argv.slice(2);
console.log(numbers);

function getRandomNumber(min, max) {
  if (!Number.isInteger(min) || !Number.isInteger(max)) {
    console.log(colors.red("Your number isn't a Number"));
    return;
  } else {
    let color = 1;
    for (i = min; i <= max; i++) {
      if (i < min || i > max) {
        console.log(colors.red("Your number is out of range"));
      } else {
        switch (color) {
          case 1:
            console.log(colors.green(i));
            break;
          case 2:
            console.log(colors.yellow(i));
            break;
          case 3:
            console.log(colors.red(i));
            break;
        }
        color++;
        if (color > 3) color = 1;
      }
    }
  }
}
getRandomNumber(Number(numbers[0]), Number(numbers[1]));
