"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bignumber_js_1 = require("bignumber.js");
var x = 0.1, y = 0.2;
var result = new bignumber_js_1.default(x).
    plus(y);
console.log('%d + %d = %s', x, y, result.toString());
