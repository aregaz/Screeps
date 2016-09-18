/*jshint esversion: 6 */
var repairAction = {
    run: function(creep, target, afterAction) {
        if (creep.memory.action !== 'repair') return;

        if (!target) {
            creep.memory.targetId = undefined;
            creep.memory.action = 'idle';
            creep.say('??');

            console.log('Creep [' + creep.name + '] has no target to repair. Idling.');
            return;
        }

        if (creep.energy === 0) {
            _harvest(creep)
            return;
        }

        var repairResult = creep.repair(target);

        if (repairResult === ERR_NOT_IN_RANGE) {
            creep.moveTo(target);
        } else if (repairResult === OK) {
            // creep.say('Repairing');
        } else if (repairResult === ERR_NOT_ENOUGH_RESOURCES) {
            _harvest(creep)
            return;
        } else {
            creep.say(repairResult);
        }
    }
};

function _harvest(creep) {
    creep.memory.action = 'harvest';
    creep.say('Empty');
}

module.exports = repairAction;
