/*jshint esversion: 6 */

var _ = require('lodash');

var harvestAction = require('action.harvest');
var transferAction = require('action.transfer');
var idleAction = require('action.idle');

var locationHelper = require('utils.locationHelper');

var roleHarvester = {
    run: function(creep) {
        // var source = _findSource(creep);
        // var target = _selectTarget(creep, source);
        var source = locationHelper.setTarget(creep, 'sourceId', _findSource);
        var target = locationHelper.setTarget(creep, 'targetId', function(cr) {
            return _findTargetClosestToSource(cr, source);
        });

        transferAction.run(creep, target, "harvest");
        harvestAction.run(creep, source, "transfer");
        idleAction.run(creep, { x:30, y:14 }, _stopIdleCondition, 'harvest');
    }
};

function _findSource(creep) {
    var source = creep.room.find(FIND_SOURCES)[0]; // TODO: choose nearest source
    // var source = creep.pos.findClosestByRange(FIND_ACTIVE_SOURCES)
    return source;
}

// function _selectTarget(creep, source) {
//     var target;
//     if (creep.memory.targetId === null || typeof creep.memory.targetId === 'undefined') {
//         target = _findTargetClosestToSource(creep, source);
//         creep.memory.targetId = target ? target.id : undefined;
//     } else {
//         target = Game.getObjectById(creep.memory.targetId);
//     }
//
//     return target;
// }

function _findTargetClosestToSource(creep, source) {
    function _findClosestExtension(source) {
        var target = source.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: function(structure) {
                    return structure.structureType === STRUCTURE_EXTENSION && structure.energy < structure.energyCapacity;
                }
        });
        return target;
    }

    function _findClosestContainer(source) {
        var target = source.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: function(structure) {
                    return structure.structureType === STRUCTURE_CONTAINER && _.sum(structure.store) < structure.storeCapacity;
                }
        });
        return target;
    }

    function _findClosestTower(source) {
        var target = source.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: function(structure) {
                    return structure.structureType === STRUCTURE_TOWER && structure.energy < structure.energyCapacity;
                }
        });
        return target;
    }

    function _findClosestStorage(source) {
        var target = source.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: function(structure) {
                    return structure.structureType === STRUCTURE_STORAGE && _.sum(structure.store) < structure.storeCapacity;
                }
        });
        return target;
    }

    var taget;

    target = _findClosestExtension(source);
    if (target !== null && typeof target !== 'undefined') return target;

    target = _findClosestContainer(source);
    if (target !== null && typeof target !== 'undefined') return target;

    target = _findClosestTower(source);
    if (target !== null && typeof target !== 'undefined') return target;

    target = _findClosestStorage(source);
    if (target !== null && typeof target !== 'undefined') return target;

    return null;
}

// function _findTarget(creep) {
//     var targets = creep.room.find(FIND_STRUCTURES, {
//             filter: (structure) => {
//                 (structure.structureType === STRUCTURE_TOWER && structure.energy < structure.energyCapacity) ||
//                 (structure.structureType === STRUCTURE_EXTENSION && structure.energy < structure.energyCapacity ) ||
//                 (structure.structureType === STRUCTURE_CONTAINER && _.sum(structure.store) < structure.storeCapacity) ||
//                 (structure.structureType === STRUCTURE_STORAGE && _.sum(structure.store) < structure.storeCapacity)
//             }
//     });
//     return targets[0]; // TODO: find closest target
// }

function _stopIdleCondition(creep) {
    var target = _findTarget(creep);
    return target !== null && typeof target !== 'undefined';
}

module.exports = roleHarvester;
