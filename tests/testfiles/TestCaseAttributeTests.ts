import { TestCase } from '../../src/Decorator';
import { assert } from 'chai';

class Test_case_attribute_tests {
    @TestCase("Foo", "Bar", 1)
    When_a_test_has_test_case_attributes_Then_test_result_is_added_to_container(foo: string, bar: string, num: number) {
        assert.equal(foo, "Foo");
        assert.equal(bar, "Bar");
        assert.equal(num, 1);
    }
}