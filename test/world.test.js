import test from 'ava';
import 'babel-core/register';

import * as game from '../app/scripts/world.js';

test('add cell into empty world', t => {
	t.same(
		game.addCell([], 0, 0),
		[{x: 0, y: 0}]
	);
});

test('add cell which already exists', t => {
	t.same(
		game.addCell([{x: 0, y: 0}], 0, 0),
		[{x: 0, y: 0}]
	);
});

test('add cell to non empty world', t => {
	t.same(
		game.addCell([{x: 0, y: 0}], 1, 1),
		[{x: 0, y: 0}, {x: 1, y: 1}]
	);
});

test('remove cell from empty world', t => {
	t.same(
		game.removeCell([], 0, 0),
		[]
	);
});

test('remove cell non existent cell', t => {
	t.same(
		game.removeCell([{x: 0, y: 0}], 1, 1),
		[{x: 0, y: 0}]
	);
});

test('remove cell existing cell', t => {
	t.same(
		game.removeCell([{x: 0, y: 0}], 0, 0),
		[]
	);

	const before = [
		{x: 0, y: 0},
		{x: 0, y: 1},
		{x: 1, y: 0},
		{x: 1, y: 1}
	];

	const after = [
		{x: 0, y: 0},
		{x: 0, y: 1},
		{x: 1, y: 1}
	];

	t.same(game.removeCell(before, 1, 0), after);
});
