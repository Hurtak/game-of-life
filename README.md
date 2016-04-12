# game-of-life

## TODO

- cells drawing with cursor
  - place presets (https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life#Examples_of_patterns)
  - place x cells at the same time
- finish styles for controls
- with world clamp we are still counting cells outside of the screen
- store action names in constants?
- pass config into init function instead of importing it?
- save state to localstorage?
- save state into url?
- display grid between cells
- RAF middleware https://github.com/rackt/redux/blob/master/docs/advanced/Middleware.md
- draw already visited cells with different color
  - fade out this color after some time
- icons
  - add dynamic favicon which runs only when world ticks
- add github and twitter button
- update package.json homepage value with link to github pages
- update package.json description value
- world size change should update recalculate statistics
