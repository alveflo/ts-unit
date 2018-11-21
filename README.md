# Cargotest
An experimental, yet functional, chai testing framework to encourage a more NUnit-ish approach to testing in typescript.

## Install
```
$ npm install -D cargotest
```
### Global runner
```
$ npm install -g cargotest
```

## Setup
`experimentalDecorators` and `emitDecoratorMetadata` needs to be set to true.

## Usage
### Runner
The runner is used either by invoking the cli application (`$ cargo`) and the runner will run all tests in `./tests` folder (if `--path` is not provided to cargo cli application).

### Test script setup
Package.json
```json
"scripts": {
    "test": "./node_modules/.bin/cargo"
}
```

### Code usage
Cargotest currently supports `Test` and `TestCase` decorators, as shown below. The decorators is only used to evaluate the corresponding function and that's it. For assertions, use chai.
```typescript
import { assert } from "chai";
class TestClass {
    @Test
    public When_something_Then_something() {
        let foo = new Foo();

        assert.equal(foo.Bar(), "Bar");
    }

    @Testcase("Darth", "Vader")
    @Testcase("Obi wan", "Kenobi")
    public When_something_Then_something_else(firstName: string, lastName: string) {
        let bar = new Bar();

        assert.equal(bar.GetLastName(firstName), lastName);
    }
}
```

# License
MIT