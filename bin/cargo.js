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
	require('../src/Cli');

	fs.unlinkSync(testPath);
});
