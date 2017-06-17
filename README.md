# node-imports
An example Node.js program using TypeScript to show module imports and type definitions

## Project setup
Create the package.json file
```
npm init
npm isntall typescript --save-dev
```

Create a tsconfig.json file
```
./node_modules/typescript/bin/tsc --init
```

## Installing modules
```
npm isntall bignumber.js --save
npm isntall moment --save
```

## Installing Type Definitions
```
npm install @types/bignumber.js --save
```

Line 10 of `node/modules/@types/bignumber.js/index.d.ts` needs to be changed from `export = BigNumber;` to `export default BigNumber;`
