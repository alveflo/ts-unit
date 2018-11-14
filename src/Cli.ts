import { program, version, option, command, usage } from "commander-ts";
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