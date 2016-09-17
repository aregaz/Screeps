/*jshint esversion: 6 */

var harvestAction = require('action.harvest');
var transferAction = require('action.transfer');
var idleAction = require('action.idle');

var roleHarvester = {
    run: function(creep) {
        var source = _findSource(creep);
        var target = _findTarget(creep.room);

        transferAction.run(creep, target, "harvest");
        harvestAction.run(creep, source, "transfer");
        idleAction.run(creep, { x:30, y:14 }, _stopIdleCondition, 'harvest');
    }
};

function _findSource(creep) {
    var source = creep.room.find(FIND_SOURCES)[0]; // TODO: choose nearest source
    return source;
}

function _findTarget(room) {
    var targets = room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return ([STRUCTURE_SPAWN, STRUCTURE_EXTENSION, STRUCTURE_TOWER].indexOf(structure.structureType) > -1 &&
                        structure.energy < structure.energyCapacity) ||
                    ([STRUCTURE_CONTAINER].indexOf(structure.structureType) > -1 &&
                        structure.store.energy < structure.energyCapacity);
            }
    });
    return targets[0]; // TODO: find closest target
}

function _stopIdleCondition(creep) {
    var target = _findTarget(creep);
    return target !== null && typeof target !== 'undefined';
}

module.exports = roleHarvester;
