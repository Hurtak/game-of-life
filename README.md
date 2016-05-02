# game-of-life

## Demo

http://hurtak.github.io/game-of-life/

## Features

TODO

- hidden feature: stats. activate it by clicking on the 'Game of life' heading

## Development & Building

#### Prerequisites

- [Node.js](http://nodejs.org) is required
- install dependencies with `npm install`

#### Development mode

- `npm run dev` compile app in development mode and start web server with live reload

#### Production mode

- `npm run dist` compile app in production mode and start web server

#### Benchmark

- tests how long it takes to recalculate world state
- located in `./app/scripts/benchmark/` directory
- easiest way to run it is to uncomment benchmark import in `./app/scripts/app.js`, start the app and look into browser console
- you can tune settings (number of iterations, tested world size) in `./app/scripts/benchmark/benchmark.js`

#### Scripts for downloading game of life patterns

- located in `./scripts/download-patterns-from-wiki.js`
- run with node `node ./scripts/download-patterns-from-wiki.js`
- downloads patterns in `./scripts/data/' directory

## TODO / Potential improvements

- add more transparency to canvas when menu is visible
- cursors menu: better typography for headings, finetune canvas sizes
- test on mobile/tablet
- test in safari

- improve performance
- add tooltip to cusor patterns
- selected cursor highlight in cursors menu
- close button inside cursors menu?
- save state to localstorage?
- save world to url?
- draw already visited cells with different color (fade out this color after some time)
- use setTimeout based timer instead of setInterval?
- use requestAnimationFrame?
- world recalculation in service worker?
