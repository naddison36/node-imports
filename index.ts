import * as BigNumber from 'bignumber.js'

const x = 0.1,
    y = 0.2;

const result: BigNumber = new BigNumber(x).
    plus(y);

console.log('%d + %d = %s', x, y, result.toString() );

