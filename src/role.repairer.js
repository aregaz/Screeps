/*jshint esversion: 6 */
var repairAction = require('action.repair');
var idleAction = require('action.idle');
var harvestAction = require('action.harvest');

var logger = require('utils.logger');

var repairerRole = {
    run: function(creep) {
        var target = _selectTarget(creep);

        repairAction.run(creep, target, 'harvest');
        harvestAction.run(creep, _findClosestSource(creep), 'repair');
        idleAction.run(creep, { x:22, y:28 }, _stopIdleCondition, 'repair');
    }
};

function _selectTarget(creep) {
    var target;
    if (typeof creep.memory.targetId === 'undefined' || _isTargetRepaired(creep.memory.targetId)) {
        target = _findMostDemagedTarget(creep);
        creep.memory.targetId = target ? target.id : undefined;
    } else {
        target = Game.getObjectById(creep.memory.targetId);
    }

    return target;
}

function _isTargetRepaired(targetId) {
    //if (!targetId) return false;
    var target = Game.getObjectById(targetId);
    return target.hits === target.hitsMax;
}

function _findMostDemagedTarget(creep) {
    var structures = creep.room.find(FIND_MY_STRUCTURES, {
        sort: function(structure1, structure2) {
            return structure1.hits > structure2.hits;
        },
        filter: (structure) => _isStructureDemaged(structure) && _isNotWall(structure)
    });
    if (structures.length === 0) {
        console.log('Repairer ' + logger.logCreep(creep) + ' cannot find demaged structures-not-walls')
        structures = creep.room.find(FIND_STRUCTURES, {
            sort: function(structure1, structure2) {
                return structure1.hits > structure2.hits;
            },
            filter: (structure) => _isStructureDemaged(structure)
        });
        if (structures.length > 0) {
            console.log('Repairer ' + logger.logCreep(creep) + ' found only demaged walls')
        } else {
            console.log('Repairer ' + logger.logCreep(creep) + ' cannot find demaged structures')
        }
    }

    return structures[0];
}

function _findClosestTarget(creep) {
    var target = creep.pos.findClosestByRange(FIND_MY_STRUCTURES, { filter: (structure) => _isStructureDemaged(strucutre) && _isNotWall(structure) });
    if (!target) {
        target = creep.pos.findClosestByRange(FIND_MY_STRUCTURES, { filter: (structure) => _isStructureDemaged(structure) });
    }
    
    return target;
}

function _findClosestSource(creep) {
    return creep.room.find(FIND_SOURCES)[1]; // TODO: choose nearest source
    // return creep.pos.findClosestByRange(FIND_SOURCES);
}

function _isStructureDemaged(structure) {
    return structure.hits < (structure.hitsMax * 0.75);
}

function _isNotWall(structure) {
    return structure.strucutreType !== STRUCTURE_WALL;
}

function _stopIdleCondition(creep) {
    var demagedTartet = _findMostDemagedTarget(creep);
    return demagedTartet !== null && typeof demagedTartet !== 'undefined';
}

module.exports = repairerRole;
