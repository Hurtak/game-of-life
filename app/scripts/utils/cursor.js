export const cursorStringsToCoordinates = (arrayOfCursorStrings) => {
  return arrayOfCursorStrings
    // 1. split cursor strings to lines
    .map(cursors => cursors.split('\n'))
    // 2. remove first and last line because they are empty
    .map(cursor => cursor.slice(1, cursor.length - 1))
    // 3. remove trailing spaces from cursors: ['  x', '  x x'] => ['x', 'x x']
    .map(cursor => {
      // 3.1 determine shortest whitespace prefix
      const cursorIndentation = cursor.reduce((shortestIndentation, line) => {
        if (!line || line.match(/^\s$/)) return shortestIndentation
        const currentIndentation = line.match(/^\s+/)[0].length
        return currentIndentation < shortestIndentation ? currentIndentation : shortestIndentation
      }, Infinity)
      // 3.2 remove this indentation
      return cursor.map(line => line.replace(' '.repeat(cursorIndentation), ''))
    })
    // 4. remove whitespace interlacing: '  x x x' => ' xxx'
    .map(cursor => cursor.map(line => line.split('').filter((_, i) => i % 2 === 0).join('')))
    // 5. convert strings to array of booleans: ' x ' => [false, true, false]
    .map(cursor => cursor.map(line => line.split('').map(s => s !== ' ')))
    // 6. convert to array of xy coordinates
    .map(cursor => {
      const coordinates = []

      for (let y = 0; y < cursor.length; y++) {
        const line = cursor[y]
        for (let x = 0; x < line.length; x++) {
          if (!line[x]) continue
          coordinates.push([x, cursor.length - y - 1])
        }
      }
      return coordinates
    })
}
