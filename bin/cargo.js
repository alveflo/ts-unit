#!/usr/bin/env node

const { resolve } = require('path');
const { spawn } = require('child_process');

// const tsnode = spawn(
//   resolve(__dirname, '../node_modules', '.bin', 'ts-node.cmd'),
//   [
//     '--project',
//     resolve(__dirname, '../tsconfig.json'),
//     resolve(__dirname, '../src', 'Cli.ts'),
//   ],
//   { stdio: [process.stdin, process.stdout, process.stderr] },
// );

// tsnode.on('error', data => {
//   console.log(`error: ${data}`);
// });

require('ts-node').register({
	typeCheck: false,
	transpileOnly: true,
	files: true,
	ignore: [],
});

require('../src/Cli');