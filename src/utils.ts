let id = 0;
const getId = () => {
	return id++;
};

const replaceItemAtIndex = (arr: any[], index: number, newValue: any) => [
	...arr.slice(0, index),
	newValue,
	...arr.slice(index + 1),
];

const removeItemAtIndex = (arr: Array<any>, index: number) => [
	...arr.slice(0, index),
	...arr.slice(index + 1),
];

export { getId, replaceItemAtIndex, removeItemAtIndex };
