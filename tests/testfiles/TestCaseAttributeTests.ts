import { TestCase } from '../../src/Cargo';
import { assert } from 'chai';

class Test_case_attribute_tests {
    @TestCase("Foo", "Bar", 1)
    @TestCase("A", "A", 1)
    @TestCase("B", "B", 1)
    @TestCase("C", "C", 1)
    When_a_test_has_test_case_attributes_Then_test_result_is_added_to_container(foo: string, bar: string, num: number) {
        assert.equal(foo, "Foo");
        assert.equal(bar, "Bar");
        assert.equal(num, 1);
    }
}