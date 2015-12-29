import test from 'ava';

import 'babel-core/register';
import xxx from '../app/scripts/module2.js';

test('one', t => {
    t.same([1, 2], [1, 2]);
    t.same(1, 1);
});

test('two', t => {
    t.same([1, 2], [1, 2]);
});

test('xxx', t => {
    t.same(xxx(2,2), 4);
});
