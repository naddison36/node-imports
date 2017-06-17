"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BigNumber = require("bignumber.js");
var x = 0.1, y = 0.2;
var result = new BigNumber(x).
    plus(y);
console.log('%d + %d = %s', x, y, result.toString());
