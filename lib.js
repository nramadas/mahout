var Spinner = require('cli-spinner').Spinner;
var colors = require('colors');
var fs = require('fs');
var path = require('path');

var last = function(arr) { return arr[arr.length - 1]; };

var chainCb = function(functionArray, onDone, prevResult) {
  if (!onDone) onDone = function() {};
  if (!functionArray.length) return onDone();

  var props = functionArray[0];
  var fn = props[0];
  var args = prevResult || [];
  var args = args.concat(props.slice(1));
  var args = args.concat([
    function() {
      var args = Array.prototype.slice.call(arguments);
      chainCb(functionArray.slice(1), onDone, args);
    }
  ]);
  fn.apply(null, args);
};

var prompt = function(question, cb, next) {
  if (!next) next = function() {};
  var stdin = process.stdin;
  var stdout = process.stdout;

  stdin.resume();
  stdout.write(question);

  stdin.once('data', function (data) {
    cb(data.toString().trim());
    next();
  });
};

var makeSpinner = function(msg) {
  var spinner = new Spinner(msg);
  spinner.setSpinnerString('⠧⠮⠭⠝⠛⠝⠭⠮');
  spinner.start();
  return spinner;
};

var stopSpinner = function(spinner) {
  if (spinner) spinner.stop(true);
  console.log(spinner.text.replace('%s', colors.green('✓')));
};

var log = function(str, next) {
  console.log(str);
  next();
};

var copyFile = function(file, dest, next) {
  fs.readFile(path.resolve(__dirname, file), function(err, blob) {
    if (err) throw err;

    fs.writeFile('./' + dest, blob, function(err) {
      if (err) throw err;
      console.log(colors.green(' ✓ ') + colors.white('creating ' + dest));
      next();
    });
  });
};

var makeFile = function(file, value, next) {
  if (!value) value = '';

  fs.writeFile('./' + file, value, function(err) {
    if (err) throw err;

    console.log(colors.green(' ✓ ') + colors.white('creating ' + file));
    next();
  });
};

var makeDir = function(dir, next) {
  var target = './' + dir;

  fs.exists(target, function(exists) {
    if (exists) {
      console.log(colors.green(' ✓ ') + colors.white('creating ' + dir));
      next();
    } else {
      fs.mkdir(target, function(err) {
        if (err) throw err;
        console.log(colors.green(' ✓ ') + colors.white('creating ' + dir));
        next();
      });
    }
  });
};

module.exports = {
  log: log,
  prompt: prompt,
  last: last,
  chainCb: chainCb,
  makeSpinner: makeSpinner,
  stopSpinner: stopSpinner,
  copyFile: copyFile,
  makeFile: makeFile,
  makeDir: makeDir,
};
