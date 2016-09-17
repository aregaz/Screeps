/*jshint esversion: 6 */
var harvestAction = require('action.harvest');

var repairAction = {
    run: function(creep, terget, afterAction) {
        if (creep.memory.action !== 'repair') return;

        if (creep.energy === 0) {
            creep.memory.action = 'harvest';
        } else {
            var repairResult = creep.repair(target);

            if (repairResult === ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            } else if (repairResult === OK) {
                creep.memory.targetId = undefined;
                creep.memory.action = 'repair';
            }
        }
    }
};

function findClosestSource(creep) {
    var source = creep.pos.findClosest(FIND_SOURCES);
}

module.exports = repairAction;
