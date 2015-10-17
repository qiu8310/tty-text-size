var cp = require('child_process');
var cache = null;

module.exports = function () {

  if (cache) return cache;

  var rtn = cp.execFileSync('chcp', {encoding: 'utf8'});

  if (/(\d+)\s*$/.test(rtn)) {
    cache = RegExp.$1;
  } else {
    cache = '437'; // Default value
  }

  return cache;

}
