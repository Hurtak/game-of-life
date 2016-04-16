import * as cursorUtils from '../utils/cursor.js'

import brushes from './cursors/brushes.js'
import importantPatterns from './cursors/important-patterns.js'
import guns from './cursors/important-patterns.js'
import methuselahs from './cursors/methuselahs.js'
import oscilators from './cursors/oscilators.js'
import puffers from './cursors/puffers.js'
import spaceships from './cursors/spaceships.js'
import stillLifes from './cursors/still-lifes.js'

const cursors = cursorUtils.convertObjectOfCursors({
  'Brushes': brushes,
  'Important patterns': importantPatterns,
  'Guns': guns,
  'Methuselahs': methuselahs,
  'Oscilators': oscilators,
  'Puffers': puffers,
  'Spaceships': spaceships,
  'Still lifes': stillLifes
})

export default cursors

