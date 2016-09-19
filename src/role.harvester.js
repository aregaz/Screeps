/*jshint esversion: 6 */

var _ = require('lodash');

var harvestAction = require('action.harvest');
var transferAction = require('action.transfer');
var idleAction = require('action.idle');

// var locationHelper = require('utils.locationHelper');

var _isStructureFullConditions = {
    STRUCTURE_EXTENSION: function(structure) { console.log(structure.energy + "/" + structure.energyCapacity); return structure.energy < structure.energyCapacity; },
    STRUCTURE_CONTAINER: function(structure) { console.log(_.sum(structure.store) + "/" + structure.storeCapacity); return _.sum(structure.store) < structure.storeCapacity; },
    STRUCTURE_TOWER: function(structure) { console.log(structure.energy + "/" + structure.energyCapacity); return structure.energy < structure.energyCapacity; },
    STRUCTURE_STORAGE: function(structure) { console.log(_.sum(structure.store) + "/" + structure.storeCapacity); return _.sum(structure.store) < structure.storeCapacity; },
    STRUCTURE_SPAWN: function(structure) { console.log(structure.energy + "/" + structure.energyCapacity); return structure.energy < structure.energyCapacity; }
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
            // function(creep) {
            //     return _stopIdleCondition(creep, source);
            // },
            _stopIdleCondition2,
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

var iteration = 1;
function _selectTarget(creep, source) {
    var target;
    if (creep.memory.targetId === null || typeof creep.memory.targetId === 'undefined') {
        // target = _findTargetClosestToSource(creep, source);
        target = _findTarget(creep);
        //console.log(target.pos);
        creep.memory.targetId = target ? target.id : undefined;
    } else {
        target = Game.getObjectById(creep.memory.targetId);
    }

    // if (_isTargetIsFull(target)) {
    //     console.log('Target already full');
    //     creep.memory.targetId = undefined;
    //     target = _selectTarget(creep, source);
    //     iteration++;
    //     console.log('Itteration: ' + itteration)
    // }

    return target;
}

function _findTargetClosestToSource(creep, source) {
    function findStructureClosestToStore(source1, structureType) {
        var target = source1.pos.findClosestByPath(FIND_STRUCTURES, {
            filter: function(structure) {
                // console.log(structure.structureType);
                // console.log(structureType);
                // console.log(source.pos);
                // console.log();
                return structure.structureType === structureType && !_isTargetIsFull(structure); }
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
    if (structure === null || typeof structure === 'undefined') {
        console.log('Not a structure');
        return true;
    }
    
    /*
    
    var conditionFunction = _isStructureFullConditions[structure.structureType];
    console.log(structure.structureType + ': ' + typeof conditionFunction);
    if (typeof conditionFunction !== 'function') {
        console.log('No condition');
        return false;
    }
    console.log(conditionFunction);
    
    var isFull = conditionFunction(structure);
    return isFull; */
    
     var condition;
    if (structure.structureType === STRUCTURE_EXTENSION) {
        condition = _isStructureFullConditions[STRUCTURE_EXTENSION];
    } else if (structure.structureType === STRUCTURE_CONTAINER) {
        condition = _isStructureFullConditions[STRUCTURE_CONTAINER];
    } else if (structure.structureType === STRUCTURE_TOWER) {
        condition = _isStructureFullConditions[STRUCTURE_TOWER];
    } else if (structure.structureType === STRUCTURE_STORAGE) {
        condition = _isStructureFullConditions[STRUCTURE_STORAGE];
    } else if (structure.structureType === STRUCTURE_SPAWN) {
        condition = _isStructureFullConditions[STRUCTURE_SPAWN];
    } else {
        // console.log('Wrong strucutre type');
        return true;
    }
    
    if (typeof conditionFunction !== 'function') {
        // console.log('No condition');
        return true;
    }
    
    var isFull = condition(structure);
    return isFull;
}


function _findTarget(creep) {
    var targets = creep.room.find(FIND_MY_STRUCTURES, {
            // filter: function (structure) {
            //     return
            //     (structure.structureType === STRUCTURE_EXTENSION && structure.energy < structure.energyCapacity ) //||
            //     // (structure.structureType === STRUCTURE_TOWER && structure.energy < structure.energyCapacity) ||
            //     // (structure.structureType === STRUCTURE_CONTAINER && _.sum(structure.store) < structure.storeCapacity) ||
            //     // (structure.structureType === STRUCTURE_STORAGE && _.sum(structure.store) < structure.storeCapacity)
            //     ;
            // }
            filter: function(structure) { return structure.structureType === STRUCTURE_EXTENSION && structure.energy < structure.energyCapacity && structure.pos.y < 18; }
    });
    if (targets.length === 0) {
        console.log('Cannot find empty extensions');
    }
    return targets[0]; // TODO: find closest target
}

function _stopIdleCondition(creep, source) {
    var target = _findTargetClosestToSource(creep, source);
    return target !== null && typeof target !== 'undefined';
}

function _stopIdleCondition2(creep) {
    var target = _findTarget(creep);
    var hasTarget = target !== null && typeof target !== 'undefined';
    if (!hasTarget) {
        console.log('Creep [' + creep.name + '] has no target');
    }
    return hasTarget;
}

module.exports = roleHarvester;
