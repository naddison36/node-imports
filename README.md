# node-imports
An example Node.js program using TypeScript to show module imports and type definitions work.

## Project setup
The following steps assume you have Node.js installed which comes with the Node Package Manager (npm). For the below testing `node v6.10.3` and `npm 3.10.10` was used.

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

## Changes to get BigNumber Type Definitions to work

Changes required to get the following imports to work without any TypeScript errors
```javascript
import BigNumber from 'bignumber.js';
or
import {BigNumber} from 'bignumber.js';

```

### 1. Change Type Definition from namespace to module
As per [this](https://stackoverflow.com/questions/44605322/typescript-type-definitions-for-bignumber) Stack Overflow answer from [Catalyst](https://stackoverflow.com/users/1710444/catalyst), change the bignumber.js Type Definition file [node_modules/@types/bignumber.js/index.d.ts](./node_modules/@types/bignumber.js/index.d.ts) from

```
    declare var BigNumber: BigNumber.BigNumberStatic;
    
    export as namespace BigNumber;
    export = BigNumber;
    
    declare namespace BigNumber {
```
to this
```
    export default BigNumber;
    
    declare module 'bignumber.js' {
        
        var BigNumber: BigNumberStatic;

```

### 2. import * as BigNumber and declare a new type using BigNumber.BigNumber
The below import will work with node and a new type is declared so the verbose `BigNumber.BigNumber` does not have to be used as a type all through the code.
```javascript
    import * as BigNumber from 'bignumber.js';
    type BN = BigNumber.BigNumber;
    
    const x = 0.1,
        y = 0.2;
    
    const result: BN = new BigNumber(x).
        plus(y);
    
    console.log('%d + %d = %s', x, y, result.toString() );
```

## Attempts to get the BigNumber Type Definitions to work

### 1. import BigNumber from 'bignumber.js'

`import BigNumber from 'bignumber.js'`

Using the above project setup with the above BigNumber import in the [index.ts](./index.ts) file, results in the following TypeScript error:

```
Error:(1, 8) TS1192:Module '"~/node_modules/@types/bignumber.js/index"' has no default export.
```

### 2. declare default export in type definition file

The bignumber.js Type Definition file is location under [node_modules/@types/bignumber.js/index.d.ts](./node_modules/@types/bignumber.js/index.d.ts).

Changing line 10 from `export = BigNumber;` to `export default BigNumber;` fixes the above error but introduces the following error:
```
Error:(6, 15) TS2709:Cannot use namespace 'BigNumber' as a type.

```

### 3. import {BigNumber} from 'bignumber.js'`

`import {BigNumber} from 'bignumber.js'`

Reverting the bidnumber.js type definition file change back to `export = BigNumber;` and using the above import in [index.ts](./index.ts) results in TypeScript error:
```
Error:(6, 31) TS2686:'BigNumber' refers to a UMD global, but the current file is a module. Consider adding an import instead.
```

This method also get the following error at runtime
```
ReferenceError: BigNumber is not defined

```

### 4. import {BigNumber} but don't export the BigNumber namespace from Type Definition

`import {BigNumber} from 'bignumber.js'` in `index.ts`
`//export as namespace BigNumber;` comment out line 9 in the Type Definition file
results in the following TypeScript error

```
Error:(6, 31) TS2693:'BigNumber' only refers to a type, but is being used as a value here.
```

### 5. import * as BigNumber from 'bignumber.js

`import * as BigNumber from 'bignumber.js'`

Reverting to the original Type Definition and using the above import in the [index.ts](./index.ts) file results in TypeScript error:

```
Error:(6, 15) TS2709:Cannot use namespace 'BigNumber' as a type.
```

### 6. import BigNumber = require('BigNumber)

`import BigNumber = require('bignumber.js');`

Installing the node types `npm install @types/node --save` and using the above import in the [index.ts](./index.ts) file results in TypeScript error:

```
Error:(6, 15) TS2709:Cannot use namespace 'BigNumber' as a type.
```

### 7. const BigNumber = require('bignumber.js');

`const BigNumber = require('bignumber.js');`

using the above require in the [index.ts](./index.ts) file results in TypeScript error:

```
Error:(6, 15) TS2304:Cannot find name 'BigNumber'.
```

### 8. allowSyntheticDefaultImports

```
"allowSyntheticDefaultImports": true  /* Allow default imports from modules with no default export. This does not affect code emit, just typechecking. */
```
Using the above config in the TypeScript configuration file [tsconfig.json](./tsconfig.json) results in TypeScript error:
```
Error:(6, 15) TS2709:Cannot use namespace 'BigNumber' as a type.
```

### 9. upgrade to TypeScript version 2.4.0
`npm install typescript@2.4.0 --save-dev`

Upgrading to the next candidate release of TypeScript version [2.4.0](https://github.com/Microsoft/TypeScript/releases/tag/v2.4-rc) results in TypeScript error: 
```
index.ts(1,8): error TS1192: Module '"/Users/nicholasaddison/Documents/workspaces/node-imports/node_modules/@types/bignumber.js/index"' has no default export.
```
