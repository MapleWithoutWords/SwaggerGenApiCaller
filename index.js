#!/usr/bin/env node

const { program } = require("commander");
const http = require("http");
const fs = require("fs");
const { dataModelGen } = require("./dataModelGen");
const { apiCallerGen } = require("./apiCallerGen");

program
  .version("1.0.13")
  .description("A simple CLI to greet users")
  .option("-su, --swaggerUrl <type>", "swagger url to greet")
  .option("-o, --output <type>", "output directory")
  .parse(process.argv);

const options = program.opts();

if (!options.swaggerUrl) {
  console.error("swaggerUrl is required!");
  return;
}
if (!options.output) {
  options.output = "./src/services";
}
var modelDir = `${options.output}/models`;

fs.stat(options.output, (err, stats) => {
  if (err) {
    if (err.code === "ENOENT") {
      fs.mkdir(options.output, { recursive: true }, (err) => {
        if (err) {
          return console.error(err);
        }
        console.log("Output Directory created successfully!");
      });
    } else {
      return console.error(err);
    }
  }
});

fs.stat(modelDir, (err, stats) => {
  if (err) {
    if (err.code === "ENOENT") {
      fs.mkdir(modelDir, { recursive: true }, (err) => {
        if (err) {
          return console.error(err);
        }
        console.log("Models Directory created successfully!");
      });
    } else {
      return console.error(err);
    }
  }
});

// 发送 GET 请求
http
  .get(options.swaggerUrl, (res) => {
    let data = "";

    // 设置响应编码
    res.setEncoding("utf8");

    // 监听数据接收事件
    res.on("data", (chunk) => {
      data += chunk;
    });

    // 监听响应结束事件
    res.on("end", () => {
      try {
        const jsonData = JSON.parse(data);

        dataModelGen(jsonData, modelDir);

        apiCallerGen(jsonData, options.output);

      } catch (e) {
        console.error("Failed to parse JSON:", e);
      }
    });
  })
  .on("error", (e) => {
    console.error(`Got error: ${e.message}`);
  });
