/*jshint esversion: 6 */

var _ = require('lodash');

var harvestAction = require('action.harvest');
var transferAction = require('action.transfer');
var idleAction = require('action.idle');

// var locationHelper = require('utils.locationHelper');

var _isStructureFullConditions = {
    STRUCTURE_EXTENSION: (structure) => structure.energy < structure.energyCapacity,
    STRUCTURE_CONTAINER: (structure) => _.sum(structure.store) < structure.storeCapacity,
    STRUCTURE_TOWER: (structure) => structure.energy < structure.energyCapacity,
    STRUCTURE_STORAGE: (structure) => _.sum(structure.store) < structure.storeCapacity,
    STRUCTURE_SPAWN: (structure) => structure.energy < structure.energyCapacity
};

var roleHarvester = {
    run: function(creep) {
        // var source = _findSource(creep);
        // var target = _selectTarget(creep, source);
        var source = _selectSource(creep);
        var target = _selectTarget(creep, source);

        transferAction.run(creep, target, "harvest");
        harvestAction.run(creep, source, "transfer");
        idleAction.run(
            creep,
            { x:30, y:14 },
            function(creep) {
                return _stopIdleCondition(creep, source);
            },
            'harvest');
    }
};

function _selectSource(creep, source) {
    var target;
    if (creep.memory.sourceId === null || typeof creep.memory.sourceId === 'undefined') {
        target = _findSource(creep);
        creep.memory.sourceId = target ? target.id : undefined;
    } else {
        target = Game.getObjectById(creep.memory.sourceId);
    }

    return target;
}

function _findSource(creep) {
    var source = creep.room.find(FIND_SOURCES)[0]; // TODO: choose nearest source
    // var source = creep.pos.findClosestByRange(FIND_ACTIVE_SOURCES)
    return source;
}

function _selectTarget(creep, source) {
    var target;
    if (creep.memory.targetId === null || typeof creep.memory.targetId === 'undefined') {
        target = _findTargetClosestToSource(creep, source);
        creep.memory.targetId = target ? target.id : undefined;
    } else {
        target = Game.getObjectById(creep.memory.targetId);
    }

    if (_isTargetIsFull(target)) {
        creep.memory.targetId = undefined;
        target = _selectTarget(creep, source);
    }

    return target;
}

function _findTargetClosestToSource(creep, source) {
    function checkStructure(structure, structureType) {
        var isStructureFull = _isStructureFullConditions[structureType];

        return structure.structureType === structureType &&
            (typeof isStructureFull !== 'function' || isStructureFull(structure));
    }

    function findStructureClosestToStore(source, structureType) {
        var target = source.pos.findClosestByPath(FIND_STRUCTURES, {
            filter: function(structure) { return checkStructure(structure, structureType); }
        });
        return target;
    }

    var target;

    target = findStructureClosestToStore(source, STRUCTURE_EXTENSION);
    if (target !== null && typeof target !== 'undefined') return target;

    target = findStructureClosestToStore(source, STRUCTURE_CONTAINER);
    if (target !== null && typeof target !== 'undefined') return target;

    target = findStructureClosestToStore(source, STRUCTURE_TOWER);
    if (target !== null && typeof target !== 'undefined') return target;

    target = findStructureClosestToStore(source, STRUCTURE_STORAGE);
    if (target !== null && typeof target !== 'undefined') return target;

    target = findStructureClosestToStore(source, STRUCTURE_SPAWN);
    if (target !== null && typeof target !== 'undefined') return target;

    return null;
}

function _isTargetIsFull(structure) {
    if (structure === null || typeof structure === 'undefined')  return false;

    var conditionFunction = _isStructureFullConditions[structure.structureType];
    if (typeof conditionFunction !== 'function') return false;

    var isFull = conditionFunction(structure);
    return isFull;
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

function _stopIdleCondition(creep, source) {
    var target = _findTargetClosestToSource(creep, source);
    return target !== null && typeof target !== 'undefined';
}

module.exports = roleHarvester;
