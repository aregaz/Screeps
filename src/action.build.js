var buildAction = {
    do: function (creep, target, afterAction) {
        if (creep.memory.action !== 'build') return;

        if (creep.carry.energy === 0) {
            creep.say('Out of energy');
            creep.memory.action = afterAction ? afterAction : 'harvest';
        }

        if(creep.build(target) == ERR_NOT_IN_RANGE) {
            creep.moveTo(target);
        } else {
            creep.say('Building');
        }
    }
};

module.exports = buildAction;
