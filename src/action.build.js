var buildAction = {
    run: function (creep, target, afterAction) {
        if (creep.memory.action !== 'build') return;

        if (target === null || typeof target === 'undefined') {
            creep.memory.targetId = undefined;
            creep.memory.action = 'idle';
            creep.say('??');
            
            console.log('Creep [' + creep.name + '] has no target to build. Idling.');
            return;
        }

        if (creep.carry.energy === 0) {
            creep.memory.action = afterAction ? afterAction : 'harvest';
            return;
        }

        var result = creep.build(target);
        if (result === ERR_NOT_IN_RANGE) {
            creep.moveTo(target);
        } else if (result === ERR_NOT_ENOUGH_RESOURCES) {
            creep.say('Empty');
        } else if (result === OK) {
            // creep.say('Building');
        }
    }
};

module.exports = buildAction;
