const fs = require("fs");
const ACCESS_LOG = "./access.log";
const ip_one = "89.123.1.41";
const ip_two = "34.48.240.111";
const readStream = fs.createReadStream(ACCESS_LOG, {
  flags: "r",
  encoding: "utf-8",
  highWaterMark: 64,
});
const writeStream_one = fs.createWriteStream("./89.123.1.41_requests.log", {
  encoding: "utf-8",
  flags: "a",
});
const writeStream_two = fs.createWriteStream("./34.48.240.111_requests.log", {
  encoding: "utf-8",
  flags: "a",
});
readStream.on("data", chunk => {
  const line = chunk.toString();
  if (line.includes(ip_one)) {
    writeStream_one.write(line + "\n");
  } else if (line.includes(ip_two)) {
    writeStream_two.write(line + "\n");
  }
});
readStream.on("end", () => console.log("Reading is finished"));
readStream.on("error", () => console.log(err));
