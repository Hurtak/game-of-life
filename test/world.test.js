import test from 'ava'
import 'babel-core/register'

import * as game from '../app/scripts/world.js'

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

  const before = [
    [0, 0],
    [0, 1],
    [1, 0],
    [1, 1]
  ]

  const after = [
    [0, 0],
    [0, 1],
    [1, 1]
  ]

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
