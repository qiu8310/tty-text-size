var sizeData = require('../data/size.json');
var ambRange = require('../data/amb.json');
var punycode = require('punycode');

var cpRange;
var isWin = require('os').platform() === 'win32';
if (isWin) {
  try {
    cpRange = require('../data/cp' + require('./cp')() + '.json');
  } catch (e) {};
}

function _isCodePointInRanges (codePoint, ranges) {
  return ranges.some(function (range) {
    if (range.length === 1) return codePoint === range;
    return codePoint >= range[0] && codePoint <= range[1];
  });
}

function codePointSize (codePoint, opts) {
  if ([9, 10, 11, 12, 13].indexOf(codePoint) >= 0)
    throw new Error('Code point ' + codePoint + ' not allowed, its size is not predictable.');

  if (isWin && cpRange) {
    if (!_isCodePointInRanges(codePoint, cpRange)) return 1; // window 对不支持的字符都使用了默认的占一个位置的字符替代
    else if (_isCodePointInRanges(codePoint, ambRange)) return 2;
  }

  if (opts.ambsize === 2 && _isCodePointInRanges(codePoint, ambRange)) return 2;

  for (var size in sizeData) {
    if (sizeData.hasOwnProperty(size) && _isCodePointInRanges(codePoint, sizeData[size])) {
      return parseInt(size, 10);
    }
  }

  return 1;
}

// Refer from `ansi-regex` npm package
var ANSI_REGEXP = /[\u001b\u009b]([[()#;?]*)([0-9]{1,4}(?:;[0-9]{0,4})*)?([0-9A-ORZcf-nqry=><])/g;

// WARN: ignore 9 => \t, 11 => \v, 12 => \f, 10 => \n, 13 => \r
function size (any, opts) {
  opts = opts || {};

  if (Array.isArray(any)) return any.map(function (it) { return size(it, opts); });

  if (typeof any === 'number' || any instanceof Number) {
    return codePointSize(any, opts);
  } else if (typeof any === 'string' || any instanceof String) {
    return size(punycode.ucs2.decode(any.replace(ANSI_REGEXP, '')), opts)
      .reduce(function (memo, i) { return memo + i; }, 0);
  } else {
    throw new Error('Not supported argument [ ' + any + ' ]');
  }
}

module.exports = size;
