import test from 'ava'

import * as cursor from '../app/scripts/utils/cursor.js'

test('cursor strings to array of coordinates', t => {
  t.deepEqual(cursor.cursorStringToCoordinates(`x`), [[0, 0]])
  t.deepEqual(cursor.cursorStringToCoordinates(`  x`), [[0, 0]])
  t.deepEqual(cursor.cursorStringToCoordinates(`  x  `), [[0, 0]])

  t.deepEqual(
    cursor.cursorStringToCoordinates(`
      x
    `),
    [[0, 0]]
  )

  t.deepEqual(
    cursor.cursorStringToCoordinates(`


      x

    `),
    [[0, 0]]
  )

  t.deepEqual(
    cursor.cursorStringToCoordinates(
      `
      x

      x

      `
    ),
    [
      [0, 2],
      [0, 0]
    ]
  )

  t.deepEqual(
    cursor.cursorStringToCoordinates(
      `
      x x x
      x
      `
    ),
    [
      [0, 1],
      [1, 1],
      [2, 1],
      [0, 0]
    ]
  )
})
