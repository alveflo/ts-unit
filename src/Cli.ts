#!/usr/bin/env ts-node -D TS_NODE_IGNORE_DIAGNOSTICS

import { command, option, program, usage, version } from "commander-ts";
import { Runner } from "./Runner";

const pkg: any = require("../package.json");

@program()
@version(pkg.version)
@usage("--help")
export class Program {
    @option("--path <path>")
    private path: string = "";

    @command()
    private run() {
        const runner = new Runner();
        if (!this.path) {
            this.path = "./tests";
        }

        runner.Run(this.path);
    }
}

const p = new Program();
