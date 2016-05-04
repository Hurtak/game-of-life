export const cursorStringToCoordinates = (cursorString) => {
  // 1. split cursor strings to lines
  let lines = cursorString.split('\n')

  // 2. remove first and last line because they are empty
  const firstNonEmptyLine = (lines) => {
    let currentIndex = 0
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].trim() !== '') return currentIndex
      currentIndex++
    }
    return currentIndex
  }

  const startIndex = firstNonEmptyLine(lines)
  const endIndex = firstNonEmptyLine([...lines].reverse())

  lines = lines.slice(startIndex, lines.length - endIndex)

  // 3. remove trailing spaces from cursors: ['  x', '  x x'] => ['x', 'x x']

  // 3.1 determine shortest whitespace prefix
  const cursorIndentation = lines.reduce((shortestIndentation, line) => {
    if (!line || line.match(/^\s$/)) return shortestIndentation
    const match = line.match(/^\s+/)
    const currentIndentation = match ? match[0].length : 0
    return currentIndentation < shortestIndentation ? currentIndentation : shortestIndentation
  }, Infinity)

  lines = lines
    // 3.2 remove this indentation
    .map(line => line.replace(' '.repeat(cursorIndentation), ''))
    // 4. remove whitespace interlacing: '  x x x' => ' xxx'
    .map(line => line.split('').filter((_, i) => i % 2 === 0).join(''))
    // 5. convert strings to array of booleans: ' x ' => [false, true, false]
    .map(line => line.split('').map(s => s !== ' '))

  // 6. convert to array of xy coordinates
  const coordinates = []

  for (let y = 0; y < lines.length; y++) {
    const line = lines[y]
    for (let x = 0; x < line.length; x++) {
      if (!line[x]) continue
      coordinates.push([x, lines.length - y - 1])
    }
  }

  return coordinates
}

export const convertObjectOfCursors = (object) => {
  const convertedObj = {}
  for (const key in object) {
    if (typeof object[key] === 'string') {
      convertedObj[key] = cursorStringToCoordinates(object[key])
    } else {
      convertedObj[key] = convertObjectOfCursors(object[key])
    }
  }

  return convertedObj
}

export const getRandomCursor = (cursorsObject) => {
  const ignoredCursorTypes = [
    'Brushes',
    'Still lifes'
  ]

  const allCursors = Object.keys(cursorsObject)
    .filter(key => !ignoredCursorTypes.includes(key))
    .map(key => cursorsObject[key])
    .map(group => Object.keys(group).map(key => group[key]))
    .reduce((a, b) => a.concat(b))

  const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min
  const randomCursor = allCursors[getRandomInt(0, allCursors.length - 1)]

  return randomCursor
}
