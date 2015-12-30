const getCell = (world, x, y) => {
	return world.find(item => item.x === x && item.y === y) || false;
};

const getNeighboursCoordinates = (x, y) => {
	return [
		{x: x+1, y: y  },
		{x: x  , y: y+1},
		{x: x+1, y: y+1},

		{x: x-1, y: y  },
		{x: x  , y: y-1},
		{x: x-1, y: y-1},

		{x: x+1, y: y-1},
		{x: x-1, y: y+1}
	];
};

const getNeighbourCount = (world, x, y) => {
	const neighbours = getNeighboursCoordinates(x, y);
	return neighbours.reduce((p, c) => p + (getCell(world, c.x, c.y) ? 1 : 0), 0);
};

const addCell = (world, x, y) => {
	const cellExists = getCell(world, x, y);
	return cellExists ? world : [...world, {x, y}];
};

const removeCell = (world, x, y) => {
	return world.filter(cell => !(cell.x === x && cell.y === y));
};

const tick = (world) => {
	let newWorld = [];
	let neighbours = [];

	world.forEach(cell => {
		const neighbourCount = getNeighbourCount(world, cell.x, cell.y);

		const neighbourCoordinates = getNeighboursCoordinates(cell.x, cell.y);
		neighbourCoordinates.forEach(neighbour => {
			neighbours = addCell(neighbours, neighbour.x, neighbour.y)
		});

		// keep cells with 2-3 neighbourCount
		if (neighbourCount === 2 || neighbourCount === 3) {
			newWorld = addCell(newWorld, cell.x, cell.y);
		}
	});

	// check neighbours of alive cells to see if they have 3 living neighbours, in which case they should come alive
	neighbours.forEach(cell => {
		const neighbourCount = getNeighbourCount(world, cell.x, cell.y);
		if (neighbourCount === 3) {
			newWorld = addCell(newWorld, cell.x, cell.y);
		}
	});

	return newWorld;
};

export {addCell, removeCell, tick}
