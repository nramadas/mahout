#!/usr/bin/env node

var spawn = require("child_process").spawn;
var electron = require('electron');

var mahout = spawn(electron, [__dirname + "/electronStart.js"]);

mahout.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

mahout.stderr.on('data', (data) => {
  console.log(`stderr: ${data}`);
});

mahout.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
});
