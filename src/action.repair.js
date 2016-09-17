/*jshint esversion: 6 */
var repairAction = {
    run: function(creep, target, afterAction) {
        if (creep.memory.action !== 'repair') return;

        if (!target) {
            creep.memory.targetId = undefined;
            creep.memory.action = 'idle';
            console.log('Creep [' + creep.name + '] has no target to repair. Idling.');
            creep.say('??');
            return;
        }

        if (creep.energy === 0) {
            creep.memory.action = 'harvest';
            return;
        }

        var repairResult = creep.repair(target);

        if (repairResult === ERR_NOT_IN_RANGE) {
            creep.moveTo(target);
        } else if (repairResult === OK) {
            creep.memory.targetId = undefined;
            creep.memory.action = 'repair';
        }
    }
};

function findClosestSource(creep) {
    var source = creep.pos.findClosest(FIND_SOURCES);
}

module.exports = repairAction;
