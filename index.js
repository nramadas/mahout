#!/usr/bin/env node

var fs = require('fs');
var exec = require('child_process').exec;
var colors = require('colors');
var yargs = require('yargs');

var generate = require('./generate/generate');

yargs
  .command('gen', 'Create a base project', function() {
    generate(function() {
      console.log(colors.green('All done!'));
      process.exit();
    });
  })
  .help()
  .argv;
