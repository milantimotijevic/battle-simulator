const selectTarget = function(armies) {
	// TODO logic
	return armies[armies.length - 1];
}

const isSuccessfulHit = function() {
	return thisArmy.name !== 'Isengard';
}

const calculateDamage = function() {
	// TODO logic
	return 5;
}

const getMilliseconds = function getMilliseconds(num) {
	return (num % 1) * 1000;
};

module.exports = {
	selectTarget,
	isSuccessfulHit,
	calculateDamage,
	getMilliseconds,
};
