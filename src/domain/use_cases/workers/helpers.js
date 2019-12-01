function merge(left, right) {
	const arr = [];

	while (left.length && right.length) {
		if (left[0].currentUnits < right[0].currentUnits) {
			arr.push(left.shift());
		} else {
			arr.push(right.shift());
		}
	}
	return arr.concat(left.slice().concat(right.slice()));
}

function mergeSort(arr) {
	if (arr.length < 2) {
		return arr;
	}

	const middle = Math.floor(arr.length / 2);
	const left = arr.slice(0, middle);
	const right = arr.slice(middle);

	return merge(mergeSort(left), mergeSort(right));
}

/**
 * Chooses a target to attack based on the attack strategy
 */
const selectTarget = function selectTarget(strategy, opponents) {
	if (strategy === 'RANDOM') {
		const randomIndex = Math.floor(Math.random() * (opponents.length - 1));
		return opponents[randomIndex];
	}

	const sortedOpponents = mergeSort(opponents.slice());
	return strategy === 'WEAKEST' ? sortedOpponents[0] : sortedOpponents[sortedOpponents.length - 1];
};

const isSuccessfulHit = function isSuccessfulHit(currentUnits) {
	const roll = Math.floor(Math.random() * 100) + 1;
	return roll <= currentUnits;
};

const calculateDamage = function calculateDamage(currentUnits) {
	return Math.floor(currentUnits * 0.5);
};

const calculateReload = function calculateReload(currentUnits) {
	return 0.01 * currentUnits;
};

const getMilliseconds = function getMilliseconds(num) {
	return (num % 1) * 1000;
};

/**
 * Produces an informative string out of an army/battle instance
 */
const format = function format(entity) {
	return `${entity.name} (${entity.id})`;
};

module.exports = {
	selectTarget,
	isSuccessfulHit,
	calculateDamage,
	calculateReload,
	getMilliseconds,
	format,
};
