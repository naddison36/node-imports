# node-imports
An example Node.js program using TypeScript to show module imports and type definitions work.

## Project setup
The following steps assume you have Node.js installed which comes with the Node Package Manager (npm).

Create the [package.json](./package.json) file for npm configuration
```
npm init
```

Install TypeScript which at the time of writing was version 2.3.4
```
npm install typescript --save-dev
```

Create a [tsconfig.json](./tsconfig.json) file for TypeScript configuration
```
./node_modules/typescript/bin/tsc --init
```

Install BigNumber module using npm
```
npm isntall bignumber.js --save
```

Install BigNumber Type Definition using npm
```
npm install @types/bignumber.js --save
```

Link your IDE to use the installed version of TypeScript in folder [./node_modules/typescript/lib/](./node_modules/typescript/lib/). Or run the TypeScript compiler manually from the command line `./node_modules/typescript/bin/tsc`.

Alternatively, you can add install TypeScript globally with but I like to control the version of TypeScript used for each project so avoid this.
```
npm install typescript -g
```

## Test Program
The TypeScript program in [index.ts](./index.ts) simply adds 0.1 and 0.2 to give 0.3
```javascript
    import BigNumber from 'bignumber.js';
    
    const x = 0.1,
        y = 0.2;
    
    const result: BigNumber = new BigNumber(x).
        plus(y);
    
    console.log('%d + %d = %s', x, y, result.toString() );

```

Run the program using Node.js
```javascript
node index
```

Which should give you the following output
```
0.1 + 0.2 = 0.3
```

## Attempts to get the BigNumber Type Definitions to work
1. import BigNumber from 'bignumber.js'

`import BigNumber from 'bignumber.js'`

Using the above project setup with the above BigNumber import in the [index.ts](./index.ts) file, results in the following TypeScript error:

```
Error:(1, 8) TS1192:Module '"~/node_modules/@types/bignumber.js/index"' has no default export.
```

2. declare default export in type definition file

The bignumber.js Type Definition file is location under [node_modules/@types/bignumber.js/index.d.ts](./node_modules/@types/bignumber.js/index.d.ts).

Changing line 10 from `export = BigNumber;` to `export default BigNumber;` fixes the above error but introduces the following error:
```
Error:(6, 15) TS2709:Cannot use namespace 'BigNumber' as a type.

```

3. import {BigNumber} from 'bignumber.js'`

`import {BigNumber} from 'bignumber.js'`

Reterting the bidnumber.js type definition file change back to `export = BigNumber;` and using the above import in [index.ts](./index.ts) results in TypeScript error:
```
Error:(6, 31) TS2686:'BigNumber' refers to a UMD global, but the current file is a module. Consider adding an import instead.
```

This method also get the following error at runtime
```
ReferenceError: BigNumber is not defined

```

4. import {BigNumber} but don't export the BigNumber namespace from Type Definition

`import {BigNumber} from 'bignumber.js'` in `index.ts`
`//export as namespace BigNumber;` comment out line 9 in the Type Definition file
results in the following TypeScript error

```
Error:(6, 31) TS2693:'BigNumber' only refers to a type, but is being used as a value here.
```

5. import * as BigNumber from 'bignumber.js

`import * as BigNumber from 'bignumber.js'`

Reverting to the original Type Definition and using the above import in the [index.ts](./index.ts) file results in TypeScript error:

```
Error:(6, 15) TS2709:Cannot use namespace 'BigNumber' as a type.
```

6. import BigNumber = require('BigNumber)

`import BigNumber = require('bignumber.js');`

Installing the node types `npm install @types/node --save` and using the above import in the [index.ts](./index.ts) file results in TypeScript error:

```
Error:(6, 15) TS2709:Cannot use namespace 'BigNumber' as a type.
```

7. const BigNumber = require('bignumber.js');

`const BigNumber = require('bignumber.js');`

using the above require in the [index.ts](./index.ts) file results in TypeScript error:

```
Error:(6, 15) TS2304:Cannot find name 'BigNumber'.
```
