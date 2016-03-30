
const cursors = `
  ■

  ■ ■
  ■ ■

    ■
  ■ ■ ■
    ■

    ■ ■
  ■ ■ ■ ■
  ■ ■ ■ ■
    ■ ■

      ■
    ■ ■ ■
  ■ ■ ■ ■ ■
    ■ ■ ■
      ■

    ■ ■
  ■ ■
    ■
`

export default (string) => {
  console.time(1)
  const output = cursors
    // 1. split string to lines
    .split('\n')
    // 2. group nonempty lines together
    .reduce((patterns, line) => {
      const newPattern = line.trim().length === 0
      newPattern ? patterns.push([]) : patterns[patterns.length - 1].push(line)
      return patterns
    }, [])
    // 3. filter empty cursors
    .filter(array => array.length > 0)
    // 4. remove trailing spaces from cursors
    .map(cursor => {
      // 4.1 determine shortest whitespace prefix
      const cursorIndentation = cursor.reduce((shortestIndentation, line) => {
        const lineIndentation = line.match(/^\s+/)[0].length
        return lineIndentation < shortestIndentation ? lineIndentation : shortestIndentation
      }, Infinity)
      // 4.2 remove this indentation
      return cursor.map(line => line.replace(' '.repeat(cursorIndentation), ''))
    })
    // 5. remove whitespace interlacing
    .map(cursor => {
      return cursor.map(line => line.split('').filter((_, i) => i % 2 === 0).join(''))
    })
    // 6. convert strings to array of 0|1 ints
    .map(cursor => {
      return cursor.map(line => line.split('').map(s => s === ' ' ? 0 : 1))
    })
    // 7. add missing trailing 0
    .map(cursor => {
      const longestLine = cursor.reduce((longestLine, line) => line.length > longestLine ? line.length : longestLine, 0)
      return cursor.map(line => {
        while (line.length < longestLine) line.push(0)
        return line
      })
    })

    console.timeEnd(1)

  console.log(output)
}
