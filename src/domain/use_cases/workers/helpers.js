const selectTarget = function selectTarget(strategy, opponents) {
	// TODO logic
	return opponents[opponents.length - 1];
};

const isSuccessfulHit = function isSuccessfulHit(currentUnits) {
	const roll = Math.floor(Math.random() * Math.floor(99));
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

module.exports = {
	selectTarget,
	isSuccessfulHit,
	calculateDamage,
	calculateReload,
	getMilliseconds,
};
