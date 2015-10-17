var assert = require('should');
var ttyTextSize = require('../');


describe('tty-text-size', function () {

  context('Basic Latin', function () {
    it('should has size 1', function () {
      ttyTextSize('a').should.eql(1);
      ttyTextSize('2').should.eql(1);
    });

    it('should throw when get size of \\t, \\n, \\v, \\f, \\r', function () {
      assert.throws(function () { ttyTextSize('\t'); });
      assert.throws(function () { ttyTextSize('\n'); });
      assert.throws(function () { ttyTextSize('\v'); });
      assert.throws(function () { ttyTextSize('\f'); });
      assert.throws(function () { ttyTextSize('\r'); });
    });
  });

  context('CJK Unified Ideographs', function () {
    it('should has size 2', function () {
      ttyTextSize('中').should.eql(2);
      ttyTextSize('，').should.eql(2);
    });
  });

  context('East Asian Ambiguous Character', function () {
    it('should has size 1 when not enable `ambsize`', function () {
      ttyTextSize('♡').should.eql(1);
    });
    it('should has size 2 when enable `ambsize`', function () {
      ttyTextSize('♡', {ambsize: 2}).should.eql(2);
    });
  });

  context('Astral Symbols', function () {
    it('should has size 1', function () {
      ttyTextSize('💩').should.eql(1);
      ttyTextSize('💩', {ambsize: 2}).should.eql(1);
    });
  });

  context('Combining Marks', function () {
    it('should has size 0', function () {
      ttyTextSize('̃').should.eql(0);
    });
  });

  context('Support Arguments', function () {
    it('should support long text', function () {
      ttyTextSize('abc').should.eql(3);
      ttyTextSize('a♡中').should.eql(4);
      ttyTextSize('a♡中', {ambsize: 2}).should.eql(5);
    });

    it('should support code point argument', function () {
      ttyTextSize(100).should.eql(1);
      ttyTextSize(128169).should.eql(1);
      ttyTextSize(9825).should.eql(1);
      ttyTextSize(9825, {ambsize: 2}).should.eql(2);
    });
    it('should support array argument', function () {
      assert.deepEqual(ttyTextSize([100, 'b']), [1, 1]);
      assert.deepEqual(ttyTextSize([9825, 'b'], {ambsize: 2}), [2, 1]);
    });

    it('should throws when argument is not number, string or array of number or string', function () {
      assert.throws(function () { ttyTextSize(); });
      assert.throws(function () { ttyTextSize(null); });
      assert.throws(function () { ttyTextSize(false); });
      assert.throws(function () { ttyTextSize(/abc/); });
    });
  });


});
