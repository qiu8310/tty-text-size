# tty-text-size
[![NPM version](https://badge.fury.io/js/tty-text-size.svg)](https://npmjs.org/package/tty-text-size)
[![Build Status][travis-image]][travis-url]
[![Coverage Status][coveralls-image]][coveralls-url]

[travis-url]: https://travis-ci.org/qiu8310/tty-text-size
[travis-image]: https://travis-ci.org/qiu8310/tty-text-size.svg?branch=master
[coveralls-url]: https://coveralls.io/r/qiu8310/tty-text-size
[coveralls-image]: https://coveralls.io/repos/qiu8310/tty-text-size/badge.png


Get string's real length on ternimal.


## Usage


```js

var ttyTextSize = require('tty-text-size');

ttyTextSize('en中国'); // => 6
ttyTextSize(['a', '中']); // => [1, 2]

ttyTextSize('♡'); // => 1  # ♡ is a East Asian Ambiguous Character
ttyTextSize('♡', {ambsize: 2}); // => 2

```

**Notice:**

* Not support `\t`, `\n`, `\v`, `\f`, `\r`, because its size is not predictable.



## Test result

```
  tty-text-size
    Basic Latin
      ✓ should has size 1
      ✓ should throw when get size of \t, \n, \v, \f, \r
    CJK Unified Ideographs
      ✓ should has size 2
    East Asian Ambiguous Character
      ✓ should has size 1 when not enable `ambsize`
      ✓ should has size 2 when enable `ambsize`
    Astral Symbols
      ✓ should has size 1
    Combining Marks
      ✓ should has size 0
    Support Arguments
      ✓ should support long text
      ✓ should support code point argument
      ✓ should support array argument
      ✓ should throws when argument is not number, string or array of number or string
```

## 扩展知识

1. 装饰符号 `e.g: n\u0303 => ñ`

  像这种由两个字符组成的字符串的长度只有 1，其中 `\u0303` 只是装饰符号，它的长度是 0。

  在英文里叫它 [Combining Marks](https://mathiasbynens.be/notes/javascript-unicode#accounting-for-other-combining-marks)


2. Astral Symbols `e.g: \uD83D\uDCA9 => 💩`

  JS 表示 x0000 - xFFFF 之前的字符只需要使用一个字节就行，但 Unicode 总共有 x10FFFF 个字符，
  所以要表示超过了 xFFFF 的字符，在 ES5 之前就采用了 [Surrogate Pairs](https://mathiasbynens.be/notes/javascript-encoding#surrogate-pairs) 的表示法，
  而它会导致你在用 string.length 时得到 2，而它实际只是一个字符而已。

  所以在 ES6 中可以采用 `\u{1F4A9}` 这种统一的写法

  [更多详细介绍参考这里](https://mathiasbynens.be/notes/javascript-unicode#accounting-for-other-combining-marks)

3. 东亚模糊字体 `\u2661 => ♡ `

  英文里叫它 `East Asian Ambiguous Character Width`

  每个终端上都可以配置 ”是否将此类字体设置成 Double 宽度“，所以此类字体在不同的终端上宽度可能也会不一样。



## 链接

* East Asian Width [文档](http://unicode.org/reports/tr11/) [数据](http://www.unicode.org/Public/UCD/latest/ucd/EastAsianWidth.txt)
* [ANSI escape code](https://en.wikipedia.org/wiki/ANSI_escape_code)
* [ASCII 控制字符](https://en.wikipedia.org/wiki/C0_and_C1_control_codes)
* [JavaScript Unicode](https://mathiasbynens.be/notes/javascript-unicode#accounting-for-other-combining-marks)




