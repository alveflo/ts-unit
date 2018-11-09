import { Test } from '../../src/Decorators';
import { assert } from 'chai';

class Test_attribute_tests {
    @Test
    When_a_test_has_test_attributes_Then_test_result_is_added_to_container() {
        assert.equal(1,2);
    }
}