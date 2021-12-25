#!/usr/bin/env node
const http = require("http");
const fs = require("fs");
let path = require("path");
let filePath = process.cwd();
const portNumber = 5000;

const server = http.createServer((request, response) => {
  filePath = path.join(filePath, request.url);
  console.log(request.url);
  console.log(filePath);
  if (fs.lstatSync(filePath).isFile()) {
    const data = fs.readFileSync(filePath, "utf-8");
    response.write(data);
  } else {
    let list = fs.readdirSync(filePath);
    if (list.length > 0) {
      for (let i = 0; i < list.length; i++) {
        response.write(`<a href = '${list[i]}'> ${list[i]} </a> <br> `);
      }
    }
  }
  response.end();
});
server.listen(portNumber, "localhost");
