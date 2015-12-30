export const addCell = (world, x, y) => {
	const cellExists = world.find(item => item.x === x && item.y === y);
	return cellExists ? world : [...world, {x, y}];
};

export const removeCell = (world, x, y) => {
	return world.filter(cell => !(cell.x === x && cell.y === y));
};
