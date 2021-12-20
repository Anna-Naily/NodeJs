#!/usr/bin/env node
const colors = require("colors");
const fs = require("fs");
const inquirer = require("inquirer");
const path = require("path");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
rl.question("Введите путь до файла: ", filePath => {
  if (filePath == "") filePath = process.cwd();
  const list = fs.readdirSync(filePath);
  rl.question("Введите искомую строку или паттерн: ", searchObj => {
    console.log(searchObj);
    rl.close();
    transitionFunc(list, filePath, searchObj);
  });
});
const findObj = (array, searchObj) => {
  let outputText = "";
  for (let i = 0; i < array.length; i++) {
    if (i < array.length - 1) {
      outputText += array[i] + colors.red(searchObj);
    } else {
      outputText += array[i];
    }
  }
  return outputText;
};
const transitionFunc = (list, currentPath, searchObj) => {
  inquirer
    .prompt([
      {
        name: "fileName",
        type: "list",
        message: "Выберите файл: ",
        choices: list,
      },
    ])
    .then(answer => {
      fullPath = path.join(currentPath, answer.fileName);
      if (fs.lstatSync(fullPath).isFile()) {
        const data = fs.readFileSync(fullPath, "utf-8");
        if (data.includes(searchObj)) {
          const arrWords = data.split(searchObj);
          console.log(findObj(arrWords, searchObj));
        } else if (searchObj === "") {
          console.log(data);
        } else {
          console.log("Совпадений не найдено");
        }
      } else {
        const newList = fs.readdirSync(fullPath);
        console.log(fullPath);
        transitionFunc(newList, fullPath, searchObj);
      }
    });
};
