import test from 'ava'

import * as game from '../app/scripts/utils/world.js'

test('add cell', t => {
  t.same(
    game.addCell([], 0, 0),
    [[0, 0]]
  )

  t.same(
    game.addCell([[0, 0]], 0, 0),
    [[0, 0]]
  )

  t.same(
    game.addCell([[0, 0]], 1, 1),
    [[0, 0], [1, 1]]
  )
})

test('remove cell', t => {
  t.same(
    game.removeCell([], 0, 0),
    []
  )

  t.same(
    game.removeCell([[0, 0]], 1, 1),
    [[0, 0]]
  )

  t.same(
    game.removeCell([[0, 0]], 0, 0),
    []
  )

  const before = [[0, 0], [0, 1], [1, 0], [1, 1]]
  const after = [[0, 0], [0, 1], [1, 1]]
  t.same(game.removeCell(before, 1, 0), after)
})

test('world tick', t => {
  t.same(
    game.tick([[0, 0]]),
    []
  )

  t.same(
    game.tick([[0, 0], [0, 1]]),
    []
  )

  t.same(
    game.tick([[0, 0], [1, 0], [0, 1]]),
    [[0, 0], [1, 0], [0, 1], [1, 1]]
  )

  t.same(
    game.tick([[0, 0], [1, 0], [2, 0]]),
    [[1, 0], [1, -1], [1, 1]]
  )

  t.same(
    game.tick([[0, 0], [0, 1], [1, 0], [1, 1]]),
    [[0, 0], [0, 1], [1, 0], [1, 1]]
  )
})

test('clamp', t => {
  t.same(game.clamp([[5, 5]], 0, 10, 0, 10), [[5, 5]])

  t.same(game.clamp([[0, 0]], 0, 10, 0, 10), [[0, 0]])
  t.same(game.clamp([[10, 10]], 0, 10, 0, 10), [[10, 10]])
  t.same(game.clamp([[0, 10]], 0, 10, 0, 10), [[0, 10]])
  t.same(game.clamp([[10, 0]], 0, 10, 0, 10), [[10, 0]])

  t.same(game.clamp([[-1, 5]], 0, 10, 0, 10), [])
  t.same(game.clamp([[11, 5]], 0, 10, 0, 10), [])
  t.same(game.clamp([[5, -1]], 0, 10, 0, 10), [])
  t.same(game.clamp([[5, 11]], 0, 10, 0, 10), [])
  t.same(game.clamp([[-1, -1]], 0, 10, 0, 10), [])
  t.same(game.clamp([[-1, 11]], 0, 10, 0, 10), [])
  t.same(game.clamp([[11, 11]], 0, 10, 0, 10), [])
  t.same(game.clamp([[11, -1]], 0, 10, 0, 10), [])
})

test('resize', t => {
  t.same(
    game.resize([[5, 5]], [10, 10], [20, 20]),
    [[10, 10]]
  )

  t.same(
    game.resize([[0, 0]], [10, 10], [20, 20]),
    [[5, 5]]
  )

  t.same(
    game.resize([[10, 10]], [10, 10], [20, 20]),
    [[15, 15]]
  )

  t.same(
    game.resize([[0, 10]], [10, 10], [20, 20]),
    [[5, 15]]
  )

  t.same(
    game.resize([[10, 0]], [10, 10], [20, 20]),
    [[15, 5]]
  )

  t.same(
    game.resize([[10, 0], [0, 10], [5, 5]], [10, 10], [20, 20]),
    [[15, 5], [5, 15], [10, 10]]
  )
})
