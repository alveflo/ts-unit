#!/usr/bin/env node

require('ts-node').register({
	typeCheck: false,
	transpileOnly: true,
	files: true,
  ignore: []
});

require('../src/Cli');