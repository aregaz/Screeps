var buildAction = {
    run: function (creep, target, afterAction) {
        if (creep.memory.action !== 'build') return;

        if (target == null || typeof target === 'undefined') {
            console.log('Builder [' + creep.name + '] cannot find a target to build.');
            creep.say('??');
            creep.memory.action = 'idle';
            return;
        }

        if (creep.carry.energy === 0) {
            creep.memory.action = afterAction ? afterAction : 'harvest';
        }

        var result = creep.build(target);
        if (result === ERR_NOT_IN_RANGE) {
            creep.moveTo(target);
        } else if (result === ERR_NOT_ENOUGH_RESOURCES) {
            creep.say('Empty');
        } else if (result === OK) {
            creep.say('Building');
        }
    }
};

module.exports = buildAction;
