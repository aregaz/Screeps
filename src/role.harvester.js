/*jshint esversion: 6 */

var _ = require('lodash');
var energyConsumerHelper = require('utils.energyConsumersHelper');

var harvestAction = require('action.harvest');
var transferAction = require('action.transfer');
var idleAction = require('action.idle');

var roleHarvester = {
    run: function(creep) {
        var source = _selectSource(creep);
        // var target = _selectTarget(creep, source);

        _updateTarget(creep, source);
        var target = Game.getObjectById(creep.memory.targetId);

        transferAction.run(creep, target, "harvest");
        harvestAction.run(creep, source, "transfer");
        idleAction.run(
            creep,
            { x:23, y:10 },
            function(creep) { return _targetExists(creep, source); },
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

function _updateTarget(creep, source) {
    function findNewTarget(creep, source) {
        target = _findTargetClosestToSource(creep, source);
        if (target) {
            console.log('Creep ' + _logCreep(creep) + ' has new target: ' + _logStructure(target));
        } else {
            target = null;
            console.log('Failed to find target for ' + _logCreep(creep));
        }

        return target;
    }

    var target;
    if (creep.memory.targetId &&
        !energyConsumerHelper.canReceiveEnergy(Game.getObjectById(creep.memory.targetId))) {
        creep.memory.targetId = undefined;
    }

    if (creep.memory.targetId) {
        return;
    } else {
        target = findNewTarget(creep, source);
        creep.memory.targetId = target ? target.id : undefined;
    }
}

function _selectTarget(creep, source) {
    function findNewTarget(creep, source) {
        target = _findTargetClosestToSource(creep, source);
        if (target) {
            console.log('Creep ' + _logCreep(creep) + ' has new target: ' + _logStructure(target));
        } else {
            target = null;
            console.log('Failed to find target for ' + _logCreep(creep));
        }

        return target;
    }

    var target;
    if (creep.memory.targetId) {
        target = Game.getObjectById(creep.memory.targetId);
        if (!energyConsumerHelper.canReceiveEnergy(target)) {
            target = findNewTarget(creep, source);
            creep.memory.targetId = target ? target.id : undefined;
        }
    } else {
        target = findNewTarget(creep, source);
        creep.memory.targetId = target ? target.id : undefined;
    }

    return target;
}

function _findTargetClosestToSource(creep, source) {
    console.log('Searching closest target to ' + _logStructure(source) + ' for ' + _logCreep(creep));

    function findAvailableStructures(creep, structureType) {
        var targets = creep.room.find(FIND_MY_STRUCTURES, {
            filter: function(structure) {
                return structure.structureType === structureType && energyConsumerHelper.canReceiveEnergy(structure);
            }
        });
        return targets;
    }

    function findClosest(position, targets) {
        var target = position.findClosestByPath(targets);
        return target;
    }

    var availableTargets;
    var target;

    function trySelectTarget(creep, structureType) {
        var availableTargets = findAvailableStructures(creep, structureType);

        if (availableTargets.length === 0) {
            return null;
        }

        var target = findClosest(source.pos, availableTargets);

        if (target === null || typeof target === 'undefined')  {
            return null;
        } else {
            return target;
        }
    }

    target = trySelectTarget(creep, STRUCTURE_EXTENSION);
    if (target) {
        console.log('Extension found ' + _logStructure(target));
        return target;
    }

    target = trySelectTarget(creep, STRUCTURE_CONTAINER);
    if (target) {
        console.log('Container found ' + _logStructure(target));
        return target;
    }

    target = trySelectTarget(creep, STRUCTURE_TOWER);
    if (target) {
        console.log('Tower found ' + _logStructure(target));
        return target;
    }

    target = trySelectTarget(creep, STRUCTURE_STORAGE);
    if (target) {
        console.log('Storage found ' + _logStructure(target));
        return target;
    }

    target = trySelectTarget(creep, STRUCTURE_SPAWN);
    if (target) {
        console.log('Spawn found ' + _logStructure(target));
        return target;
    }

    console.log('No target found');
    return null;
}

function _targetExists(creep, source) {
    var target = _findTargetClosestToSource(creep, source);
    var hasTarget = target !== null && typeof target !== 'undefined';
    if (!hasTarget) {
        console.log('Creep [' + creep.name + '] has no target');
    }
    return hasTarget;
}

function _logStructure(structure) {
    if (!structure) {
        return '[]';
    }

    var structureType = typeof structure.structureType === undefined ?
        '' : structure.structureType;
    return '[' + structureType + '(' + structure.pos.x + ', ' + structure.pos.y + ')]';
}

function _logCreep(creep) {
    return '[' + creep.name + ']';
}

module.exports = roleHarvester;
