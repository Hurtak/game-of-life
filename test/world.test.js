import test from 'ava'

import * as game from '../app/scripts/utils/world.js'

test('add cell', t => {
  t.deepEqual(
    game.addCell([], 0, 0),
    [[0, 0]]
  )

  t.deepEqual(
    game.addCell([[0, 0]], 0, 0),
    [[0, 0]]
  )

  t.deepEqual(
    game.addCell([[0, 0]], 1, 1),
    [[0, 0], [1, 1]]
  )
})

test('remove cell', t => {
  t.deepEqual(
    game.removeCell([], 0, 0),
    []
  )

  t.deepEqual(
    game.removeCell([[0, 0]], 1, 1),
    [[0, 0]]
  )

  t.deepEqual(
    game.removeCell([[0, 0]], 0, 0),
    []
  )

  const before = [[0, 0], [0, 1], [1, 0], [1, 1]]
  const after = [[0, 0], [0, 1], [1, 1]]
  t.deepEqual(game.removeCell(before, 1, 0), after)
})

test('add cursor', t => {
  t.deepEqual(
    game.addCursor([], 0, 0, [[0, 0]]),
    [[0, 0]]
  )

  t.deepEqual(
    game.addCursor([[10, 10]], 0, 0, [[0, 0]]),
    [[10, 10], [0, 0]]
  )

  t.deepEqual(
    game.addCursor([], 0, 0, [[0, 0], [1, 1]]),
    [[0, 0], [1, 1]]
  )

  t.deepEqual(
    game.addCursor([], 1, 1, [[0, 0], [1, 1], [2, 2]]),
    [[0, 0], [1, 1], [2, 2]]
  )

  t.deepEqual(
    game.addCursor([], 3, 9, [[0, 0], [0, 1], [2, 2]]),
    [[2, 8], [2, 9], [4, 10]]
  )
})

test('remove cursor', t => {
  t.deepEqual(
    game.removeCursor([], 0, 0, [[0, 0]]),
    []
  )

  t.deepEqual(
    game.removeCursor([[0, 0], [1, 1]], 0, 0, [[0, 0]]),
    [[1, 1]]
  )

  t.deepEqual(
    game.removeCursor([[0, 2], [1, 2], [2, 2]], 2, 2, [[0, 0], [2, 0]]),
    [[0, 2], [2, 2]]
  )
})

test('world tick', t => {
  t.deepEqual(
    game.tick([[0, 0]]),
    []
  )

  t.deepEqual(
    game.tick([[0, 0], [0, 1]]),
    []
  )

  t.deepEqual(
    game.tick([[0, 0], [1, 0], [0, 1]]),
    [[0, 0], [1, 0], [0, 1], [1, 1]]
  )

  t.deepEqual(
    game.tick([[0, 0], [1, 0], [2, 0]]),
    [[1, 0], [1, -1], [1, 1]]
  )

  t.deepEqual(
    game.tick([[0, 0], [0, 1], [1, 0], [1, 1]]),
    [[0, 0], [0, 1], [1, 0], [1, 1]]
  )
})

test('clamp', t => {
  t.deepEqual(game.clamp([[5, 5]], 0, 10, 0, 10), [[5, 5]])

  t.deepEqual(game.clamp([[0, 0]], 0, 10, 0, 10), [[0, 0]])
  t.deepEqual(game.clamp([[10, 10]], 0, 10, 0, 10), [[10, 10]])
  t.deepEqual(game.clamp([[0, 10]], 0, 10, 0, 10), [[0, 10]])
  t.deepEqual(game.clamp([[10, 0]], 0, 10, 0, 10), [[10, 0]])

  t.deepEqual(game.clamp([[-1, 5]], 0, 10, 0, 10), [])
  t.deepEqual(game.clamp([[11, 5]], 0, 10, 0, 10), [])
  t.deepEqual(game.clamp([[5, -1]], 0, 10, 0, 10), [])
  t.deepEqual(game.clamp([[5, 11]], 0, 10, 0, 10), [])
  t.deepEqual(game.clamp([[-1, -1]], 0, 10, 0, 10), [])
  t.deepEqual(game.clamp([[-1, 11]], 0, 10, 0, 10), [])
  t.deepEqual(game.clamp([[11, 11]], 0, 10, 0, 10), [])
  t.deepEqual(game.clamp([[11, -1]], 0, 10, 0, 10), [])
})

test('resize', t => {
  t.deepEqual(
    game.resize([[5, 5]], [10, 10], [20, 20]),
    [[10, 10]]
  )

  t.deepEqual(
    game.resize([[0, 0]], [10, 10], [20, 20]),
    [[5, 5]]
  )

  t.deepEqual(
    game.resize([[10, 10]], [10, 10], [20, 20]),
    [[15, 15]]
  )

  t.deepEqual(
    game.resize([[0, 10]], [10, 10], [20, 20]),
    [[5, 15]]
  )

  t.deepEqual(
    game.resize([[10, 0]], [10, 10], [20, 20]),
    [[15, 5]]
  )

  t.deepEqual(
    game.resize([[10, 0], [0, 10], [5, 5]], [10, 10], [20, 20]),
    [[15, 5], [5, 15], [10, 10]]
  )
})
