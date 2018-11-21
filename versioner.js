if (process.argv.length < 3) {
    console.log("patch/minor/major must be provided.");
    return;
}

let operation = process.argv[2].toString();

if (operation != "minor" && operation != "major" && operation != "patch") {
    console.log("patch/minor/major must be provided.");
    return;
}

const writeJsonFile = require('write-json-file');
let pkg = require("./package.json");
const v = pkg.version.split('.');

let newVersion = v;
if (operation === "patch") {
    newVersion = v[0] + "." + v[1] + "." + (parseInt(v[2]) + 1);
} else if (operation === "minor") {
    newVersion = v[0] + "." + (parseInt(v[1]) + 1) + ".0";
} else if (operation === "major") {
    newVersion = (parseInt(v[0]) + 1) + ".0.0";
}

console.log("New version: ", newVersion);
pkg.version = newVersion;

writeJsonFile.sync("./package.json", pkg);