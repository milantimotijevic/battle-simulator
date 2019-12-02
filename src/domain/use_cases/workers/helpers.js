/**
 * Chooses a target to attack based on the attack strategy
 * The array will have already been sorted (through mongoose query)
 */
const selectTarget = function selectTarget(strategy, opponents) {
	if (strategy === 'RANDOM') {
		const randomIndex = Math.floor(Math.random() * (opponents.length - 1));
		return opponents[randomIndex];
	}

	return strategy === 'WEAKEST' ? opponents[0] : opponents[opponents.length - 1];
};

const isSuccessfulHit = function isSuccessfulHit(currentUnits) {
	const roll = Math.floor(Math.random() * 100) + 1;
	return roll <= currentUnits * process.env.HIT_PER_UNIT;
};

const calculateDamage = function calculateDamage(currentUnits) {
	return Math.floor(currentUnits * process.env.DAMAGE_PER_UNIT);
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
