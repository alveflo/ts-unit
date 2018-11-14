# ts-unit

## What
## Why
## How
## Setup
`experimentalDecorators` and `emitDecoratorMetadata` needs to be set to true.

## Usage
```typescript
class TestClass {
    constructor() {
        // Test initialization done here.
    }

    @Test
    public When_something_Then_something() {

    }

    @Testcase("Darth", "Vader")
    @Testcase("Obi wan", "Kenobi")
    public When_something_Then_something_else(foo: string, bar: string) {

    }
}
```