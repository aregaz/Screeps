/*jshint esversion: 6 */
var repairAction = require('action.repair');
var idleAction = require('action.idle');
var harvestAction = require('action.harvest');

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
    var strucutres = creep.room.find(FIND_STRUCTURES, {
        sort: function(structure1, structure2) {
            return structure1.hits > structure2.hits;
        },
        filter: _isStructureDemaged
    });

    if (strucutres.length === 0) return;

    return strucutres[0];
}

function _findClosestTarget(creep) {
    return creep.pos.findClosestByRange(FIND_STRUCTURES, { filter: _isStructureDemaged });
}

function _findClosestSource(creep) {
    // var source = creep.room.find(FIND_SOURCES)[1]; // TODO: choose nearest source
    return creep.pos.findClosestByRange(FIND_SOURCES);
}

function _isStructureDemaged(structure) {
    return structure.hits < (structure.hitsMax * 0.75);
}

function _stopIdleCondition(creep) {
    var demagedTartet = _findMostDemagedTarget(creep);
    return demagedTartet !== null && typeof demagedTartet !== 'undefined';
}

module.exports = repairerRole;
