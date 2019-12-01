const selectTarget = function selectTarget(strategy, opponents) {
	// TODO logic
	return opponents[opponents.length - 1];
};

const isSuccessfulHit = function isSuccessfulHit() {
	// TODO logic
	return true;
};

const calculateDamage = function calculateDamage() {
	// TODO logic
	return 5;
};

const calculateReload = function calculateReload(currentUnits) {
	// TODO logic
	return 1;
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
