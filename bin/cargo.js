#!/usr/bin/env node
var fs = require("fs");
var path = require("path");
var sync = require("sync");
var testPath = path.join(process.cwd(), "CargoTestResult.json");

fs.closeSync(fs.openSync(testPath, "w"));
fs.writeFileSync(testPath, JSON.stringify([]));

sync(() => {
	require('ts-node').register({
		typeCheck: false,
		transpileOnly: true,
		files: true,
		ignore: []
	});
}, () => {
	let cli = require('../src/Cli');
	let result = new cli.Program(process.argv).run();
	
	fs.unlinkSync(testPath);

	if (!result) {
		let exit = require("exit");
		exit(1);
	};
});
