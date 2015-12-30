import test from 'ava';
import 'babel-core/register';

import * as game from '../app/scripts/world.js';

test('add cell', t => {
	t.same(
		game.addCell([], 0, 0),
		[{x: 0, y: 0}]
	);

	t.same(
		game.addCell([{x: 0, y: 0}], 0, 0),
		[{x: 0, y: 0}]
	);

	t.same(
		game.addCell([{x: 0, y: 0}], 1, 1),
		[{x: 0, y: 0}, {x: 1, y: 1}]
	);
});

test('remove cell', t => {
	t.same(
		game.removeCell([], 0, 0),
		[]
	);

	t.same(
		game.removeCell([{x: 0, y: 0}], 1, 1),
		[{x: 0, y: 0}]
	);

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

test('world tick', t => {
	t.same(
		game.tick([{x: 0, y: 0}]),
		[]
	);

	t.same(
		game.tick([{x: 0, y: 0}, {x: 0, y: 1}]),
		[]
	);

	t.same(
		game.tick([{x: 0, y: 0}, {x: 1, y: 0}, {x: 0, y: 1}]),
		[{x: 0, y: 0}, {x: 1, y: 0}, {x: 0, y: 1}, {x: 1, y: 1}]
	);

	t.same(
		game.tick([{x: 0, y: 0}, {x: 1, y: 0}, {x: 2, y: 0}]),
		[{x: 1, y: 0}, {x: 1, y: 1}, {x: 1, y: -1}]
	);

	t.same(
		game.tick([{x: 0, y: 0}, {x: 0, y: 1}, {x: 1, y: 0}, {x: 1, y: 1}]),
		[{x: 0, y: 0}, {x: 0, y: 1}, {x: 1, y: 0}, {x: 1, y: 1}]
	);
});
