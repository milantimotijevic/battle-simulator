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

module.exports = {
	selectTarget,
	isSuccessfulHit,
	calculateDamage,
};
