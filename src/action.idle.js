module.exports = {
    run: function(creep, coordinates, stopIdleCondition, afterAction) {
        if (creep.memory.action != 'idle') return;

        if (typeof stopIdleCondition === "function") {
            var result = stopIdleCondition(creep);
            if (result) {
                creep.memory.action = afterAction ? afterAction : 'harvest';
            } else {
                creep.say('zzz');
            }
        }

        creep.moveTo(coordinates.x, coordinates.y);
    }
};
