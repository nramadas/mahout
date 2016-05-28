#!/usr/bin/env node

var fs = require('fs');
var exec = require('child_process').exec;
var colors = require('colors');
var yargs = require('yargs');

var generate = require('./generate');

var cmdArgs = yargs
  .alias('g', 'gen')
    .describe('g', 'Generate a new project')
  .argv;

if (cmdArgs.gen) {
  generate(function() {
    console.log(colors.green('All done!'));
    process.exit();
  });
}
