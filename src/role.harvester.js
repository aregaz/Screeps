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
    STRUCTURE_STORAGE: (structure) => _.sum(structure.store) < structure.storeCapacity
};

var roleHarvester = {
    run: function(creep) {
        // var source = _findSource(creep);
        // var target = _selectTarget(creep, source);
        var source = _selectSource(creep);
        var target = _selectTarget(creep, source);

        transferAction.run(creep, target, "harvest");
        harvestAction.run(creep, source, "transfer");
        idleAction.run(creep, { x:30, y:14 }, _stopIdleCondition, 'harvest');
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
        return structure.structureType === structureType &&
        _isStructureFullConditions[structureType](structure)
    }

    function _findClosestExtension(source) {
        var target = source.pos.findClosestByPath(FIND_STRUCTURES, {
            filter: function(structure) { return checkStructure(structure, STRUCTURE_EXTENSION); }
        });
        return target;
    }

    function _findClosestContainer(source) {
        var target = source.pos.findClosestByPath(FIND_STRUCTURES, {
            filter: function(structure) { return checkStructure(structure, STRUCTURE_CONTAINER); }
        });
        return target;
    }

    function _findClosestTower(source) {
        var target = source.pos.findClosestByPath(FIND_STRUCTURES, {
            filter: function(structure) { return checkStructure(structure, STRUCTURE_TOWER); }
        });
        return target;
    }

    function _findClosestStorage(source) {
        var target = source.pos.findClosestByPath(FIND_STRUCTURES, {
            filter: function(structure) { return checkStructure(structure, STRUCTURE_STORAGE); }
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

function _isTargetIsFull(structure) {


    var isFull = _isStructureFullConditions[structure.structureType](structure);
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

function _stopIdleCondition(creep) {
    var target = _findTarget(creep);
    return target !== null && typeof target !== 'undefined';
}

module.exports = roleHarvester;
